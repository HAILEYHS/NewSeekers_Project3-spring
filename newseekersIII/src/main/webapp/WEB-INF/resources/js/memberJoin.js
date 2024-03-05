
function joinform_check(){
	var user_id = document.getElementById("user_id");
	var user_pw = document.getElementById("user_pw");
	var user_pw2 = document.getElementById("user_pw2");
	var name = document.getElementById("name");
	var email = document.getElementById("email");
	var address = document.getElementById("address");
	var agree = document.getElementById("agree");
	
	 if(user_id.value.length === 0) {
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
     if(email.value.indexOf('@')===-1){
			alert("메일에 @를 포함시켜주세요");
			updateForm.user_emuser_ail.focus();
			return;
	};
     if(!agree.checked) {
            alert("약관에 동의해주세요.");
            agree.focus();
            return false;
     };
     document.joinForm.submit();
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user_id").addEventListener("blur", function() {
        var user_id = document.getElementById("user_id").value;
        
        if (user_id == '' || user_id.length == 0) {
            document.getElementById("user_id_check").style.color = "red";
            document.getElementById("user_id_check").innerText = "공백은 ID로 사용할 수 없습니다.";
            return false;
        }
        
        // Fetch API로 전송
        fetch("/newseekers/member/confirmId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.getElementById("user_id_check").style.color = "red";
                document.getElementById("user_id_check").innerHTML = "이미 사용 중인 ID 입니다.";
            } else {
            	document.getElementById("user_id_check").style.color = "blue";
                document.getElementById("user_id_check").innerHTML = "사용 가능한 ID 입니다.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("user_id_check").innerText = "서버 오류가 발생했습니다.";
            document.getElementById("user_id_check").style.color = "red";
        });
    });
});

  