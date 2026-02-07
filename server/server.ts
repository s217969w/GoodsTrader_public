import * as express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// ダミーデータ
const users = [
  { userID: 'user1', seriesList: ['series1', 'series2'] },
  // ...他ユーザー
];
const series = [
  { seriesID: 'series1', itemList: ['item1', 'item2'] },
  // ...他シリーズ
];


// /get/series
app.get('/get/series', (req, res) => {
  const { userID } = req.query;
  const user = users.find(u => u.userID === userID);
  if (!user) return res.status(404).json({ message: 'user does not exist.' });
  res.status(200).json({ seriesList: user.seriesList });
});

// /get/table
app.get('/get/table', (req, res) => {
  const { seriesID } = req.query;
  const s = series.find(s => s.seriesID === seriesID);
  if (!s) return res.status(404).json({ message: 'series does not exist.' });
  res.status(200).json({ itemList: s.itemList });
});

// /get/data
app.get('/get/data', (req, res) => {
  const { userID, seriesID } = req.query;
  const user = users.find(u => u.userID === userID);
  if (!user) return res.status(404).json({ message: 'user does not exist.' });
  const data = manageData.filter(d => d.userID === userID && d.seriesID === seriesID);
  res.status(200).json({ data });
});

// /save
app.post('/save', (req, res) => {
  const { data, userID } = req.body;
  const user = users.find(u => u.userID === userID);
  if (!user) return res.status(404).json({ message: 'user does not exist.' });
  // 保存処理（省略）
  res.status(200).json({ message: 'saved all changes.' });
});

// /QR/generate
app.post('/QR/generate', (req, res) => {
  const { userID, seriesID } = req.body;
  // QR生成処理（省略）
  res.status(200).json({ message: 'QR code had generated.', QRkey: 'dummyQRkey' });
});

// /QR/read
app.get('/QR/read', (req, res) => {
  const { QRkey } = req.query;
  // QRkey検証処理（省略）
  res.status(200).json({ userID: 'user1', username: 'UserName', res: {} });
});

// /request
app.post('/request', (req, res) => {
  const { QRkey, give, take } = req.body;
  // リクエスト処理（省略）
  res.status(200).json({ message: 'request successfully sent.' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});