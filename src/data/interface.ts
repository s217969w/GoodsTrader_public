export interface Item{
  id: string;          // グッズID（画像ファイル名と対応）
  name: string;        // グッズ名
  seriesID: string;
}

export interface UserItem{
  userID: string;
  itemID: string;
  owned: number;       // 所持数
  want: number;        // 欲しい数
  unlimited: boolean; // 無限回収フラグ
}

export interface Series{
  id: string;
  name: string;
  img: File;
  itemList: Item[]; // シリーズ内のグッズリスト
}

export interface UserInfo{
  id: string;
  name: string;
  list: Series[]; // シリーズリスト
}

export interface Trade {
  id: string;
  fromUserId: string;
  toUserId: string;
  offered: TradeItem[];
  requested: TradeItem[];
  timestamp: Date;
  status: "request" | "confirm" | "complete" | "reject";
}


export interface TradeItem {
  itemID: string;
  count: number;
}
