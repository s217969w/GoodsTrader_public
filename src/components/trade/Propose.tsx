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
      <Stack>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
          おすすめ交換
        </Text>
        <HStack>
            <Stack>
                あなたから:
        <Box
            background={"pink.200"}
            height={"70vh"}
            p={5}
            width={"35vw"}
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
                      width={"30vw"}
                    >
                      {recommend?.give
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <GridItem colSpan={1} key={card.id}>
                            <Image
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                              width={"8vw"}
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
          </Stack>
            <Image alt={"LR"} src="/pic/arrow/LR.png" width={"3vw"} />
          <Stack>
            相手から:
          <Box
            background={"blue.200"}
            height={"70vh"}
            p={5}
            width={"35vw"}
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
                      width={"30vw"}
                    >
                      {recommend?.take
                        .filter((card) => card.priority === star)
                        .map((card) => (
                          <GridItem colSpan={1} key={card.id}>
                            <Image
                              alt={card.id}
                              src={`/pic/cards/${card.id}.png`}
                              width={"8vw"}
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
          </Stack>
              </HStack>
      </Stack>
    )
  }
}