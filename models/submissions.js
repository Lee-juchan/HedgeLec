const Sequelize = require('sequelize');

class Submission extends Sequelize.Model {
    static initiate(sequelize) {
        Submission.init({
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
            score: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Submission",
            tableName: "submissions",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Submission.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Submission.belongsTo(db.Assignment, {foreignKey: 'assignmentId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Submission;