// generate_dummy.ts (Node.js + TypeScript)
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

// カードの仕様に合わせて調整
const CARD_WIDTH: number = 250;
const CARD_HEIGHT: number = 350;
const OUTPUT_DIR: string = 'public/pic/cards';

// AからZまでのアルファベット配列を生成
const ALPHABETS: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function generateCard(letter: string): void {
    const canvas = createCanvas(CARD_WIDTH, CARD_HEIGHT);
    const ctx = canvas.getContext('2d');

    // 1. 背景色の設定 (例: 薄いグレー)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    // 2. 文字の描画
    ctx.fillStyle = '#333333'; // 文字色
    ctx.font = 'bold 80px sans-serif'; // フォントサイズと種類
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 文字を中央に配置
    const x: number = CARD_WIDTH / 2;
    const y: number = CARD_HEIGHT / 2;
    ctx.fillText(letter, x, y);

    // 3. PNGファイルとして保存
    const buffer: Buffer = canvas.toBuffer('image/png');
    const fileName: string = `${letter}.png`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), buffer);
    console.log(`Generated: ${fileName}`);
}

// 実行
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

ALPHABETS.forEach(generateCard);