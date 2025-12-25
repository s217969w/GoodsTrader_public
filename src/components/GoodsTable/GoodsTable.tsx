import { Grid, GridItem } from '@chakra-ui/react'
import GoodsElement from './GoodsElement.tsx'
import { useCards } from '../../utils/storage.ts';
import type { CardInfo } from '../../data/cardinfo.ts';

function GoodsTable() {

  const { cards, saveCards } = useCards();


  const updateCard = (id: string, updates: Partial<CardInfo>) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card);
    saveCards(updated);
  }
  return (
    <Grid gap={8}
    templateColumns={{
      sm: "repeat(2, 1fr)",     // 小さめタブレット: 3列
      md: "repeat(3, 1fr)",     // タブレット: 4列
      lg: "repeat(4, 1fr)",     // PC: 5列
      xl: "repeat(6, 1fr)",     // 大きな画面: 6列
    }}
    p={"2vw"}>
      {cards.map((card) => (
        <GridItem colSpan={1} key={card.id}>
          <GoodsElement card={card} updateCard={updateCard} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default GoodsTable