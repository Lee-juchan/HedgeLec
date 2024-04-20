const express = require('express');
const { Op } = require('sequelize')

const { showAllToken,
    showAllTokenLog, createTokenLog } = require('../controllers/token');

const router = express.Router();

/*
    TokenLog

    id          (PK) _ autoincrement
    sender      (FK) _ User
    receiver    (FK) _ User
    amount
*/

// /token
router.get(showAllToken); // 전체 사용자 토큰 수 조회

// /token/log
router.route('/log')
    .get(showAllTokenLog) // 토큰 로그 조회
    .post(createTokenLog) // 토큰 로그 생성

module.exports = router;