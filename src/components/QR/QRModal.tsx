import { Button, Center, CloseButton, Dialog, Portal, QrCode, Stack, Text } from "@chakra-ui/react";
import QRDataMake from "./QRDataMake";
import {toPng} from "html-to-image"
import { useRef } from "react";
import { HiDownload } from "react-icons/hi";

interface formprop {
  name: string,
  usage: string,
}

export default function QRModal(prop: formprop) {
  const qrValue = QRDataMake(prop);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if(qrCodeRef.current === null) return;
    try {
      const dataUrl = await toPng(qrCodeRef.current, {
        cacheBust: true, // キャッシュの問題を回避
      });

      // ダウンロード用のリンクを作成
      const link = document.createElement('a');
      link.download = `${prop.name}_QR.png`; // ファイル名を指定
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('link generate failed', error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant={"solid"}
          colorPalette={"blue"}
          background={"blue.500"}
          disabled={((prop.name === "") || (prop.usage === ""))}
        >生成</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title> 生成完了 </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              {
                (prop.usage === "T") ? (
                  <Text>
                    このQRコードを交換相手に読み取ってもらうと、お互いのグッズをもとに
                    交換方法を提示してくれます。
                  </Text>) : (
                  <Text>
                    別の端末でこのコードを読み取ると、あなたのグッズ所持情報を引き継ぐことができます。
                  </Text>)
              }
              {(prop.name && prop.usage && qrValue) ? (
                <Stack>
                <div ref={qrCodeRef}>
                    <Center>
                <QrCode.Root value={qrValue} size={"xl"}>
                  <QrCode.Frame style={{background: "white"}}>
                    <QrCode.Pattern style={{fill: "black"}}/>
                  </QrCode.Frame>
                </QrCode.Root>
                </Center>
                </div>
                <Button variant={"outline"} onClick={handleDownload}>
                    <HiDownload /> ダウンロード
                </Button>
                </Stack>
              ) : (
                <Text color="red.500">QRコードを生成できません。</Text>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}