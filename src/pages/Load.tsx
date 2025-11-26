import { Box, Stack, Text } from "@chakra-ui/react";
import QRRead from "../components/QR/QRRead";

export default function Load() {
  return (
    <Box height="80vh" overflow="hidden">

      <Stack gap={6}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
          データの読み込み
        </Text>
        <Text>
          QRコードの画像ファイルをアップロードするか、
          <br />
          カメラで読み込んでください
        </Text>
        <Box flex="1" height={"100%"} background={"white"} overflowX={"hidden"}>
          <QRRead usage={"load"} />
        </Box>
      </Stack>
    </Box>
  )
}