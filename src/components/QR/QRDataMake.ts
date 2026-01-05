import { initCards, type CardInfo } from "../../data/cardinfo.ts";
import LZString from "lz-string";
const STORAGE_KEY = "myCardCollection";
import type { ArrElement, QRDataProp } from "./QRInterface.ts";

interface formprop {
  name: string,
}



export default function QRDataMake(prop: formprop) {
  let cards : ArrElement[] = [];
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    const localData: CardInfo[] = JSON.parse(local);
    cards = initCards.map((card) => {
      const found = localData.find(c => c.id === card.id);
      let rt : ArrElement = {
          i:card.id,
          o:0,
          w:0,
          u:0
        };
      if(found && (found.owned > 0 || found.want > 0)){
        rt = {
          i:found.id,
          o:found.owned,
          w:found.want,
          u:(found.unlimited) ? 1 : 0
        };
      }
      return rt;
    });

  } else {
    cards = initCards.map((card) => {
      const rt : ArrElement = {
        i:card.id,
        o:card.owned,
        w:card.want,
        u:(card.unlimited) ? 1 : 0
      };
      return rt;
    });
  }
  cards = cards.filter((card) => (card.o + card.w  + card.u > 0));
  const cardsArr = cards.map(card => [card.i, card.o, card.w, card.u]);
  // QRコードに埋め込むデータ
  const qrData : QRDataProp = {
    n: prop.name,
    c: cardsArr,
  };

  // JSON文字列として返す
  const compressed = LZString.compressToBase64(JSON.stringify(qrData));
  return JSON.stringify(compressed);
}