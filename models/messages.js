const Sequelize = require('sequelize');

class Message extends Sequelize.Model {
    static initiate(sequelize) {
        Message.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            author: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            chatRoomId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Message",
            tableName: "messages",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.Message.belongsTo(db.User, {foreignKey: 'author', targetKey: 'id'});
        db.Message.belongsTo(db.ChatRoom, {foreignKey: 'chatRoomId', targetKey: 'id', onDelete: 'cascade'});
    }
}

module.exports = Message;