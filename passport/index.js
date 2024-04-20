const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/users');

module.exports = () => {
    // 로그인 시 : user.id 저장
    passport.serializeUser((user, done) => {
        done(null, user.id); // session에 user.id 저장
    });

    // 요청 시 : user 객체 불러오기
    passport.deserializeUser((id, done) => { // user.id -> id
        User.findOne({
            where: { id },
        })
        .then(user => done(null, user)) // req.user 생성
        .catch(err => done(err));
    });

    local();
}