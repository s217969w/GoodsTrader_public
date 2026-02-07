user
- password: string(HASH)
- userID: string
- userName: string
- seriesList: seriesID[] 持っているシリーズのリスト->series.json

series
- seriesID: string
- seriesName: string
- seriesImg: string
- itemList: itemID[] シリーズ内のグッズリスト

manageData
- userID: string
- seriesID: string
- itemID: string
- count: number
- want: number
- unlimited: bool

itemInfo
- itemID: string
- itemImg: file
- itemname: string
- tradeCount: number //将来的なデータ分析用。APIで返さない

tradeList
- tradeUUID: string
- srcUserID: string //リクエスト送信側
- dstUserID: string //リクエスト受信側
- give: file
- take: file
- status: {1:"request", 2:"confirm", 0:"complete", -1:"reject"}

QRkey
- key: string(HASH)
- userID: string
- seriesID: string