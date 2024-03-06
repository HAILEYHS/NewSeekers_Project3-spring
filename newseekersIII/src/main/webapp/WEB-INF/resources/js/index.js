//jqury버전
//$(document).ready(function() {                        
//    $('#myPageModal').on('show.bs.modal', function () {     
//          var modal = $(this);
//          modal.appendTo('body');
//     });       
//});

//자바스크립트버전
document.addEventListener('DOMContentLoaded', function () {
    var myPageModal = document.getElementById('myPageModal');
    myPageModal.addEventListener('show.bs.modal', function () {
        document.body.appendChild(myPageModal);
    });
});

//로그아웃 function만들면 모든 페이지에 js파일을 추가해야해서
// main페이지만 함수 넣고 나머지 페이지는 include 코드에 직접 넣어놓음.
function logout() {
    window.location = '/newseekers/member/logout';
}
