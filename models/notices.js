const Sequelize = require('sequelize');

class Notice extends Sequelize.Model {
    static initiate(sequelize) {
        Notice.init({
            title: {
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
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Notice",
            tableName: "notices",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Notice.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Notice.belongsTo(db.Course, {foreignKey: 'courseId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Notice;