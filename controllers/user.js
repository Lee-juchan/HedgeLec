const User = require('../models/users');
const Enroll = require('../models/enrolls');

// 전체 사용자 조회
const showAllUser = async (req, res, next) => {
    try {
        // (?userId=) 해당 사용자 조회
        if (req.query.userId) {
            const user = await User.findOne({
                where: {id : req.query.userId},
            });
            res.json(user);

        // 전체 사용자 조회
        } else {
            const users = await User.findAll();
            res.json(users);
        }
        
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 사용자 조회
const showUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId },
        });
        res.json(user);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 사용자 수정
const updateUser = async (req, res, next) => {
    try {
        // 존재하는 값만 수정
        const obj = {};
        const columns = ['name', 'birth', 'photo', 'description'];
        columns.forEach(col => {
            if(req.body[col]) {
                obj[col] = req.body[col];
            }
        });
        
        await User.update(obj, {
            where: { id: req.params.userId },
        });
        res.status(201).json({result: 'success', message: ''});

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 사용자 삭제
const deleteUser = async (req, res, next) => {
    try {
        await User.destroy({
            where: { id: req.params.userId },
        });
        res.status(201).json({result: 'success', message: ''});

    } catch (err) {
        console.error(err);
        next(err);
    }
}

///////////////////////////////////////////////////
// :id인 사용자 수강 목록 조회
const showEnroll = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id : req.params.userId },
            include: Enroll,
        })
        // const enrolls = await Enroll.findOne({
        //     where : {userId : req.params.userId},
        // });
        res.json(user);

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// :id인 사용자 수강점수 조회
const showGrade = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}
// :id인 사용자 채팅방 목록 조회
const showChat = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = { 
    showAllUser, showUser, updateUser, deleteUser, showEnroll, showChat, showGrade 
};