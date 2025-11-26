import { Box, Stack, Text } from "@chakra-ui/react";
import GenerateForm from "../components/QR/GenerateForm";

export default function QR() {
  return (
    <Box height="80vh" overflow="hidden">

      <Stack gap={4}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
          QRコード生成
        </Text>
        <Box
          background={"white"}
          borderRadius={"md"}
          overflow={"hidden"}
          px={{ base: 0, md: 4 }}
          py={{ base: 0, md: 4 }}
        >
          <GenerateForm />
        </Box>
      </Stack>
    </Box>
  )
}