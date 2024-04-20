const express = require('express');

const router = express.Router();


// /submission
router.route('/')
    .get() // 전체 제출물 조회
    .post() // 제출물 생성

// /submission/:submissionId
router.route('/:submissionId')
    .get() // :id인 제출물 조회
    .patch() // :id인 제출물 수정
    .delete() // :id인 제출물 삭제

// /submission/:submissionId/file
router.route('/:submissionId/file')
    .get() // id인 제출물에 첨부된 파일 목록 조회
    .post() // id인 제출물에 파일 첨부
    .patch() // id인 제출물에 첨부된 파일 수정
    .delete() // id인 제출물에 첨부된 파일 삭제

module.exports = router;