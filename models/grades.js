const Sequelize = require('sequelize');

class Grade extends Sequelize.Model { // n:m
    static initiate(sequelize) {
        Grade.init({
            userId: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            courseId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            score: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Grade",
            tableName: "grades",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        // User, Course에서 belongsToMany()로 처리
        db.Grade.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Grade.belongsTo(db.Course, { foreignKey: 'courseId', targetKey: 'id' });
    }
}

module.exports = Grade;