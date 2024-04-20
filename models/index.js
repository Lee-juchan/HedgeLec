const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

// 연결 설정
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);


// db 객체
const db = {};
db.sequelize = sequelize;

// db 연결 (자동화)
// initiate
const basename = path.basename(__filename); // index.js (현재 파일명)

fs
  .readdirSync(__dirname) // 현재폴더, 모든파일 조회
  .filter(file => {       // . .. index.js, js이외 파일 제외
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);  // db 연결 (sequelize 객체와 연결)
  });

// associate
Object.keys(db).forEach(modelName => {
  if(db[modelName].associate) { // associate가 존재하면 (sequlize 걸러내기)
    db[modelName].associate(db);
  }
});

module.exports = db;