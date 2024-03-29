# node-express-practice
Node.js+ExpressフレームワークによるWebAPIの練習用

# Node.jsの初期化
※package.jsonがない場合
Node.jsで使うディレクトリを作成し、下記コマンドで「package.json」を作成する

```
npm init
```
パッケージ名やバージョン、エントリーポイントなどを聞かれるため入力
特に指定しない場合はEnterで飛ばしてOK(デフォルトの設定がつかわれるため)

```
package name: (express-practice) node-practice-app
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: (https://github.com/yamamoto-takumi/node-express-practice.git)
keywords:
author:
license: (ISC)
About to write to C:\Users\taku_yamamoto\source\repos\node-express-practice\package.json:

~~
{package.json}の中身が表示される
~~

Is this OK? (yes) y
```

するとディレクトリの中にpackage.jsonファイルが作成される

※基本的にpackage.jsonの中身はscriptの内容のみ変更する

  他のdependencyなどは基本的に編集しないこと(npm installなどの整合性がなくなるため)

## 必要なパッケージのインストール
- expressのインストール
```
npm install express
```
※上記インストール完了すると「package.json」の「dependencies」の中に「express」が自動で追加される

ただ動かすだけのときは下記だけで良い
```
npm install
```

※上記ではpackage.jsonの依存パッケージがインストールされる

## エントリーポイントの作成
npm initでエントリーポイントを指定したと思うので、そのエントリーポイントを作成する。
(デフォルトではindex.jsがエントリーポイントとなっている)

```
touch index.js
```

index.jsファイルが作成されるので、index.jsファイルにコードを書いていく

## Nodeの起動
エントリーポイントのファイル(index.js)と同じディレクトリで下記コマンドを実行
```
node index.js
```
「start server PORT=3000」と表示されればサーバ起動完了

http://localhost:3000
へアクセスして、JSONの値が返却されてればOK!

## GET, POSTなどを使用する際の注意点
Node.js + Expressを使う際にHTMLファイルの表示やPOSTのBodyパラメータを取得する際は下記設定を追加するようにしてください。

- GETでHTMLファイルや画像ファイルを使う場合
```index.js
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
```

- POSTでBodyのパラメータをJSONで取得したいとき
body-parserパッケージをインストール
```
npm install body-parser
```

index.jsに下記のようにbody-parserの設定を追加する

```index.js
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

## .gitignoreについて
.gitignoreはGitでの管理を無視するための設定ファイルです。

不必要なファイルをGitのコミットに含めないようにしてくれます。

例えばnode_modulesフォルダは大量のパッケージファイルが入っていますが、package.jsonファイルに必要なパッケージは記載しているため

npm installすれば同じ環境を作り出すことができます。

そのため、node_modulesファイルはgitでファイル管理する必要はないため、上記.gitignoreへ記載することで、無視することができます。

他にも秘密鍵や.envファイルなどファイル管理で使うと漏えいの可能性があるものに対して使うのが一般的です。

# routerについて
express.Router()を利用することでルーティングを実現できます。

例: Users ルート(ユーザ情報用のルート)を追加する場合
```
const app = express();
// ルーターの作成
const router = express.Router();

// routers/users.jsをインポート
const user = require('./routers/users.js');

// 既存ルーティングにプレフィックスを追加
app.use('/api/v1', router);

// Usersルーティングの追加
app.use('/Users', user.router);

```

## routerの作成
例：routers/users.js

```
const express = require('express');
// ルータの作成
const router = express.Router();

// ルータへGetメソッド追加
router.get('/', async (req, res, next) => {
  // 処理
});

// モジュールをexportする
// exportすることで、外部からrequireでこのルータを利用できる
module.exports = {
  router
}
```

requireで外部からもってくる例
```
const users = require('./routers/users');

// module.exportしたrouterをセットする
app.use('/Users', users.router);
```

# swaggerの導入

1. 下記コマンドで必要パッケージをインストールします(他プロジェクトの場合のみ)
```
npm i -D swagger-ui-express
npm i -D  swagger-jsdoc

// only this project
npm install
```

2. エントリーポイント(index.js)にswagger機能を追加します
```
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

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
```

3. APIにjsdoc形式で記述する
```
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

```

4. Nodeを起動する(node index.js)