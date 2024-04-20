const express = require('express');

const { showAllChatRoom, createChatRoom,
    showChatRoom, updateChatRoom, deleteChatRoom,
    showParticipant, addParticipant, deleteParticipant,
    showMessage, sendMessage } = require('../controllers/chat');

const router = express.Router();

// /chat
router.route('/')
    .get(showAllChatRoom) // 전체 채팅방 조회
    .post(createChatRoom) // 채팅방 생성

// /chat/:chatRoomId
router.route('/:chatRoomId')
    .get(showChatRoom)// :id인 채팅방 조회
    .patch(updateChatRoom)// :id인 채팅방 수정
    .delete(deleteChatRoom)// :id인 채팅방 삭제

// /chat/:chatRoomId/chat
router.route('/:chatRoomId/chat')
    .get(showParticipant) // :id인 채팅방의 참여자 조회
    .post(addParticipant) // :id인 채팅방에 참여자 초대
    .delete(deleteParticipant) // :id인 채팅방에서 나가기

// /chat/:chatRoomId/message
router.route('/:chatRoomId/message')
    .get(showMessage) // :id인 채팅방의 메시지 조회
    .post(sendMessage) // :id인 채팅방에 메시지 전송

module.exports = router;