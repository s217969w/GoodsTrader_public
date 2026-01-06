import React from 'react'
import { tradeRecommendation } from './RecommendInterface';

interface prop {
  recommend: tradeRecommendation[] | undefined;
  color: string;
};

export default function SuggestBox({ recommend, color }: prop) {
  const stars = ["★", "★★", "★★★"]
  const cardWidth = 70;
  return (
    <div style={{
      backgroundColor: color,
      height: "100%",
      width: "100%",
      padding: "5px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}
    >

      {
        [3, 2, 1].map((star) => (
          <div key={star}>
            <div>おすすめ度: {stars[star - 1]}</div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '20px',
                gap: "10px",
                boxSizing: 'border-box',
                width: '100%'
              }}
            >
              {recommend
                ?.filter((card) => card.priority === star)
                .map((card) => (
                  <div style={{
                    width: cardWidth,
                    boxSizing: 'border-box',
                    flex: `0 0 ${cardWidth}`
                  }}>
                    <img
                      alt={card.id}
                      src={`/pic/cards/${card.id}.png`}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
