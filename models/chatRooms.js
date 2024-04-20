const Sequelize = require('sequelize');

class ChatRoom extends Sequelize.Model {
    static initiate(sequelize) {
        ChatRoom.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.TINYINT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored: false,
            modelName: "ChatRoom",
            tableName: "chatRooms",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.ChatRoom.hasMany(db.Message, {foreignKey: 'chatRoomId', sourceKey: 'id'});

        // n:m
        db.ChatRoom.belongsToMany(db.User, {foreignKey: 'chatRoomId', targetKey: 'id', through: db.Chat, onDelete: 'cascade'});
    }
}

module.exports = ChatRoom;