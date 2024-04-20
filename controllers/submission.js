
/*
    Submission

    id          (PK) _ autoincrement
    name
    content
    author      (PK, FK) _ User
    courseId    (PK, FK) _ Course
    score       ?
*/

// /submission
// 전체 제출물 조회
// 제출물 생성

// /submission/:submissionId
// :id인 제출물 조회
// :id인 제출물 수정
// :id인 제출물 삭제

// /submission/:submissionId/file
// id인 제출물에 첨부된 파일 목록 조회
// id인 제출물에 파일 첨부
// id인 제출물에 첨부된 파일 수정
// id인 제출물에 첨부된 파일 삭제

module.exports = {

}