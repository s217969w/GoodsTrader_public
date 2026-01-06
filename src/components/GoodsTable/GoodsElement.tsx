import { Button } from '@chakra-ui/react'
import '../Filter/DetailSearch.tsx'
import type { CardInfo } from '../../data/cardinfo.ts'
import DetailDrawer from './detailDrawer.tsx';

interface GoodsProps {
  card: CardInfo;
  updateCard: (id: string, updates: Partial<CardInfo>) => void;
  cardWidth: number;
}

function GoodsElement({ card, updateCard, cardWidth }: GoodsProps) {


  return (
    <div style={{
      width: cardWidth,
      display: "flex",
      flexDirection: "column",
      padding: "25px"
    }}>
      <DetailDrawer card={card} updateCard={updateCard} />
      <div style={{ color: "#0099ffff", textAlign: "left" }}>所持数</div>
      <div style={{
        textAlign: "center",
        padding: "2px",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "5px"
      }}>
        <Button
          width={"30%"}
          variant="outline"
          background={"pink.200"}
          onClick={() => updateCard(card.id, { owned: card.owned - 1 })}
          disabled={card.owned === 0}
        >
          -
        </Button>
        <div
          style={{ width: "40%", padding: "8px" }}
        >{card.owned}</div>
        <Button
          width={"30%"}
          variant="outline"
          background={"blue.200"}
          onClick={() =>
            updateCard(card.id, { owned: card.owned + 1 })
          }
          disabled={card.owned === 99}
        >
          +
        </Button>
      </div>
      <div style={{ color: "#00bd2fff", textAlign: "left" }}>ほしい</div>
      <div style={{
        textAlign: "center",
        padding: "2px",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "5px"
      }}>
        <Button
          width={"30%"}
          variant="outline"
          onClick={() => updateCard(card.id, { want: card.want - 1 })}
          disabled={card.want === 0 || card.unlimited}
        >
          -
        </Button>
        <div
          style={{ width: "40%", padding: "8px" }}
        >{card.unlimited ? "∞" : (card.want)}</div>
        <Button
          width={"30%"}
          variant="outline"
          background={"green.200"}
          onClick={() => updateCard(card.id, { want: card.want + 1 })}
          disabled={card.want === 99 || card.unlimited}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default GoodsElement