const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const passportConfig = require('./passport'); // index.js
const { sequelize } = require('./models'); // index.js

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
// const chatRouter = require('./routes/chat');
// const tokenRouter = require('./routes/token');

// app 설정
const app = express();
dotenv.config();
passportConfig();
app.set('port', process.env.PORT || 8080);

// db 연결
sequelize.sync({force: false})
    .then(() => {
        console.log('--- db connected ---');
    })
    .catch((err) => {
        console.error(err);
    });

// 전처리 router
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false, // 어떤의미를 가지나>>???
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// 실제 로직
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/course', courseRouter);
// app.use('/chat', chatRouter);
// app.use('/token', tokenRouter);

// error router
app.use((req, res, next) => { // 404
    const error = new Error(`${req.method} ${req.url} router is Not found`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => { // error
    console.error(err);
    res.status(err.status || 500);
    res.json(err.message);
});

// port 연결
app.listen(app.get('port'), () => {
    console.log(`--- server is waiting... ${app.get('port')} ---`);
});