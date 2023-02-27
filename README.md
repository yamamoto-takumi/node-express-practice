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