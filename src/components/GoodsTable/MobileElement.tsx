import {
  Stack,
  Center,
  Text,
  HStack,
} from '@chakra-ui/react'
import '../Filter/DetailSearch.tsx'
import type { CardInfo } from '../../data/cardinfo.ts'
import DetailDrawer from './detailDrawer.tsx';

interface GoodsProps {
  card: CardInfo;
  updateCard: (id: string, updates: Partial<CardInfo>) => void;
}

export function MobileElement({ card, updateCard }: GoodsProps) {


  return (
    <Stack width={"20vw"}>
      <Center>
        <DetailDrawer card={card} updateCard={updateCard} />
      </Center>
      <Center>
        <HStack>
          <Text color={"blue.500"}>{card.owned}</Text>
          /
          <Text color={"green.500"}>{card.unlimited ? "∞" : card.want}</Text>
        </HStack>
      </Center>
    </Stack>
  )
}

export default MobileElement