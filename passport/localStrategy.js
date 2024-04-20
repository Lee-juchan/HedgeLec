// local 로그인 전략 (email, password)

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/users');

module.exports = () => {
    passport.use(new LocalStrategy({
        // 로그인 설정
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: false,

        // 로그인 전략
    }, async (id, password, done) => {
        try {
            // 사용자 조회
            const exUser = await User.findOne({ where : {id} });
            if (exUser) {
                // 비밀번호 비교
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: 'password is not matched'});
                }

            } else {
                done(null, false, {message: 'user is not registered'});
            }

        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
}