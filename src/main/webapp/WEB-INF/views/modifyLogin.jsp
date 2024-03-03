<%@page import="memberModel.MemberDto"%>
<%@page import="memberModel.MemberDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<%
	String id = (String) session.getAttribute("id");
	MemberDao dao = MemberDao.getInstance();
	MemberDto dto = dao.getMember(id);
%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="./css/header.footer.css">
<link rel="stylesheet" href="./css/modifyLogin.css">

<script src="./js/members.js"></script>

</head>
<body>
	<form action="modifyOk.jsp" method="post" name="reg_frm">
		<div id="container">
			<h2>
				회원정보 수정을 위한<br>정보를 입력해주세요.
			</h2>
			아이디:&nbsp;&nbsp;<%=dto.getId()%><br /> <br> 비밀번호:<input
				type="password" name="pw" size="20" placeholder="변경할 비밀번호를 입력해주세요"
				required><br /> 비밀번호 확인:<input type="password"
				name="pw_check" size="20" required><br /> 이름:&nbsp;&nbsp;<%=dto.getName()%><br />
			<br> 메일:<input type="email" name="eMail" size="40"
				value="<%=dto.geteMail()%>" required><br /> 주소:<input
				type="text" name="address" size="50" value="<%=dto.getAddress()%>"
				required><br /> <br>
			<br> <input type="button" value="수정"
				onclick="updateInfoConfirm()">&nbsp;&nbsp;&nbsp;<input
				type="reset" value="취소"
				onclick="javascript:window.location='login.jsp'">
		</div>
	</form>
</body>
</html>