/*
    User

    id          (PK)
    password
    name
    birth       ?
    photo       ?
    description ?
    token
*/

const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares'); //index.js
const { showAllUser, showUser, updateUser, deleteUser, showEnroll, showChat, showGrade } = require('../controllers/user');

const router = express.Router();


// /user
// 전체 사용자 조회
router.get('/', isLoggedIn, isAdmin, showAllUser);

// /user/:userId
router.route('/:userId')
    .get(showUser) // :id인 사용자 조회
    .patch(updateUser) // :id인 사용자 수정
    .delete(deleteUser); // :id인 사용자 삭제

router.get('/:userId/enroll', showEnroll) // :id인 사용자 수강 목록 조회
router.get('/:userId/grade', showGrade) // :id인 사용자 성적 목록 조회
router.get('/:userId/chat', showChat) // :id인 사용자 채팅방 목록 조회

module.exports = router;