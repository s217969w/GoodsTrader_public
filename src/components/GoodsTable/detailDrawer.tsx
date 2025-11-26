import {
  Drawer,
  Stack,
  Image,
  CloseButton,
  Portal,
  Text,
  Separator,
  Input,
  HStack,
  IconButton,
  Switch,
  Field,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { CardInfo } from '../../data/cardinfo';
import { BiDetail, BiCheck } from 'react-icons/bi';
import { InfoTip } from "../ui/toggle-tip"
import { Toaster, toaster } from '../ui/toaster';
import { useIsNarrow } from '../../utils/useWindowSize';

interface GoodsProps {
  card: CardInfo;
  updateCard: (id: string, updates: Partial<CardInfo>) => void;
}

function DetailDrawer({ card, updateCard }: GoodsProps) {
  const [isEditingOwned, setIsEditingOwned] = useState(false);
  const [isEditingWant, setIsEditingWant] = useState(false);
  const [ownedEdit, setOwned] = useState(card.owned.toString());
  const [wantEdit, setWant] = useState(card.want.toString());
  const [isUnlimited, setIsUnlimited] = useState(card.unlimited);


  const exitEditOwned = () => {
    setIsEditingOwned(false);
    const parsed = Number(ownedEdit);
    if (Number.isNaN(parsed)) {
      setOwned(card.owned.toString());//正常な表示に戻す
    } else {
      if (Number.isInteger(parsed) && parsed >= 0 && parsed <= 99) {
        updateCard(card.id, { owned: parsed });
      } else {
        setOwned(card.owned.toString());//正常な表示に戻す
        toaster.create({
          title: "入力エラー",
          description: "0~99の整数形式で入力してください",
          type: "warning",
        });
      }
    }
  }

  const exitEditWant = () => {
    setIsEditingWant(false);
    const parsed = Number(wantEdit);
    if (Number.isNaN(parsed)) {
      setWant(card.want.toString());
    } else {
      if (Number.isInteger(parsed) && parsed >= 0 && parsed <= 99) {
        updateCard(card.id, { want: parsed });
      } else {
        setWant(card.want.toString());
        toaster.create({
          title: "入力エラー",
          description: "0~99の整数形式で入力してください",
          type: "warning",
        });
      }
    }
  }

  const isNarrow = useIsNarrow();
  return (
    <Drawer.Root
      placement={isNarrow ? "bottom" : "end"}
      size={isNarrow ? "full" : "sm"}
    >
      <Drawer.Trigger asChild>
        <Image
          alt={card.name}
          src={`/pic/cards/${card.id}.png`}
          width={isNarrow ? "20vw" : ["120px", "9vw"]}
          minWidth={isNarrow ? "50px" : "120px"}
        />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header textStyle={"lg"}>
                <BiDetail /> {card.name}
              </Drawer.Header>
              <Drawer.Body>
                <Stack>
                  <Image
                    alt={card.name}
                    src={`/pic/cards/${card.id}.png`}
                  />
                  <Separator />
                  <Stack gap={5}>
                    <HStack>
                      <Text color={"blue.500"}>所持数</Text>
                      <InfoTip content={"このグッズを持っている個数です。数字をクリックして編集できます。"} />
                    </HStack>
                    {isEditingOwned ? (
                      <HStack width={"100%"}>
                        <Input
                          value={ownedEdit}
                          onChange={(e) => {
                            setOwned(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key == "Enter") { exitEditOwned(); }
                          }}
                        />

                        <IconButton
                          background={"green.400"}
                          size="sm"
                          onClick={exitEditOwned}>
                          <BiCheck />
                        </IconButton>
                      </HStack>
                    ) : (
                      <Text
                        fontSize={"lg"}
                        textAlign={"right"}
                        onClick={() => { setIsEditingOwned(true); }}
                      >
                        {card.owned}
                      </Text>)}
                  </Stack>

                  <Stack gap={5}>
                    <HStack>
                      <Text color={"green.500"}>ほしい</Text>
                      <InfoTip content={"何枚まで持っていたいかを指定できます。数字をクリックして編集できます。"} />
                    </HStack>
                    {isUnlimited ? (
                      <Text
                        fontSize={"lg"}
                        textAlign={"right"}
                      >
                        ∞
                      </Text>
                    ) : (
                      isEditingWant ? (
                        <HStack width={"100%"}>
                          <Input
                            value={wantEdit}
                            onChange={(e) => {
                              setWant(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                exitEditWant();
                              }
                            }}
                          />

                          <IconButton
                            background={"green.400"}
                            size="sm"
                            onClick={() => { exitEditWant() }}>
                            <BiCheck />
                          </IconButton>
                        </HStack>
                      ) : (
                        <Text
                          fontSize={"lg"}
                          textAlign={"right"}
                          onClick={() => { setIsEditingWant(true); }}
                        >
                          {card.want}
                        </Text>)
                    )}

                    <Toaster />
                    <Field.Root>
                      <Switch.Root
                        colorPalette={"green"}
                        checked={isUnlimited}
                        onCheckedChange={(e) => {
                          setIsUnlimited(e.checked);
                          updateCard(card.id, { unlimited: e.checked });
                        }}
                      >
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label> 無限回収 </Switch.Label>
                      </Switch.Root>
                    </Field.Root>
                  </Stack>
                </Stack>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" backgroundColor={"white"} />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Backdrop>
      </Portal>
    </Drawer.Root>
  )
}
export default DetailDrawer