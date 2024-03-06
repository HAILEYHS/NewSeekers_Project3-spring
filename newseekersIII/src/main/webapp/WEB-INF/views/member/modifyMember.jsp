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
<script src="../js/memberModify.js" ></script>

</head>

<body>
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />
	<form action="/newseekers/member/modifyMember" method="post" name="updateForm" id="formTag">
		<div id="container">
			<h2>
				회원정보 수정을 위한<br>정보를 입력해주세요.
			</h2>

			<label>아이디&nbsp;:&nbsp;&nbsp;<input type="hidden" name="user_id" id="user_id" value="${member.user_id}">${member.user_id}</label>
			<label>비밀번호:<input type="password" name="user_pw" id="user_pw"></label>
			<label>비밀번호 확인:<input type="password" name="user_pw2" id="user_pw2"></label>
			<label>이름:&nbsp;&nbsp;<input type="hidden" name="name" id="name" value="${member.name}"> ${member.name}</label>
			<label>메일:<input type="text" name="email" id="email" value="${member.email}"></label>
			<label>주소:<input type="text" name="address" id="address" value="${member.address}"></label>
			<div class="bt"><button type="button" onclick="updateInfoConfirm()">수정</button></div>
			<div class="bt"><button type="button" onclick="memberDelete()">회원탈퇴</button></div>
			<div class="bt"><button type="reset" onclick="history.back()">취소</button></div>
		</div>
	</form>
		<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
</body>
</html>