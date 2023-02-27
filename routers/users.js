const express = require('express');

// ルータの作成
const router = express.Router();

const users = [
    { id: 1, name: "yamamoto" },
    { id: 2, name: "motoyama" },
    { id: 3, name: "yamada" },
    { id: 4, name: "yamauchi" },
]

/**
 * User情報を取得します
 * APIパス:http://localhost:3000/User
 */
router.get('/', async(req, res, next) => {
    res.status(200).send(users);
});

/**
 * idを指定して、User情報を取得します
 */
router.get('/:id', async(req, res, next) => {
    // ルートパスよりidを取得
    const id = req.params.id;

    const user = users.find((user) => user.id == id );

    res.status(200).send({user});
})

// ルータをexport
module.exports = {
    router
}
