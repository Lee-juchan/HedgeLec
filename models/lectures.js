const Sequelize = require('sequelize');

class Lecture extends Sequelize.Model {
    static initiate(sequelize) {
        Lecture.init({
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
            courseId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Lecture",
            tableName: "lectures",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Lecture.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Lecture.belongsTo(db.Course, {foreignKey: 'courseId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Lecture;