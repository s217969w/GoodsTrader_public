import { Box, Button, Center, FileUpload, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { HiCamera, HiUpload } from "react-icons/hi"
import jsQR from "jsqr"
import { useNavigate } from "react-router-dom"
import { Toaster, toaster } from '../ui/toaster'
import { Scanner } from "@yudiel/react-qr-scanner"
import { useIsNarrow } from "../../utils/useWindowSize"

interface props {
  usage: string;
}

export default function QRRead({ usage }: props) {
  const [loading, setLoading] = useState(false)
  const [useScan, setUseScan] = useState(false)
  const navigate = useNavigate()
  const dst = (usage === "trade") ? ("/trade/propose") : ("/load/confirm")

  // 画像ファイルをcanvasで読み込んでQR解析
  const handleFile = async (file: File) => {
    setLoading(true)
    const reader = new FileReader()
    reader.onload = async (e) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, canvas.width, canvas.height)
        if (code) {
          navigate(dst, { state: { qr: code.data } })
        } else {
          toaster.create({ type: "error", title: "QRコードが見つかりません" })
        }
        setLoading(false)
      }
      if (typeof e.target?.result === "string") {
        img.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
  // FileUploadのonChangeイベント
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    }
  }

  const isNarrow = useIsNarrow();
  return (
    <Center>
    <Stack>
      <FileUpload.Root accept={["image/*"]}>
        <FileUpload.HiddenInput onChange={handleChange} />
        <FileUpload.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            loading={loading}
            width={isNarrow ? "70vw" : "40vw"}
          >
            <HiUpload /> ファイルのアップロード
          </Button>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>
      <Text>または</Text>
      {useScan ? (
        <Box height={"60vh"}>
          <Scanner onScan={(result) => { navigate(dst, { state: { qr: result } }) }} />
        </Box>
      ) : (
        <Button
          variant="outline"
          size="sm"
          loading={loading}
          width={isNarrow ? "70vw" : "40vw"}
          onClick={() => setUseScan(true)}
        >
          <HiCamera /> カメラ起動
        </Button>
      )}
      <Toaster />
    </Stack>
    </Center>
  )
}