const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/regist", (req, res, next) => {
  try {
    const { title, thumbnail, content, deskInfo } = req.body;

    const user = new Post({
      userId: req.decoded.id,
      title,
      thumbnail,
      content,
      deskInfo,
    });

    user.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
