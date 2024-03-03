<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>회원가입</title>
<link rel="stylesheet" href="./css/join.css">
<script src="./js/members.js"></script>
</head>

<body>
      <form action="joinOk.jsp" method="post" name="reg_frm">
		<div class="container">
			<h2>
				회원가입을 위해<br>정보를 입력해주세요.
			</h2>
			<label>아이디:<input type="text" name="id" size="20" required></label><br />
			<label>비밀번호:<input type="password" name="pw" size="20" required></label><br />
			<label>이름:<input type="text" name="name" size="20" required></label><br />
			<label>메일:<input type="text" name="eMail" size="20" required></label><br />
			<label>주소:<input type="text" name="address" size="50" required></label><br />

			<br> <br> <label for="agree"><input type="checkbox" id="agree" class="agree" name="agree"> 이용약관 개인정보 수집 및 정보이용에 동의합니다.</label>
			<hr>
			<hr>
			<input type="button" class="submit-button" value="회원가입" onclick="infoConfirm()"> 
			<input type="button" class="cancel-button" value="취소" onclick="javascript:window.location='login.jsp'">
		</div>
	</form>
</body>

</html>