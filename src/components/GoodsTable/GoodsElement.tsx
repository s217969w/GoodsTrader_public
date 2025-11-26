import {
  HStack,
  Stack,
  Button,
  Field,
  Center,
} from '@chakra-ui/react'
import '../Filter/DetailSearch.tsx'
import type { CardInfo } from '../../data/cardinfo.ts'
import DetailDrawer from './detailDrawer.tsx';

interface GoodsProps {
  card: CardInfo;
  updateCard: (id: string, updates: Partial<CardInfo>) => void;
}

function GoodsElement({ card, updateCard }: GoodsProps) {


  return (
    <Stack width={"9vw"}>
      <Field.Root>
      <Center>
        <DetailDrawer card={card} updateCard={updateCard} />
      </Center>
        <Field.Label color={"blue.300"}>所持数</Field.Label>
        <Center>
          <HStack gap="3" p={2}>
            <Button
              variant="outline"
              width={["48px", "3vw"]}
              height={["32px", "2vw"]}
              aspectRatio={1.5}
              background={"pink.200"}
              onClick={() => updateCard(card.id, { owned: card.owned - 1 })}
              disabled={card.owned === 0}
            >
              -
            </Button>
            {card.owned}
            <Button
              variant="outline"
              width={["48px", "3vw"]}
              height={["32px", "2vw"]}
              aspectRatio={1}
              background={"blue.200"}
              onClick={() =>
                updateCard(card.id, { owned: card.owned + 1 })
              }
              disabled={card.owned === 99}
            >
              +
            </Button>
          </HStack>
        </Center>
      </Field.Root>
      <Field.Root>
        <Field.Label color={"green.300"}>ほしい</Field.Label>
        <Center>
          <HStack gap="3" p={2}>
            <Button
              variant="outline"
              width={["48px", "3vw"]}
              height={["32px", "2vw"]}
              aspectRatio={1}
              onClick={() => updateCard(card.id, { want: card.want - 1 })}
              disabled={card.want === 0 || card.unlimited}
            >
              -
            </Button>
            {card.unlimited ? "∞" : (card.want)}
            <Button
              variant="outline"
              width={["48px", "3vw"]}
              height={["32px", "2vw"]}
              aspectRatio={1}
              background={"green.200"}
              onClick={() => updateCard(card.id, { want: card.want + 1 })}
              disabled={card.want === 99 || card.unlimited}
            >
              +
            </Button>
          </HStack>
        </Center>
      </Field.Root>
    </Stack>
  )
}

export default GoodsElement