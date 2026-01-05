import { Box, CloseButton, Dialog, Portal, Stack, Text, useDialog } from "@chakra-ui/react";
import QRRead from "../QR/QRRead";
import { BsQrCode } from "react-icons/bs";

export default function TradeModal() {
  const dialog = useDialog()
  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger asChild>
        <div style={{
          height: "100%",
          fontSize: "12px",
          padding: "10px",
          gap: "8px",
          color: "white",
          display: "flex"
        }}>
          <BsQrCode height={"40px"} />
          <div>QR読み込み</div>
        </div>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title> 交換 </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <div style={{ textAlign: "center" }}>
                QRコードの画像ファイルをアップロードするか、<br />
                カメラで読み込んでください
              </div>
              <QRRead dialog={dialog} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}