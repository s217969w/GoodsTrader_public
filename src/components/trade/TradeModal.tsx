import React from "react";
import QRRead from "../QR/QRRead";
import { BsQrCode } from "react-icons/bs";

interface TradeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function TradeModal({ isOpen, setIsOpen }: TradeModalProps) {
  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.4)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        borderRadius: "12px",
        minWidth: "320px",
        maxWidth: "90vw",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        position: "relative"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>QR読み込み</div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              padding: "4px"
            }}
            aria-label="閉じる"
          >×</button>
        </div>
        <div style={{ margin: "16px 0", textAlign: "center" }}>
          QRコードの画像ファイルをアップロードするか、<br />
          カメラで読み込んでください
        </div>
        <QRRead setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}