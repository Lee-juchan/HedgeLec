const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            birth: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            photo: {
                type: Sequelize.STRING(260),
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT('tiny'),
                allowNull: true,
            },
            token: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 100,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "User",
            tableName: "users",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.User.hasMany(db.Course, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Lecture, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Assignment, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Submission, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Notice, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Material, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.File, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.Message, {foreignKey: 'author', sourceKey: 'id'});
        db.User.hasMany(db.TokenLog, {foreignKey: 'sender', sourceKey: 'id'});
        db.User.hasMany(db.TokenLog, {foreignKey: 'receiver', sourceKey: 'id'});
        
        // n:m
        db.User.belongsToMany(db.Course, {foreignKey: 'userId', targetKey: 'id', through: db.Grade, onDelete: 'cascade'});
        db.User.belongsToMany(db.ChatRoom, {foreignKey: 'userId', targetKey: 'id', through: db.Chat, onDelete: 'cascade'});
        db.User.belongsToMany(db.Course, {foreignKey: 'userId', targetKey: 'id', through: db.Enroll, onDelete: 'cascade'});
    }
}

module.exports = User;