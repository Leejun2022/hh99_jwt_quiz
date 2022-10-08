const express = require("express")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const port = 5002;
const SECRET_KEY = `sparta`;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * POST /set-key 를 호출했을 때, Request로 들어온 정보를 jwt 쿠키로 만들어 할당해주세요!
 * 
 * {
 * 'key': '무슨내용일까요?'
 * }
 * 
 * GET /get-key 를 호출했을 때, 등록된 jwt 쿠키를 복호화해서 반환하는 API를 만들어주세요!
 * 
 * {
 * 'key': '무슨내용일까요?'
 * }
 * */ 
app.post("/set-key", (req, res) => {
    const { key } = req.body;
    const token = jwt.sign({ key }, "sparta")
    res.cookie('token', token)
    return res.status(200).end()
})

app.get("/get-key", (req, res) => {
    const { token } = req.cookies;
    const { key } = jwt.decode(token);
    return res.status(200).json({ key })
})


app.listen(port, () => {
    console.log(port, '서버가 켜졌어요.');
  })