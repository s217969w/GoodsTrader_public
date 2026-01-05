import GoodsElement from './GoodsElement.tsx'
import { useCards } from '../../utils/storage.ts';
import type { CardInfo } from '../../data/cardinfo.ts';
import { useWindowSize } from '../../utils/useWindowSize.ts';

function GoodsTable() {

  const { cards, saveCards } = useCards();


  const updateCard = (id: string, updates: Partial<CardInfo>) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card);
    saveCards(updated);
  }

  const { width } = useWindowSize();
  const col = Math.max(1, Math.floor((width - 50) / 180));
  const cardWidth = width / col;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      {cards.map((card) => (
        <div key={card.id}
          style={{
            width: cardWidth,
            boxSizing: 'border-box',
            flex: `0 0 ${cardWidth}`
          }}
        >
          <GoodsElement card={card} updateCard={updateCard} cardWidth={cardWidth} />
        </div>
      ))}
    </div>
  )
}

export default GoodsTable