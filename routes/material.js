const express = require('express');

const router = express.Router();


// /material
router.route('/')
    .get() // 전체 강의자료 조회
    .post() // 강의자료 생성

// /material/:materialId
router.route('/:materialId')
    .get() // :id인 강의자료 조회
    .patch() // :id인 강의자료 수정
    .delete() // :id인 강의자료 삭제

// /material/:materialId/file
router.route('/:materialId/file')
    .get() // id인 강의자료에 첨부된 파일 목록 조회
    .post() // id인 강의자료에 파일 첨부
    .patch() // id인 강의자료에 첨부된 파일 수정
    .delete() // id인 강의자료에 첨부된 파일 삭제

module.exports = router;