//필요한 모듈 선언
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
require("dotenv").config();

// 몽구스 연결
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

//express 서버 포트 설정
app.set("port", process.env.PORT || 8000);

// CORS 설정
// TODO : 배포시 CORS 설정 필요
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  express.text(),
  express.json()
);

//서버 생성
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

//라우팅 모듈 선언
const indexRouter = require("./routes/login");

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use("/", indexRouter);
