const Sequelize = require('sequelize');

class Chat extends Sequelize.Model { // n:m
    static initiate(sequelize) {
        Chat.init({
            userId: { // FK
                type: Sequelize.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            chatRoomId: { // FK
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "Chat",
            tableName: "chats",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        // User, ChatRoom에서 belongsToMany()로 처리
    }
}

module.exports = Chat;