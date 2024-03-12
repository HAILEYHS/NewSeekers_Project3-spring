<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">
<!-- css -->
<link rel="stylesheet" href="../css/join.css">
<link rel="stylesheet" href="../css/header.footer.css">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>회원가입</title>
<script src="../js/memberJoin.js"></script>

</head>

<body>
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />

	<form action="/newseekers/member/join" method="post" name="joinForm">
		<div id="container">
			<h2>
				회원가입을 위해<br>정보를 입력해주세요.
			</h2>
			<!-- 로그인 실패 시 오류 메시지를 표시하는 부분 -->
			<c:if test="${not empty error}">
				<div class="alert alert-danger" role="alert">${error}</div>
			</c:if>
			<label>아이디:<input type="text" name="user_id" id="user_id"
				autofocus></label>
			<div id="user_id_check"></div>
			<label>비밀번호:<input type="password" name="user_pw" 	id="user_pw"></label>
			<label>비밀번호 확인:<input type="password" name="user_pw2" id="user_pw2"></label>
			<label>이름:<input type="text" name="name" id="name"></label>
			<label>메일:<input type="text" name="email" id="email"></label> 
			<label>주소:<input type="text" name="address" id="address"></label> 
			<label for="agree">
				<input type="checkbox" id="agree" class="agree" name="agree"> 이용약관 개인정보 수집 및 정보이용에 동의합니다.
			</label>

			<div class="bt">
				<button type="button" onclick="joinform_check()">회원가입</button>
			</div>
			<div class="bt">
				<button type="button" onclick="history.back()">취소</button>
			</div>
		</div>
	</form>

	<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
</body>

</html>