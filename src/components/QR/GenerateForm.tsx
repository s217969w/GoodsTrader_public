import { Center, Field, Input, NativeSelect, Stack } from "@chakra-ui/react";
import { useState } from "react";
import QRModal from "./QRModal";


export default function GenerateForm() {
  const [name, setName] = useState("");
  const [usage, setUsage] = useState("");

  return (
    <Center>
    <Stack>
      <Field.Root>
        <Field.Label>名前</Field.Label>
        <Input
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <Field.Label>QRコードの種類</Field.Label>
        <NativeSelect.Root width={"200px"}>
          <NativeSelect.Field
            placeholder="(選択してください)"
            value={usage}
            onChange={(e) => {
              setUsage(e.target.value);
            }}
          >
            {/* L: Load T: Trade */}
            <option value="L">データの持ち運び</option>
            <option value="T">交換</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
      <QRModal name={name} usage={usage} />
    </Stack>
    </Center>
  )
}