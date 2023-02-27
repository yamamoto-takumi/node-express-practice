// Express フレームワークのインポート
const express = require('express');
const bodyParser = require('body-parser');

// アプリサーバを動かすポートの指定
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Getメソッドの例
 */
app.get('/', async(req, res, next) => {
    console.log(`こんにちは！！`);
    res.status(200).send({ message:"Hello World!!" });
});

/**
 * Getメソッドの例2
 * パスパラメータから値を取得
 */
app.get('/:name', async (req, res, next) => {
    // nameかた値を取得
    // 例：「http:/localhost:3000/Yamamoto」だとYamamotoがはいる
    const name = req.params.name;
    console.log(`name=${name}`);
    res.status(200).send({ name });
})

/**
 * POSTメソッドの例
 */
app.post('/hello', async (req, res, next) => {
    // bodyの中のnameから値を取得
    const name = req.body.name;

    const greetingMessage = `hello ${name}`;
    console.log(greetingMessage);
    res.status(200).send({message: greetingMessage});
})


// 指定したポートでサーバスタート
app.listen(PORT, () => {
    console.log(`start server PORT=${PORT}`);
});