const express = require('express');
const { showAllLecture, createLecture,
    showLecture, updateLecture, deleteLecture,
    showFile, createFile, updateFile, deleteFile, } = require('../controllers/lecture');
const {isLoggedIn, isTeacher, isStudent, isTeacherOrStudent} = require('../middlewares');

const router = express.Router();

// /course/:course (기본 경로)

// /lecture
router.route('/')
    .get(isLoggedIn, isTeacherOrStudent, showAllLecture) // 전체 강의 조회
    .post(isLoggedIn, isTeacher, createLecture) // 강의 생성

// /lecture/:lectureId
router.route('/:lectureId')
    .get(isLoggedIn, isTeacherOrStudent, showLecture) // :id인 강의 조회
    .patch(isLoggedIn, isTeacher, updateLecture) // :id인 강의 수정
    .delete(isLoggedIn, isTeacher, deleteLecture) // :id인 강의 삭제

// /lecture/:lectureId/file
router.route('/:lectureId/file')
    .get(isLoggedIn, isTeacherOrStudent, showFile) // id인 강의에 첨부된 파일 목록 조회
    .post(isLoggedIn, isTeacher, createFile) // id인 강의에 파일 첨부
    .patch(isLoggedIn, isTeacher, updateFile) // id인 강의에 첨부된 파일 수정
    .delete(isLoggedIn, isTeacher, deleteFile) // id인 강의에 첨부된 파일 삭제

module.exports = router;