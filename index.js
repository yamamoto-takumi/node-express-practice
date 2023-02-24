// Express フレームワークのインポート
const express = require('express')

// アプリサーバを動かすポートの指定
const PORT = 3000;
const app = express();

/**
 * Getメソッドの例
 */
app.get('/', async(req, res, next) => {
    console.log(`こんにちは！！`);
    res.send({ message:"Hello World!!" });
});


// 指定したポートでサーバスタート
app.listen(PORT, () => {
    console.log(`start server PORT=${PORT}`);
});