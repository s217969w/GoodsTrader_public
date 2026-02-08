import { Grid, GridItem } from '@chakra-ui/react'
import { useCards } from '../../utils/storage.ts';
import type { CardInfo } from '../../data/cardinfo.ts';
import MobileElement from './MobileElement.tsx';
import { useWindowSize } from '../../utils/useWindowSize.ts';

export function MobileList() {

  const { cards, saveCards } = useCards();


  const updateCard = (id: string, updates: Partial<CardInfo>) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card);
    saveCards(updated);
  }
  const { width } = useWindowSize();
    const col = 3;
    const pad = 20;
    const cardWidth = (width - pad * 2) / col;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: pad,
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {cards.map((card) => (
        <div key={card.id}
          style={{
            width: cardWidth,
            boxSizing: 'border-box',
            flex: `0 0 ${cardWidth}`,
            padding: "2px"
          }}
        >
          <MobileElement card={card} updateCard={updateCard} />
        </div>
      ))}
    </div>
  )
}

export default MobileList