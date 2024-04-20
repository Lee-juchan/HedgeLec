const Sequelize = require('sequelize');

class Course extends Sequelize.Model {
    static initiate(sequelize) {
        Course.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            author: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            week: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: true,
            },
            capacity: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Course",
            tableName: "courses",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Course.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        
        db.Course.hasMany(db.Lecture, {foreignKey: 'courseId', sourceKey: 'id'});
        db.Course.hasMany(db.Assignment, {foreignKey: 'courseId', sourceKey: 'id'});
        db.Course.hasMany(db.Notice, {foreignKey: 'courseId', sourceKey: 'id'});
        db.Course.hasMany(db.Material, {foreignKey: 'courseId', sourceKey: 'id'});
        
        // n:m
        db.Course.belongsToMany(db.User, {foreignKey: 'courseId', targetKey: 'id', through: db.Grade, onDelete: 'cascade'});
        // db.Course.belongsToMany(db.User, {foreignKey: 'courseId', targetKey: 'id', through: db.Enroll, onDelete: 'cascade'});
    }
}

module.exports = Course;