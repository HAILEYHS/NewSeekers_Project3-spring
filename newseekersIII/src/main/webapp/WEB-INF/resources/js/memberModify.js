function updateInfoConfirm(){
	var user_id = document.getElementById("user_id");
	var user_pw = document.getElementById("user_pw");
	var user_pw2 = document.getElementById("user_pw2");
	var name = document.getElementById("name");
	var email = document.getElementById("email");
	var address = document.getElementById("address");
	
     if(user_pw.value.length === 0) {
            alert("비밀번호는 필수 항목입니다.");
            user_pw.focus();
            return false;
     };
     if(user_pw2.value.length === 0) {
            alert("비밀번호 확인은 필수 항목입니다.");
            user_pw2.focus();
            return false;
     };
     if(user_pw.value !== user_pw2.value) {
            alert("비밀번호가 일치하지 않습니다.");
            user_pw2.focus();
            return false;
     };
     if(email.value.length === 0) {
            alert("이메일은 필수 항목입니다.");
            email.focus();
            return false;
     };
     if(email.value.indexOf('@')===-1){
			alert("메일에 @를 포함시켜주세요");
			updateForm.user_emuser_ail.focus();
			return;
	};
	
	// 수정이 성공적으로 이루어졌음을 알리는 알림창 표시
    alert("회원 정보가 수정되었습니다.");
    
     document.updateForm.submit();
}

function memberDelete() {
	var formTag = document.getElementById("formTag");
	formTag.action = "/newseekers/member/delete";
	
	var user_id = document.getElementById("user_id");
	var user_pw = document.getElementById("user_pw");
	var user_pw2 = document.getElementById("user_pw2");
	var name = document.getElementById("name");
	
     if(user_pw.value.length === 0) {
            alert("비밀번호는 필수 항목입니다.");
            user_pw.focus();
            return false;
     };
     if(user_pw2.value.length === 0) {
            alert("비밀번호 확인은 필수 항목입니다.");
            user_pw2.focus();
            return false;
     };
     if(user_pw.value !== user_pw2.value) {
            alert("비밀번호가 일치하지 않습니다.");
            user_pw2.focus();
            return false;
     };
    
	formTag.submit();
}
