const Sequelize = require('sequelize');

class Assignment extends Sequelize.Model {
    static initiate(sequelize) {
        Assignment.init({
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
            },
            totalScore: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Assignment",
            tableName: "assignments",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Assignment.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Assignment.belongsTo(db.Course, {foreignKey: 'courseId', targetKey: 'id', onDelete: 'cascade'});
        
        db.Assignment.hasMany(db.Submission, {foreignKey: 'assignmentId', sourceKey: 'id'});
    }
}

module.exports = Assignment;