const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/users');

const join = async (req, res, next) => {
    const { id, name, password, birth, photo, description } = req.body;

    try {
        // 예외 처리 (id 중복 o)
        const exUser = await User.findOne({ where: { id : id } });
        if (exUser) {
            return res.status(400).json({result: "fail", message: "duplicated id"});
        }

        // 회원가입
        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({ // user 생성
            id,
            name,
            password: hash,
            birth: birth || null,
            photo: photo || null,
            description: description || null,
        });
        return res.json({result: "success", message: ""});

    } catch (err) {
        console.error(err);
        return next(err);
    }
};

const login = (req, res, next) => {
    // 미들웨어 in 미들웨어
    passport.authenticate('local', (authError, user, info) => { // local 전략
        // 예외 처리
        if (authError) { // err
            console.error(authError);
            return next(authError);
        }
        if (!user) { // user x
            return res.status(400).json({result: "success", message: info.message});
        }

        // 로그인
        return req.login(user, loginError => { // serializeUser 호출 -> 세션쿠키 전송
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({result: "success", message: ""});
        });
    })(req, res, next);
};

const logout = (req, res) => {
    // 로그아웃
    req.logout(() => {
        res.status(200).send("logout success");
    });
}

module.exports = {
    join,
    login,
    logout,
}