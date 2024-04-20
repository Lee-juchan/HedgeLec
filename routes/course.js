const express = require('express');

const { showAllCourse, createCourse,
    showCourse, updateCourse, deleteCourse,
    showEnroll, createEnroll, deleteEnroll,
    showGrade, createGrade, updateGrade, deleteGrade } = require('../controllers/course');
const { isLoggedIn, isTeacher, isStudent } = require('../middlewares');

const lectureRouter = require('../routes/lecture');
const materialRouter = require('../routes/material');
const assignmentRouter = require('../routes/assignment');
const noticeRouter = require('../routes/notice');

const router = express.Router();

// /course
router.route('/')
    .get(showAllCourse) // 전체 강좌 조회
    .post(isLoggedIn, createCourse) // 강좌 생성

// /course/:courseId
router.route('/:courseId')
    .get(showCourse) // 해당 강좌 조회
    .patch(isLoggedIn, isTeacher, updateCourse) // 해당 강좌 수정
    .delete(isLoggedIn, isTeacher, deleteCourse) // 해당 강좌 삭제

// /course/:courseId/enroll
router.route('/:courseId/enroll')
    .get(isLoggedIn, isTeacher, showEnroll) // 해당 강좌 등록자 목록 조회
    .post(isLoggedIn, isStudent, createEnroll) // 해당 강좌 신청
    .delete(isLoggedIn, isStudent, deleteEnroll) // 해당 강좌 신청 취소

// /course/:courseId/grade
router.route('/:courseId/grade')
    .get(isLoggedIn, isTeacher, showGrade) // 해당 강좌 성적 목록 조회
    .post(isLoggedIn, isTeacher, createGrade) // 해당 강좌 성적 등록
    .patch(isLoggedIn, isTeacher, updateGrade) // 해당 강좌 성적 수정
    .delete(isLoggedIn, isTeacher, deleteGrade) // 해당 강좌 성적 삭제

// course에 종속되는 routers
// /course/:courseId
// router.use('/:courseId/lecture', lectureRouter) // 해당 강좌의 강의 관리
// router.use('/:courseId/material', materialRouter) // 해당 강좌의 강의 자료 관리
// router.use('/:courseId/assignment', assignmentRouter) // 해당 강좌의 과제 관리
// router.use('/:courseId/notice', noticeRouter); // 해당 강좌의 공지관리

module.exports = router;