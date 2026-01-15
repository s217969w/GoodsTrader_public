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
    return (
        <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px"
      }}>
      <Tabs.Root defaultValue={"user"}>
        <Tabs.List>
          <Tabs.Trigger value="user">
            <BiUser />
            <Text>あなたから</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value="qr">
            <BsQrCode />
            <Text>相手から</Text>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="user">
          <SuggestBox
            recommend={recommend?.give}
            color="pink"
          />
        </Tabs.Content>
        <Tabs.Content value="qr">
          <SuggestBox
            recommend={recommend?.take}
            color="cyan"
          />
        </Tabs.Content>
      </Tabs.Root >
      </div>
    )
  } else {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px"
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
            overflow: "hidden"
          }}>
            <div>あなたから:</div>
            <SuggestBox recommend={recommend?.give} color="pink" />
          </div>

          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <div>相手から:</div>
            <SuggestBox recommend={recommend?.take} color="cyan" />
          </div>
        </div>
      </div >
    )
  }
}