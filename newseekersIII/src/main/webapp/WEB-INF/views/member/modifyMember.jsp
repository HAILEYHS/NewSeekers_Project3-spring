<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<title>회원정보 수정</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<!-- css -->
<link rel="stylesheet" href="<c:url value='../css/header.footer.css'/>">
<link rel="stylesheet" href="<c:url value='../css/board.css'/>">
<!-- java script -->
<script src="../js/members.js"></script>
</head>

<body>
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />
	<form action="newseekers/member/modifyLogin" method="post" name="updateForm">
		<div id="container">
			<h2>
				회원정보 수정을 위한<br>정보를 입력해주세요.
			</h2>
			아이디:&nbsp;&nbsp; ${member.user_id} <br><br>
			비밀번호:<input type="password" name="user_pw" size="20" placeholder="변경할 비밀번호를 입력해주세요"
				required><br />
			비밀번호 확인:<input type="password" name="user_pw_check" size="20" placeholder="다시 한번 입력해주세요" required><br>
			이름:&nbsp;&nbsp; ${member.name} <br><br>
			메일:<input type="email" name="email" size="40" value="${member.email}" required><br><br> 
			주소:<input type="text" name="address" size="50" value="${member.address}" required><br><br><br> 
			<input type="button" value="수정" onclick="updateInfoConfirm()">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소" 	onclick="javascript:window.location='/member/login'">
		</div>
	</form>
		<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
</body>
</html>