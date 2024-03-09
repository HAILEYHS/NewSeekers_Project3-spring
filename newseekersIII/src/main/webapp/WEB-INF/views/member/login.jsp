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
<link rel="stylesheet" href="../css/login.css">
<link rel="stylesheet" href="../css/header.footer.css">

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>회원가입</title>

</head>

<body class="text-center">
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />

	<div id="login_container">
		<div class="row justify-content-center">
			<div class="col-md-5">
				<form action="/newseekers/member/login" method="post" name="reg_frm">
					<h1 class="text-center fw-bold mb-7" id="logo">NewSeekers</h1>
					<br> <br>
					<div class="form-group mb-3">
						<input type="text" placeholder="아이디" name="user_id"
							class="form-control">
					</div>
					<div class="form-group mb-3">
						<input type="password" placeholder="비밀번호" name="user_pw"
							class="form-control">
					</div>
					<!-- 로그인 실패 시 오류 메시지를 표시하는 부분 -->
					<c:if test="${not empty error}">
						<div class="alert alert-danger" role="alert">${error}</div>
					</c:if>
					<div class="logIn d-flex flex-column text-center">
						<button type="submit" class="btn btn-primary mb-2">로그인</button>
						<input type="button" class="btn btn-primary mb-2" value="회원가입"
							onclick="jacascript:window.location='/newseekers/member/join'">
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
</body>

</html>