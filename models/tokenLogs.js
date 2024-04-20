const Sequelize = require('sequelize');

class TokenLog extends Sequelize.Model {
    static initiate(sequelize) {
        TokenLog.init({
            sender: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            receiver: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            amount: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "TokenLog",
            tableName: "tokenLogs",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.TokenLog.belongsTo(db.User, {foreignKey: 'sender', targetKey: 'id', onDelete: 'restrict'});
        db.TokenLog.belongsTo(db.User, {foreignKey: 'receiver', targetKey: 'id', onDelete: 'restrict'});
    }
}

module.exports = TokenLog;