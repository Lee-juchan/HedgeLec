const { Op } = require('sequelize');

const User = require('../models/users');
const Course = require('../models/courses');
const Enroll = require('../models/enrolls');
const Grade = require('../models/grades');

/*
    Course

    id
    name
    content
    author      (PK, FK) _ User
    price
    week        ?
    capacity    ?
*/
/*
    Enroll

    userId      (PK, FK) _ User
    courseId    (PK, FK) _ Course
*/
/*
    Grade

    userId      (PK, FK) _ User
    courseId    (PK, FK) _ Course
    score
*/

// /course
// 전체 강좌 조회
const showAllCourse = async (req, res, next) => {
    try {
        const course = await Course.findAll();
        res.json(course);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 강좌 생성
const createCourse = async (req, res, next) => {
    try {
        const { name, content, price, week, capacity } = req.body;

        // 강좌 생성
        const course = await Course.create({
            name,
            content,
            author: req.user.id,
            price,
            week: week || null,
            capacity: capacity || null
        });

        // 사용자 토큰 차감
        const tokens = req.user.token - (2 * price + 10);

        await User.update({
            token: tokens,
        }, {
            where : { id : req.user.id },
        });
        res.status(201).json(course);

    } catch (err) {
        console.error(err);
        next(err);
    }
}


// /course/:courseId
// :id인 강좌 조회
const showCourse = async (req, res, next) => {
    try {
        const course = await Course.findOne({
            where: { id: req.params.courseId }
        });
        res.json(course);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 강좌 수정
const updateCourse = async (req, res, next) => {
    try {
        // 존재여부는 isTeacher에서 확인
        
        // 입력한 컬럼만 수정
        const obj = {};
        const columns = ['name', 'content', 'price', 'week', 'capacity'];
        columns.forEach(col => {
            if (req.body[col]) {
                obj[col] = req.body[col];
            }
        });

        // 강좌 수정
        await Course.update(obj, {
            where: { id: req.params.courseId },
        });
        
        // 사용자 토큰 차감
        if (req.body.price) {
            const tokens = req.user.token - (2 * req.body.price + 10);
            
            await User.update({
                token: tokens,
            }, {
                where : { id : req.user.id },
            });
        }
        res.status(201).json({result: "success", message: ""});

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 강좌 삭제
const deleteCourse = async (req, res, next) => {
    try {
        await Course.destroy({
            where: { id: req.params.courseId },
        });
        res.status(201).send("course delete success");

    } catch (err) {
        console.error(err);
        next(err);
    }
}


// /course/:courseId/enroll
// id인 강좌 등록자 목록 조회
const showEnroll = async (req, res, next) => {
    try {
        const enrolls = await Enroll.findAll({
            where: { courseId: req.params.courseId },
            include: User,
        });
        res.json(enrolls);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// id인 강좌 신청
const createEnroll = async (req, res, next) => {
    try {
        const exEnroll = await Enroll.findAll({
            where: {
                userId: req.user.id,
                courseId: req.params.courseId,
            }
        });
        if (exEnroll.length > 1) {
            return res.status(400).json({result: "fail", message: "already enrolled"});
        }

        const newEnroll = await Enroll.create({
            userId: req.user.id,
            courseId: req.params.courseId,
        });
        // res.status(201).json(newEnroll);
        res.status(201).json({result: "success", message: ""});

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// id인 강좌 신청 취소
const deleteEnroll = async (req, res, next) => {
    try {
        const exEnroll = await Enroll.findAll({
            where: {
                userId: req.user.id,
                courseId: req.params.courseId,
            }
        });
        if (exEnroll.length > 1) {
            return res.status(400).json({result: "fail", message: "not enrolled"});
        }

        await Grade.destroy({
            where: { userId: req.user.id },
        });
        res.status(201).send({result: "success", message: ""});

    } catch (err) {
        console.error(err);
        next(err);
    }
}


// /course/:courseId/grade
// id인 강좌 성적 목록 조회
const showGrade = async (req, res, next) => {
    try {
        const grades = await Grade.findAll({
            where: { courseId: req.params.courseId },
            include: User,
        });
        res.json(grades);

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// id인 강좌 성적 등록
const createGrade = async (req, res, next) => {
    try {
        const { userId, score } = req.body;

        // 수강 목록에 존재하면
        const enroll = await Enroll.findOne({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        });
        if (!enroll) {
            return res.status(400).json({result: "fail", message: "no Enrolled user"});
        }

        // 점수가 목록에 존재하면
        const grade = await Grade.findOne({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        });
        if (grade.length > 0) {
            return res.status(400).json({result: "fail", message: "already Gradeed"});
        }

        const newGrade = await Grade.create({
            userId: userId,
            courseId: req.params.courseId,
            score,
        });
        res.status(201).json(newGrade);
        // res.status(201).json({result: "success", message: ""});

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// id인 강좌 성적 수정
const updateGrade = async (req, res, next) => {
    try {
        const { userId, score } = req.body;

        // 수강 목록에 존재하면
        const enroll = await Enroll.findAll({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        });
        if (!enroll) {
            return res.status(400).json({result: "fail", message: "no Enrolled user"});
        }

        const exGrade = await Grade.findAll({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        })
        if (!exGrade) {
            return res.status(400).send("not graded");
        }

        await Grade.update({
            score,
        }, {
            where: { userId: userId },
        });
        res.status(201).send("update grade success");

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// id인 강좌 성적 삭제
const deleteGrade = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // 수강 목록에 존재하면
        const enroll = await Enroll.findAll({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        });
        if (!enroll) {
            return res.status(400).json({result: "fail", message: "no Enrolled user"});
        }

        // 점수 존재
        const exGrade = await Grade.findAll({
            where: {
                userId: userId,
                courseId: req.params.courseId,
            }
        })
        if (!exGrade) {
            return res.status(400).send("not graded");
        }

        // 점수 삭제
        await Grade.destroy({
            where: { userId: userId },
        });
        res.status(201).send("delete grade success");

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    showAllCourse, createCourse,
    showCourse, updateCourse, deleteCourse,
    showEnroll, createEnroll, deleteEnroll,
    showGrade, createGrade, updateGrade, deleteGrade
}