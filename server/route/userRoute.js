const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
const JWT_KEY = "secret_key";

router.route("/")
    .post((req, res)=>{
      const { email, password } = req.body;
      const query = 'SELECT * FROM tbl_human WHERE email = ? AND password = ?';    
      connection.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          // 로그인 성공한 경우
          const user = results[0];
          // 토큰 생성 
          // 첫번째 파라미터(페이로드) : 담고싶은 정보(비밀번호와 같은 중요한 데이터는 넣지 말 것)
          // 두번째 파라미터(키) : 위에서 선언한 서버의 비밀 키
          // 세번째 파라미터 : 만료 시간
          const token = jwt.sign({userId : user.id, name : user.name}, JWT_KEY, {expiresIn : '1h'});
          console.log(token);
          // 토큰 담아서 리턴
          res.json({ success: true, message : "로그인 성공!", token });
        } else {
          // 로그인 실패
          res.json({ success: false, message: '실패!' });
        }
      });
    });

module.exports = router;