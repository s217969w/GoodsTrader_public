import { Box, Center, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BiServer } from "react-icons/bi";
import { BsQrCode, BsQuestionCircle, BsRepeat } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { TbCards } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

interface MobileMenuProps {
  setOpen: (open: boolean) => void;
}

export default function MobileMenu(prop: MobileMenuProps) {

  const menuItems = [
    { to: "/", label: "ホーム", icon: <HiHome /> },
    { to: "/manage", label: "所持状況管理", icon: <TbCards /> },
    { to: "/trade", label: "交換", icon: <BsRepeat /> },
    { to: "/load", label: "読み込み", icon: <BiServer /> },
    { to: "/qr", label: "QRコード", icon: <BsQrCode /> },
    { to: "/about", label: "使い方", icon: <BsQuestionCircle /> }
  ]
  const currentpath = useLocation().pathname;

  return (
    <Box
      top={0}
      height="80vh"
      width="100%"
      bg="blue.50"
      boxShadow="md"
      alignItems={"flex-start"}
    >
      <Stack
      width={"100%"}
      height={"80vh"}
      >
        {menuItems.map(item => (
          <Link to={item.to} key={item.to}>
            <Box
              background={
                currentpath === item.to ?
                  "pink.200" : "blue.100"
              }
              _hover={{
                bg: currentpath === item.to ? "pink.300" : "blue.200"
              }}
              onClick={() => prop.setOpen(false)}
            >
              <Center minH={"50px"} height={"8vh"} width={"100%"}>
                <HStack width="100%" justifyContent="flex-start" pl={4}>
                  <Box width={"30px"}>
                    <Flex>
                      {item.icon}
                    </Flex>
                  </Box>
                  <Text color={"black"} textStyle={"lg"}>{item.label}</Text>
                </HStack>
              </Center>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}