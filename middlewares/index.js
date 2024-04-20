const Course = require("../models/courses");
const Enroll = require('../models/enrolls');

// 접근권한 제어 미들웨어

// 로그인 시
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({result : "fail", message: "login is needed"});
    }
};

// 로그인 x 시
const isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({result : "fail", message: "no login is needed"});
    }
}

// Admin 여부 확인
const isAdmin = (req, res, next) => {
    if (req.user.id === "admin") {
        next();

    } else {
        res.status(403).json({result : "fail", message: "only for admin"});
    }
}

// Teacher 여부 확인 (/course/:course 기본)
const isTeacher = async (req, res, next) => {
    try {
        // 강좌 존재 확인
        const course = await Course.findOne({
            attribute : ['author'],
            where : {id : req.params.courseId }
        });
        if (!course) {
            return res.status(400).res.json({result : "fail", message: "course does not exist"});
        }
        
        // Teacher 확인
        if(course.author === req.user.id) {
            next();
        } else {
            res.status(403).json({result : "fail", message: "only for teacher"});
        }

    } catch (err) {
        console.error(err);
        next(err);
    }

}

// Student 여부 확인 (/course/:course 기본)
const isStudent = async (req, res, next) => {
    try {
        // 강좌 존재 여부
        const course = await Course.findOne({
            attribute : ['author'],
            where : {id : req.params.courseId }
        });
        if (!course) {
            return res.status(400).json({result : "fail", message: "course does not exist"});
        }

        // 수강 목록에 존재
        const enroll = await Enroll.findOne({
            where: {
                userId: req.user.id,
                courseId: req.params.courseId,
            }
        });
        if (!enroll) {
            return res.status(400).json({result: "fail", message: "no Enrolled user"});
        }
        
    } catch (err) {
        console.error(err);
        next(err);
    }
}


// Student or Teacher 여부
const isTeacherOrStudent = async (req, res, next) => {
    try {
        // 강좌 존재 여부
        const course = await Course.findOne({
            attribute : ['author'],
            where : {id : req.params.courseId }
        });
        if (!course) {
            return res.status(400).json({result : "fail", message: "course does not exist"});
        }
        
        // 교사임
        if(course.author === req.user.id) {
            next();
        }

        // 수강 목록에 존재
        const enroll = await Enroll.findOne({
            where: {
                userId: req.user.id,
                courseId: req.params.courseId,
            }
        });
        if (enroll) {
            next();
        }

        return res.status(400).json({result: "fail", message: "only Student & Teacher"});
        
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    isLoggedIn, isNotLoggedIn,
    isAdmin, isTeacher, isStudent, isTeacherOrStudent
}