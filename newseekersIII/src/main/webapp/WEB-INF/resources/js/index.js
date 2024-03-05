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

function memberDelete() {


}
