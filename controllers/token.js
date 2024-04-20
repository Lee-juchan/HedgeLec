const TokenLog = require('../models/tokenLogs');

// /token
// 전체 사용자 토큰 수 조회
const showAllToken = async (req, res, next) => {
    try {
        // (?userId= ) 해당 사용자 토큰 수 조회
        if (req.query.userId) {
            const userToken = await User.findOne({
                attributes: ['id', 'token'],
                where : { id : req.query.userId },
            });
            res.json(userToken);

        // 전체 사용자 토큰 수 조회
        } else { 
            const usersToken = await User.findAll({
                attributes: ['id', 'token'],
            });
            res.json(usersToken);
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// /token/log
// 토큰 로그 조회
const showAllTokenLog = async (req, res, next) => {
    try {
        // (?userId= ) 해당 사용자 토큰 로그 조회
        if (req.query.userId) {
            const userTokenlog = await TokenLog.findAll({
                where: {
                    [Op.or]: [{ sender: req.query.userId }, { receiver: req.query.userId }],
                }
            });
            res.json(userTokenlog)

        // 전체 사용자 토큰로그 조회
        } else {
            const tokenlog = await TokenLog.findAll();
            res.json(tokenlog);
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 토큰 로그 생성
const createTokenLog = async (req, res, next) => {
    try {
        const {sender, receiver, amount} = req.body;
        const tokenLog = TokenLog.create({
            sender,
            receiver,
            amount
        });
        res.status(201).json(tokenLog);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    showAllToken,
    showAllTokenLog, createTokenLog
}