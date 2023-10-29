const express = require("express");
const axios = require("axios");

const User = require("../models/User");
const router = express.Router();

const { signToken } = require("../utils/token");

router.post("/login", async function (req, res, next) {
  const body = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_API_KEY,
    redirect_uri: "http://localhost:3000/login/redirect",
    code: req.body,
  };
  try {
    const kakaoToken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${kakaoToken.data.access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const { id, properties } = kakaoUserInfo.data;
    const sendData = {
      id,
      nickname: properties.nickname,
      token: signToken(id, properties.nickname),
    };

    const existedUser = await User.findOne({ id: kakaoUserInfo.data.id });
    if (!existedUser) {
      const user = new User({
        id,
        name: properties.nickname,
      });

      await user.save();

      res.status(201).send(sendData);
    } else {
      res.status(200).send(sendData);
    }
  } catch (e) {
    console.log(e);
  }
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
