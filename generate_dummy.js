"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// generate_dummy.ts (Node.js + TypeScript)
var canvas_1 = require("canvas");
var fs = require("fs");
var path = require("path");
// カードの仕様に合わせて調整
var CARD_WIDTH = 250;
var CARD_HEIGHT = 350;
var OUTPUT_DIR = 'public/pic/cards';
// AからZまでのアルファベット配列を生成
var ALPHABETS = Array.from({ length: 26 }, function (_, i) { return String.fromCharCode(65 + i); });
function generateCard(letter) {
    var canvas = (0, canvas_1.createCanvas)(CARD_WIDTH, CARD_HEIGHT);
    var ctx = canvas.getContext('2d');
    // 1. 背景色の設定 (例: 薄いグレー)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    // 2. 文字の描画
    ctx.fillStyle = '#333333'; // 文字色
    ctx.font = 'bold 80px sans-serif'; // フォントサイズと種類
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 文字を中央に配置
    var x = CARD_WIDTH / 2;
    var y = CARD_HEIGHT / 2;
    ctx.fillText(letter, x, y);
    // 3. PNGファイルとして保存
    var buffer = canvas.toBuffer('image/png');
    var fileName = "".concat(letter, ".png");
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), buffer);
    console.log("Generated: ".concat(fileName));
}
// 実行
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
ALPHABETS.forEach(generateCard);
