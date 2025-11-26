import { Grid, GridItem } from '@chakra-ui/react'
import { useCards } from '../../utils/storage.ts';
import type { CardInfo } from '../../data/cardinfo.ts';
import MobileElement from './MobileElement.tsx';

export function MobileList() {

  const { cards, saveCards } = useCards();


  const updateCard = (id: string, updates: Partial<CardInfo>) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card);
    saveCards(updated);
  }
  return (
    <Grid gap={4}
      templateColumns={"repeat(3, 1fr)"}
      p={"2vw"}
      width={"80vw"}
    >
      {cards.map((card) => (
        <GridItem colSpan={1} key={card.id}>
          <MobileElement card={card} updateCard={updateCard} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default MobileList