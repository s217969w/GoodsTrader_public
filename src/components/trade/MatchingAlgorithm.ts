import type { QRDataProp } from "../QR/QRInterface";
import { type tradeRecommendationResult } from "./RecommendInterface";
import { type CardInfo, initCards } from "../../data/cardinfo";
const STORAGE_KEY = "myCardCollection";

export default function MatchingAlgorithm(data : QRDataProp){

  //自分
  const local = localStorage.getItem(STORAGE_KEY);

  const localData: CardInfo[] = local ? JSON.parse(local) : initCards;
  const localcard = initCards.map((card) => {
    const found = localData.find(c => c.id === card.id);
    return found ? { ...card, ...found } : card;
  });

  const QRcard: CardInfo[] = initCards.map((card) => {
    const found = data.c.find((d) => card.id === d[0]);
    return found ? {
      ...card,
      owned: found[1] as number,
      want: found[2] as number,
      unlimited: (found[3] === 1)
    } : card;
  });
  const tradeList : tradeRecommendationResult = {give: [], take: []};
  initCards.forEach(card => {
    const l = localcard.find((c) => card.id === c.id);
    const q = QRcard.find((c) => card.id === c.id);

    //ここから交換アルゴリズム
    //少し改良 on Oct 13
    if(l && q){
      //無限回収のコンフリクト
      if(l.unlimited && q.unlimited) return;
      // おすすめ度3: 無限回収
      if(l.unlimited && !q.unlimited) {
        if(q.owned - q.want > 0){
          tradeList.take.push({id: card.id, priority: 3});
          return;
        }
      }
      if(q.unlimited && !l.unlimited) {
        if(l.owned - l.want > 0){
          tradeList.give.push({id: card.id, priority: 3});
          return;
        }
      }

      //おすすめ度2: 需要供給のマッチ
      if(l.owned - l.want > 0 && q.want - q.owned > 0){
        tradeList.give.push({id: card.id, priority: 2});
        return;
      }
      if(q.owned - q.want > 0 && l.want - l.owned > 0){
        tradeList.take.push({id: card.id, priority: 2});
        return;
      }

      //おすすめ度1: 未所持と被り
      if(l.owned === 0 && q.owned > 1){
        tradeList.take.push({id: card.id, priority: 1});
        return;
      }
      if(q.owned === 0 && l.owned > 1){
        tradeList.give.push({id: card.id, priority: 1});
        return;
      }
    }
  });
  tradeList.give.sort((a, b) => b.priority - a.priority);
  tradeList.take.sort((a, b) => b.priority - a.priority);
  return tradeList
}