// Express フレームワークのインポート
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'node-express-practice API',
            version: '0.0.1'
        },
    },
    apis: ['./index.js', './routers/*.js']
}

// アプリサーバを動かすポートの指定
const PORT = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));


// users.jsで作成したルータ
const users = require('./routers/users');

// ルーティングの追加
// プレフィックスは/api/v1
app.use('/api/v1', router);

// Usersルートを追加
// ルータはrouters/users.jsのrouter
app.use('/Users', users.router);

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: returns greeting
 *     description: 挨拶を返します
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: your name
 *         in : query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: returns a greeting
 *         examples:
 *           result:
 *             message: Hello Yamamoto!
 *             yourName: Yamamoto
 */
router.get('/', async(req, res, next) => {
    const name = req.query.name;
    console.log(`こんにちは！！`);
    res.status(200).send({ message:`Hello ${name}`, yourName: name});
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