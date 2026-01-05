import { Box, Button, Dialog, Grid, GridItem, HStack, Image, Portal, Stack, Tabs, Text } from "@chakra-ui/react";
import LZString from "lz-string";
import { useLocation, useNavigate } from "react-router-dom";
import type { tradeRecommendationResult } from "./RecommendInterface";
import type { QRDataProp } from "../QR/QRInterface";
import MatchingAlgorithm from "./MatchingAlgorithm";
import { BiUser } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { useIsNarrow } from "../../utils/useWindowSize";


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
                <Dialog.Title>Dialog Title</Dialog.Title>
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
          <Box
            background={"pink.200"}
            height={"60vh"}
            p={5}
            width={"80vw"}
            overflowY={"auto"}
          >
            <Stack>
              {
                [3, 2, 1].map((star) => (
                  <Stack key={star}>
                    <Text>おすすめ度: {stars[star - 1]}</Text>
                    <Grid gap={4}
                      templateColumns={"repeat(3, 1fr)"}
                      p={"2vw"}
                      width={"70vw"}
                    >
                      {recommend?.give
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <GridItem colSpan={1} key={card.id}>
                            <Image
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                              width={"20vw"}
                            />
                          </GridItem>
                        ))
                      }
                    </Grid>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="qr">
          <Box
            background={"blue.200"}
            height={"60vh"}
            p={5}
            width={"80vw"}
            overflowY={"auto"}
          >
            <Stack>
              {
                [3, 2, 1].map((star) => (
                  <Stack key={star}>
                    <Text>おすすめ度: {stars[star - 1]}</Text>
                    <Grid gap={4}
                      templateColumns={"repeat(3, 1fr)"}
                      p={"2vw"}
                      width={"70vw"}
                    >
                      {recommend?.take
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <GridItem colSpan={1} key={card.id}>
                            <Image
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                              width={"20vw"}
                            />
                          </GridItem>
                        ))
                      }
                    </Grid>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
        </Tabs.Content>
      </Tabs.Root >
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
            <div style={{
              backgroundColor: "pink",
              height: "100%",
              width: "100%",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
            >

              {
                [3, 2, 1].map((star) => (
                  <div key={star}>
                    <div>おすすめ度: {stars[star - 1]}</div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '20px',
                        gap: "10px",
                        boxSizing: 'border-box',
                        width: '100%'
                      }}
                    >
                      {recommend?.give
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <div style={{
                            width: cardWidth,
                            boxSizing: 'border-box',
                            flex: `0 0 ${cardWidth}`
                          }}>
                            <img
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <div>相手から:</div>
            <div style={{
              backgroundColor: "cyan",
              height: "100%",
              width: "100%",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              overflow: "auto"
            }}
            >

              {
                [3, 2, 1].map((star) => (
                  <div key={star}>
                    <div>おすすめ度: {stars[star - 1]}</div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '20px',
                        gap: "10px",
                        boxSizing: 'border-box',
                        width: '100%'
                      }}
                    >
                      {recommend?.take
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <div style={{
                            width: cardWidth,
                            boxSizing: 'border-box',
                            flex: `0 0 ${cardWidth}`
                          }}>
                            <img
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div >
    )
  }
}