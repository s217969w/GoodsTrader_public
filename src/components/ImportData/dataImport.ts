import type { QRDataProp } from '../QR/QRInterface';
import { initCards } from '../../data/cardinfo';

const STORAGE_KEY = "myCardCollection";

export default function dataImport(data: QRDataProp) {
    if (!data || !Array.isArray(data.c)) return;

    // QRDataProp.c から CardInfo 部分情報を作成
    const importedCards = data.c.map((arr) => {
      return {
        id: String(arr[0]),
        owned: Number(arr[1]),
        want: Number(arr[2]),
        unlimited: arr[3] === 1,
      };
    });

    // initCardsとマージ
    const merged = initCards.map((card) => {
      const found = importedCards.find((c) => c.id === card.id);
      return found ? { ...card, ...found } : card;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}
