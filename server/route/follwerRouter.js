const express = require('express');
const router = express.Router();
const connection = require('../db');

router.route("/")
    .post((req, res) => {
        const { name } = req.body; // 입력된 이름

        // follower 테이블에서 행 개수 세기
        const query = `
          SELECT COUNT(*) AS count
          FROM tbl_follower f
          WHERE h.name = ?`;
        connection.query(query, [name], (err, results) => {
            if (err) {
                console.error(err); // 오류 로그
                return res.status(500).json({ success: false, message: '서버 오류' });
            }
            
            const count = results[0].count; // 개수 추출
            res.json({ success: true, count }); // 개수 반환
        });
    });

module.exports = router;
