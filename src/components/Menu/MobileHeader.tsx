import { Box, CloseButton, Drawer, HStack, IconButton, Portal } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import MobileMenu from "./MobileMenu";


export default function MobileHeader() {
  return (
    <Box
      as={"header"}
      width={"100%"}
      position={"sticky"}
      top={0}
      zIndex={"docked"}
      bg={"white"}
      borderBottomWidth={1}
      px={4}
      py={2}
    >
      <HStack justifyContent={"space-between"}>
        <Box>
          <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Goods Trader
          </h2>
        </Box>
        <Drawer.Root placement={"bottom"}>
          <Drawer.Trigger asChild>
            <IconButton variant={"ghost"} backgroundColor={"white"}>
              <IoMenu />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop>
              <Drawer.Positioner>
                <Drawer.Content>

                  <Drawer.Header>
                    メニュー
                  </Drawer.Header>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>

                  <Drawer.Context>
                    {(st) => (
                      <Drawer.Body>
                        <MobileMenu {...st} />
                      </Drawer.Body>
                    )}
                  </Drawer.Context>
                </Drawer.Content>
              </Drawer.Positioner>
            </Drawer.Backdrop>
          </Portal>
        </Drawer.Root>
      </HStack>
    </Box>
  )
}
