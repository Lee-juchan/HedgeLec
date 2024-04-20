

/*
    Notice

    id          (PK) _ autoincrement
    title
    content
    author      (PK, FK) _ User
    courseId    (PK, FK) _ Course
*/

// /notice
// 전체 공지 조회
// 공지 생성

// /notice/:noticeId
// :id인 공지 조회
// :id인 공지 수정
// :id인 공지 삭제

// /notice/:noticeId/file
// id인 공지에 첨부된 파일 목록 조회
// id인 공지에 파일 첨부
// id인 공지에 첨부된 파일 수정
// id인 공지에 첨부된 파일 삭제

module.exports = {

}