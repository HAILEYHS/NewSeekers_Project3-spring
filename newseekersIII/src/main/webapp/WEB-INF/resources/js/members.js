
function infoConfirm(){
	if(document.reg_frm.id.value.length == 0){
		alert("아이디는 필수사항입니다.");
		reg_frm.id.focus();
		return;
	}
	
	if(document.reg_frm.id.value.length < 4){
		alert("아이디는 4글자 이상이어야 합니다.");
		reg_frm.id.focus();
		return;
	}
	if(document.reg_frm.pw.value.length == 0){
		alert("비밀번호는 필수사항입니다.");
		reg_frm.pw.focus();
		return;
	}
	if(document.reg_frm.name.value.length == 0){
		alert("이름은 필수사항입니다.");
		reg_frm.name.focus();
		return;
	}
	
	if(!document.reg_frm.agree.checked){
		alert("약관동의에 체크 해주세요");
		reg_frm.agree.focus();
		return;
	}
	if(document.reg_frm.eMail.value.length == 0){
		alert("메일은 필수사항입니다.");
		reg_frm.eMail.focus();
		return;
	}
	if(document.reg_frm.eMail.value.indexOf('@')===-1){
		alert("메일에 @를 포함시켜주세요");
		reg_frm.eMail.focus();
		return;
	}
	
	document.reg_frm.submit();
}

   function updateInfoConfirm(){
	   if(document.reg_frm.pw.value == ""){
			alert("패스워드를 입력하세요.");
			document.reg_frm.pw.focus();
			return;
		}
	   
	   if(document.reg_frm.pw.value!= document.reg_frm.pw_check.value){
			alert("비밀번호가 일치하지 않습니다.");
			reg_frm.pw.focus();
			return;
		}
	   
	   if(document.reg_frm.eMail.value.length== 0){
			alert("메일은 필수사항입니다.");
			reg_frm.eMail.focus();
			return;
		}
	   
	   if(document.reg_frm.eMail.value.indexOf('@')===-1){
			alert("메일에 @를 포함시켜주세요");
			reg_frm.eMail.focus();
			return;
		}
	   
	   document.reg_frm.submit();
   }