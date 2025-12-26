import { Box, Center, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BiServer } from "react-icons/bi";
import { BsQrCode, BsQuestionCircle, BsRepeat } from "react-icons/bs";
import { TbCards } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";


export default function SideMenu() {

  const menuItems = [
    { to: "/manage", label: "所持状況管理", icon: <TbCards /> },
    { to: "/trade", label: "交換", icon: <BsRepeat /> },
    { to: "/load", label: "読み込み", icon: <BiServer /> },
    { to: "/qr", label: "QRコード", icon: <BsQrCode /> },
    { to: "/about", label: "使い方", icon: <BsQuestionCircle /> }
  ]
  const currentpath = useLocation().pathname;
  return (
    <div style={{backgroundColor:"lightblue"}}>
      <Stack minW={"180px"} width={"10vw"} height={"100vh"}>
        <Link to={"/"} key={"/"}>
          <Box
            background={"blue.400"}
            _hover={{ bg: "blue.500" }}
          >
            <Center minH={"80px"} height={"10vh"} width={"10vw"} minW={"180px"}>
              <Text color={"black"} textStyle={"lg"}>Goods trader</Text>
            </Center>
          </Box>
        </Link>
        {menuItems.map(item => (
          <Link to={item.to} key={item.to}>
            <Box
              background={
                currentpath === item.to ?
                  "pink.200" : "blue.400"
              }
              _hover={{ bg: currentpath === item.to ? "pink.300" : "blue.500" }}>
              <Center minH={"50px"} height={"6vh"} width={"10vw"} minW={"180px"}>
                <HStack width="100%" justifyContent="flex-start" pl={4}>
                  <Box width={"30px"}>
                    <Flex>
                      {item.icon}
                    </Flex>
                  </Box>
                  <Text color={"black"}>{item.label}</Text>
                </HStack>
              </Center>
            </Box>
          </Link>
        ))}
      </Stack>
    </div>

  )
}