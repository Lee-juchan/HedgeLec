const express = require('express');

const router = express.Router();

// /assignment
router.route('/')
    .get() // 전체 과제물 조회
    .post() // 과제물 생성

// /assignment/:assignmentId
router.route('/:assignmentId')
    .get() // :id인 과제물 조회
    .patch() // :id인 과제물 수정
    .delete() // :id인 과제물 삭제

// /assignment/:assignmentId/file
router.route('/:assignmentId/file')
    .get() // id인 과제물에 첨부된 파일 목록 조회
    .post() // id인 과제물에 파일 첨부
    .patch() // id인 과제물에 첨부된 파일 수정
    .delete() // id인 과제물에 첨부된 파일 삭제

module.exports = router;