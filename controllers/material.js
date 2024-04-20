
/*
    Material

    id          (PK) _ autoincrement
    name
    content
    author      (PK, FK) _ User
    courseId    (PK, FK) _ Course
*/

// /material
// 전체 강의자료 조회
// 강의자료 생성

// /material/:materialId
// :id인 강의자료 조회
// :id인 강의자료 수정
// :id인 강의자료 삭제

// /material/:materialId/file
// id인 강의자료에 첨부된 파일 목록 조회
// id인 강의자료에 파일 첨부
// id인 강의자료에 첨부된 파일 수정
// id인 강의자료에 첨부된 파일 삭제

module.exports = {

}