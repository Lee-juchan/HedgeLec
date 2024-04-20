const express = require('express');
const router = express.Router();


// /notice
router.route('/')
    .get() // 전체 공지 조회
    .post() // 공지 생성

// /notice/:noticeId
router.route('/:noticeId')
    .get() // :id인 공지 조회
    .patch() // :id인 공지 수정
    .delete() // :id인 공지 삭제

// /notice/:noticeId/file
router.route('/:noticeId/file')
    .get() // id인 공지에 첨부된 파일 목록 조회
    .post() // id인 공지에 파일 첨부
    .patch() // id인 공지에 첨부된 파일 수정
    .delete() // id인 공지에 첨부된 파일 삭제

module.exports = router;