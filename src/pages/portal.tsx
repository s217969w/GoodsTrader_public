import { Box, Card, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { BsQrCode, BsQuestionCircle, BsRepeat } from "react-icons/bs";
import { BiServer } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TbCards } from "react-icons/tb";
import { useIsNarrow } from "../utils/useWindowSize";

export default function Portal() {
  const isNarrow = useIsNarrow();
  const menuItems = [
    { to: "/manage", label: "所持状況管理", icon: <TbCards />, disc: "まずは持っているカードの枚数を登録しましょう" },
    { to: "/qr", label: "QRコード", icon: <BsQrCode />, disc: "登録したらQRコードを作成しましょう" },
    { to: "/trade", label: "交換", icon: <BsRepeat />, disc: "ほかの人と交換したい場合はこちら" },
    { to: "/load", label: "読み込み", icon: <BiServer />, disc: "別の端末からデータを読み込む場合はこちら" },
    { to: "/about", label: "使い方", icon: <BsQuestionCircle />, disc: "詳しい使い方はこちら" }
  ]
  return (
    <Stack
      width={isNarrow ? "100%" : "100%"}>

      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
        Goods trader へようこそ
      </Text>
      {isNarrow ? (
        <Box width="100%" overflow="hidden" px={0}>
          <Stack px={0}>
            {menuItems.map(item => (
              <Link to={item.to} key={item.to}>
                <GridItem colSpan={1}>
                  <Card.Root>
                    <Card.Header>
                      <HStack>
                        {item.icon}
                        {item.label}
                      </HStack>
                    </Card.Header>
                    <Card.Body>
                      {item.disc}
                    </Card.Body>
                  </Card.Root>
                </GridItem>
              </Link>
            ))}
          </Stack>
        </Box>
      ) : (
        <Box height="80vh" overflow="hidden" width="100%">
          <Grid gap={8} templateColumns={"repeat(2, 1fr)"} p={"2vw"}>
            {menuItems.map(item => (
              <Link to={item.to} key={item.to}>
                <GridItem colSpan={1}>
                  <Card.Root>
                    <Card.Header>
                      <HStack>
                        {item.icon}
                        {item.label}
                      </HStack>
                    </Card.Header>
                    <Card.Body>
                      {item.disc}
                    </Card.Body>
                  </Card.Root>
                </GridItem>
              </Link>
            ))}
          </Grid>
        </Box>
      )}

    </Stack>
  )
}