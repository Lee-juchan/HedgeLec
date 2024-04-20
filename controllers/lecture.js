const Lecture = require('../models/lectures');
const File = require('../models/files');

/*
    Lecture

    id          (PK) _ autoincrement
    name
    content
    author      (PK, FK) _ User
    courseId    (PK, FK) _ Course
    deadline    ?
*/

// /course/:courseId (기본경로)

// /lectur
// 전체 강의 조회
const showAllLecture = async (req, res, next) => {
    try {
            console.log(req);
            // const lectures = await Lecture.findAll({
            //     where: { courseId : req.params.courseId },
            // });
            // res.json(lectures);
            console.log("jeee???? :", lectures);

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 강의 생성
const createLecture = async (req, res, next) => {
    try {
            const lecture = findOne();
    } catch(err) {
        console.error(err);
        next(err);
    }
}


// /lecture/:lectureId
// 해당 강의 조회
const showLecture = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 해당 강의 수정
const updateLecture = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 해당 강의 삭제
const deleteLecture = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}

// /lecture/:lectureId/file
// 해당 강의에 첨부된 파일 목록 조회
const showFile = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 해당 강의에 파일 첨부
const createFile = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 해당 강의에 첨부된 파일 수정
const updateFile = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}
// 해당 강의에 첨부된 파일 삭제
const deleteFile = async (req, res, next) => {
    try {

    } catch(err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    showAllLecture, createLecture,
    showLecture, updateLecture, deleteLecture,
    showFile, createFile, updateFile, deleteFile,
}