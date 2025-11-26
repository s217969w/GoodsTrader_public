import { Button, Dialog, HStack, Portal } from "@chakra-ui/react";
import LZString from "lz-string";
import { useLocation, useNavigate } from "react-router-dom";
import type { QRDataProp } from "../QR/QRInterface";
import { useEffect, useState } from "react";
import dataImport from "./dataImport";


export default function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doneImport, setDoneImport] = useState(false);
  const [open, setOpen] = useState(true);
  const [completeData, setCompleteData] = useState<QRDataProp | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (location.state?.qr) {
        const qrData = JSON.parse(location.state.qr);
        const qrDataDecode = LZString.decompressFromBase64(qrData);
        if (qrDataDecode) {
          setCompleteData(JSON.parse(qrDataDecode));
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, [location.state]);

  return (
    <div>
      {doneImport ? (
        <Dialog.Root open={open}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>読み込み成功</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    データの読み込みが完了しました
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant={"outline"}
                      onClick={() => { navigate("/manage"); setOpen(false); }}
                    >
                      OK
                    </Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      ) : (
        <Dialog.Root open={open}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    {error ? "読み込みエラー" : "確認"}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  {
                    (error || completeData?.u === "T") ?
                      <p>
                        QRコードを再度確認してください。移行用でないか、不正な形式です。
                      </p>
                      :
                      <p>
                        このデータを読み込みますか？現在のデータは全て上書きされます。
                        <br />
                        名前 : {completeData?.n}
                      </p>
                  }
                </Dialog.Body>
                <Dialog.Footer>
                  <HStack>
                    <Dialog.ActionTrigger asChild>
                      {(error || completeData?.u === "T") ? null : (<Button variant={"ghost"}
                        onClick={() => {
                          navigate("/load");
                          setOpen(false);
                        }}>
                        キャンセル
                      </Button>)}
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setOpen(false); // 一度閉じる
                          setTimeout(() => {
                            if (!(error || completeData?.u === "T")) {
                              dataImport(completeData as QRDataProp);
                              setDoneImport(true);
                              setOpen(true); // 少し遅らせて再度開く
                            } else {
                              navigate("/load");
                            }
                          }, 200);
                        }}>OK</Button>
                    </Dialog.ActionTrigger>
                  </HStack>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>)
      }
    </div>
  )
}