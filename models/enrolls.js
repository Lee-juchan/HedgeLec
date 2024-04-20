const Sequelize = require('sequelize');

class Enroll extends Sequelize.Model { // n:m
    static initiate(sequelize) {
        Enroll.init({
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
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Enroll",
            tableName: "enrolls",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        // User, Course에서 belongsToMany()로 처리
        db.Enroll.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Enroll.belongsTo(db.Course, { foreignKey: 'courseId', targetKey: 'id' });
    }
}

module.exports = Enroll;