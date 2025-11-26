import { useEffect, useState } from "react";
import { initCards, type CardInfo } from "../data/cardinfo.ts";

const STORAGE_KEY = "myCardCollection";

export function useCards() {
  const [cards, setCards] = useState<CardInfo[]>([]);
  // 保存
  useEffect(() => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const localData: CardInfo[] = JSON.parse(local);

      const merged = initCards.map((card) => {
        const found = localData.find(c => c.id === card.id);
        return found ? { ...card, ...found } : card;
      });
      setCards(merged);
    } else {
      setCards(initCards);
    }
  }, []);
  const saveCards = (data: CardInfo[]) => {
    setCards(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };
  return { cards, saveCards };
}
