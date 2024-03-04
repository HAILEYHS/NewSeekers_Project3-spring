
function joinform_check(){
	var user_id = document.getElementsById("user_id");
	var user_pw = document.getElementsById("user_pw");
	var user_pw2 = document.getElementsById("user_pw2");
	var name = document.getElementsById("name");
	var email = document.getElementsById("email");
	var address = document.getElementsById("address");
	var agree = document.getElementsById("agree");
	
	 if(user_id.value.length == 0) {
            alert("아이디는 필수 항목입니다.");
            user_id.focus();
            return false;
     };
     if(user_id.value.length < 4) {
            alert("아이디는 최소 4자 이상이어야 합니다.");
            user_id.focus();
            return false;
     };
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
     if(name.value.length === 0) {
            alert("이름은 필수 항목입니다.");
            name.focus();
            return false;
     };
     if(email.value.length === 0) {
            alert("이메일은 필수 항목입니다.");
            email.focus();
            return false;
     };
     if(!agree.checked) {
            alert("약관에 동의해주세요.");
            agree.focus();
            return false;
     };
     
     document.joinForm.submit();
     
}
  
  
  
  
   function updateInfoConfirm(){
	   if(document.updateForm.user_pw.value == ""){
			alert("패스워드를 입력하세요.");
			document.updateForm.user_pw.focus();
			return;
		}
	   
	   if(document.updateForm.user_pw.value!= document.updateForm.user_pw_check.value){
			alert("비밀번호가 일치하지 않습니다.");
			updateForm.user_pw.focus();
			return;
		}
	   
	   if(document.updateForm.eMail.value.length== 0){
			alert("메일은 필수사항입니다.");
			updateForm.user_email.focus();
			return;
		}
	   
	   if(document.updateForm.eMail.value.indexOf('@')===-1){
			alert("메일에 @를 포함시켜주세요");
			updateForm.user_emuser_ail.focus();
			return;
		}
	   
	   document.updateForm.submit();
   }