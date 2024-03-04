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
<link rel="stylesheet" href="<c:url value='../css/join.css'/>">
<link rel="stylesheet" href="<c:url value='../css/header.footer.css'/>">

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>회원가입</title>
<script src="../js/members.js" ></script>

</head>

<body>
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />
	
	<form action="/newseekers/member/join" method="post" name="joinForm">
		<div class="container">
			<h2>
				회원가입을 위해<br>정보를 입력해주세요.
			</h2>
			<label>아이디:<input type="text" name="user_id" id="user_id" required></label>
			<label>비밀번호:<input type="password" name="user_pw" id="user_pw" required></label>
			<label>비밀번호 확인:<input type="password" name="user_pw2" id="user_pw2" required></label>
			<label>이름:<input type="text" name="name" id="name" required></label>
			<label>메일:<input type="text" name="email" id="email" required></label>
			<label>주소:<input type="text" name="address" id="address" required></label>
			<label for="agree"><input type="checkbox" id="agree" class="agree" name="agree">
			 이용약관 개인정보 수집 및 정보이용에 동의합니다.</label>

			<button type="button" onclick="joinform_check()">회원가입</button>
			<button type="button" onclick="history.back()">취소</button>
		</div>
	</form>
	
	<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
</body>

</html>