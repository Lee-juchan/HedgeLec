const Assignment = require('../models/assignments');

/*
    Assignmnet

    id          (PK) _ autoincrement
    name
    content
    author      (PK) _ User
    courseId    (PK) _ Course
    deadline    ?
    totalScore  ?
*/

// /course/:courseId

// /assignment
// 전체 과제물 조회
const showAllAssignment = async (req, res, next) => {
    try {
        const assignments = await Assignment.findAll({
            where : {courseId : req.params.courseId},
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// 과제물 생성
const createAssignment = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// /assignment/:assignmentId
// :id인 과제물 조회
const showAssignment = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// :id인 과제물 수정
const updateAssignment = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// :id인 과제물 삭제
const deleteAssignment = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// /assignment/:assignmentId/file
// id인 과제물에 첨부된 파일 목록 조회
const showFile = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// id인 과제물에 파일 첨부
const attachFile = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// id인 과제물에 첨부된 파일 수정
const updateFile = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// id인 과제물에 첨부된 파일 삭제
const deleteFile = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    showAllAssignment, createAssignment,
    showAssignment, updateAssignment, deleteAssignment,
    showFile, attachFile, updateFile, deleteFile
}