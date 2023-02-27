// Express フレームワークのインポート
const express = require('express');
const bodyParser = require('body-parser');

// アプリサーバを動かすポートの指定
const PORT = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// users.jsで作成したルータ
const users = require('./routers/users');

// ルーティングの追加
// プレフィックスは/api/v1
app.use('/api/v1', router);

// Usersルートを追加
// ルータはrouters/users.jsのrouter
app.use('/Users', users.router);

/**
 * Getメソッドの例
 */
router.get('/', async(req, res, next) => {
    console.log(`こんにちは！！`);
    res.status(200).send({ message:"Hello World!!" });
});

/**
 * Getメソッドの例2
 * パスパラメータから値を取得
 */
router.get('/:name', async (req, res, next) => {
    // nameから値を取得
    // 例：「http:/localhost:3000/Yamamoto」だとYamamotoがはいる
    const name = req.params.name;
    console.log(`name=${name}`);
    res.status(200).send({ name });
})

/**
 * POSTメソッドの例
 */
router.post('/hello', async (req, res, next) => {
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