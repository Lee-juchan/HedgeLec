const ChatRoom = require('../models/chatRooms');
const Chat = require('../models/chats');
const Message = require('../models/messages');

/*
    ChatRoom

    id          (PK) _ autoincrement
    name
    description ?
*/
/*
    Chat

    userid      (PK, FK) _ User
    chatRoomId  (PK, FK) _ ChatRoom
*/
/*
    Message

    id          (PK) _ autoincrement
    content
    author      (FK) _ User
    chatRoomId  (FK) _ ChatRoom
*/


// /chat
// 전체 채팅방 조회
const showAllChatRoom = async (req, res, next) => {
    try {
        // (?chatRoomId= ) 해당 채팅방 조회
        if(req.query.chatRoomId) {
            const chatRoom = await ChatRoom.findOne({
                where: { id : req.query.chatRoomId }
            });
            res.json(chatRoom);
        
        // 전체 채팅방 조회
        } else {
            const chatRooms = await ChatRoom.findAll();
            res.json(chatRooms);
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 채팅방 생성
const createChatRoom = async (req, res, next) => {
    const {name, description, userId} = req.body;
    try {
        const chatRoom = ChatRoom.create({ // 채팅방 생성
            name,
            description : description || null,
        });

        const chat = Chat.create({ // 사용자와 연결
            userId,
            chatRoomId : chatRoom.id,
        });
        res.status(201).json({chatRoom, chat});
        
    } catch (err) {
        console.error(err);
        next(err);
    }
}


// /chat/:chatRoomId
// :id인 채팅방 조회
const showChatRoom = async (req, res, next) => {
    try {
        const chatRoom = await ChatRoom.findOne({
            where : {id : req.params.chatRoomId},
        });
        res.json(chatRoom);

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 채팅방 수정
const updateChatRoom = async (req, res, next) => {
    try {
        // 존재하는 값만 수정
        const obj = {};
        const columns = ['name', 'description'];
        columns.forEach(col => {
            if(req.body[col]) {
                obj[col] = req.body[col];
            }
        });
        // chat도 수정??

        await ChatRoom.update(obj, {
            where : {id : req.params.chatRoomId},
        });
        res.status(201).send("chatRoom update success");

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 채팅방 삭제
const deleteChatRoom = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// /chat/:chatRoomId/chat
// :id인 채팅방의 참여자 조회
const showParticipant = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 채팅방에 참여자 초대
const addParticipant = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 채팅방에서 나가기
const deleteParticipant = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// /chat/:chatRoomId/message
// :id인 채팅방의 메시지 조회
const showMessage = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

// :id인 채팅방에 메시지 전송
const sendMessage = async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    showAllChatRoom, createChatRoom,
    showChatRoom, updateChatRoom, deleteChatRoom,
    showParticipant, addParticipant, deleteParticipant,
    showMessage, sendMessage
}