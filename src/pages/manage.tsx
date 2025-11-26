import { Box, Stack } from "@chakra-ui/react";
import DetailSearch from "../components/Filter/DetailSearch";
import GoodsTable from "../components/GoodsTable/GoodsTable";
import MobileList from "../components/GoodsTable/MobileList";
import { useIsNarrow } from "../utils/useWindowSize";

export default function Manage() {
  const isNarrow = useIsNarrow();
  return (
    <Box height="80vh" overflow="hidden"
      width={isNarrow ? "100%" : "100%"}>
      <Stack height={"80vh"}>
        <DetailSearch />
        <Box flex="1" height={"100%"} background={"orange.100"} overflowX={"auto"}>
          {isNarrow ? <MobileList /> : <GoodsTable />}
        </Box>
      </Stack>
    </Box>
  )
}