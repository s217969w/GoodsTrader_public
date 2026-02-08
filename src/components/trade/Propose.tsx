import { Box, Button, Dialog, Grid, GridItem, HStack, Image, Portal, Stack, Tabs, Text } from "@chakra-ui/react";
import LZString from "lz-string";
import { useLocation, useNavigate } from "react-router-dom";
import type { tradeRecommendationResult } from "./RecommendInterface";
import type { QRDataProp } from "../QR/QRInterface";
import MatchingAlgorithm from "./MatchingAlgorithm";
import { BiUser } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { useIsNarrow } from "../../utils/useWindowSize";
import SuggestBox from "./SuggestBox";
import { useState } from "react";


export default function Propose() {
  const location = useLocation();
  const navigate = useNavigate();
  const isNarrow = useIsNarrow();
  let completeData: QRDataProp | null = null;
  let error = false;
  const stars = ["★", "★★", "★★★"]
  const cardWidth = 70;

  try {
    if (location.state?.qr) {
      const qrData = JSON.parse(location.state.qr);
      const qrDataDecode = LZString.decompressFromBase64(qrData);
      if (qrDataDecode) {
        completeData = JSON.parse(qrDataDecode);
      } else {
        error = true;
      }
    } else {
      error = true;
    }
  } catch (e) {
    console.error(e);
    error = true;
  }

  if (error) {
    return (
      <Dialog.Root open={true}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>読み込みエラー</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  不正な形式です。QRコードを再度確認してください。
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant={"outline"} onClick={() => navigate(-1)}>OK</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  };
  const recommend: tradeRecommendationResult | null =
    completeData ? MatchingAlgorithm(completeData) : null;
  if (isNarrow) {
    const [activeTab, setActiveTab] = useState<'user' | 'qr'>('user');
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px"
      }}>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <button
            style={{
              flex: 1,
              padding: "8px",
              background: activeTab === 'user' ? '#f8bbd0' : '#eee',
              border: "none",
              borderRadius: "8px 0 0 8px",
              cursor: "pointer"
            }}
            onClick={() => setActiveTab('user')}
          >
            <BiUser style={{ verticalAlign: "middle", marginRight: "4px" }} />
            あなたから
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px",
              background: activeTab === 'qr' ? '#b2ebf2' : '#eee',
              border: "none",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer"
            }}
            onClick={() => setActiveTab('qr')}
          >
            <BsQrCode style={{ verticalAlign: "middle", marginRight: "4px" }} />
            相手から
          </button>
        </div>
        <div style={{ flex: 1, height: "80%" }}>
          {activeTab === 'user' ? (
            <SuggestBox recommend={recommend?.give} color="pink" />
          ) : (
            <SuggestBox recommend={recommend?.take} color="cyan" />
          )}
        </div>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          gap: "5px"
        }}>
          <button
            style={{
              width: "200px",
              textAlign: "center",
              marginTop: "24px",
              backgroundColor: "skyblue"
            }}
          >交換リクエスト</button>
          <button
            style={{
              width: "200px",
              textAlign: "center",
              marginTop: "24px",
              backgroundColor: "lightgray"
            }}
          >リセット</button>
        </div >
      </div>
    );
  } else {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "80%",
        width: "100%",
        padding: "20px",
        gap: "10px"
      }}>
        <h1>
          おすすめ交換
        </h1>
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "30px"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            <div>あなたから:</div>
            <div style={{ height: "100%", overflow: "hidden" }}>
              <SuggestBox recommend={recommend?.give} color="pink" />
            </div>
          </div>

          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            <div>相手から:</div>
            <div style={{ height: "100%", overflow: "hidden" }}>
              <SuggestBox recommend={recommend?.take} color="cyan" />
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          gap: "5px"
        }}>
          <button
            style={{
              width: "200px",
              textAlign: "center",
              marginTop: "24px",
              backgroundColor: "skyblue"
            }}
          >交換リクエスト</button>
          <button
            style={{
              width: "200px",
              textAlign: "center",
              marginTop: "24px",
              backgroundColor: "lightgray"
            }}
          >リセット</button>
        </div >
      </div>
    )
  }
}