<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>고객의견</title>
<!-- css -->
<link rel="stylesheet" href="<c:url value='../css/header.footer.css'/>">
<link rel="stylesheet" href="<c:url value='../css/board.css'/>">

	<!-- bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
</head>

<body>
	<!-- header -->
	<jsp:include page="../include/nav.jsp" />
	<div class="board_wrap">
		<div class="board_title">
			<strong>커뮤니티</strong>
			<p>공유하고 싶은 정보를 작성해주세요.</p>
		</div>
		<div class="board_view_wrap">
				<div class="board_view">
					<div class="title">${content_view.title}</div>
					<div class="info">
						<dl>
							<dt>번호</dt>
							<dd>${content_view.community_num}</dd>
						</dl>
						<dl>
							<dt>글쓴이</dt>
							<dd>${content_view.user_Id}</dd>
						</dl>
						<dl>
							<dt>작성일</dt>
							<dd>${content_view.date_created}</dd>
						</dl>
						<dl>
							<dt>조회</dt>
							<dd>${content_view.hit}</dd>
						</dl>
					</div>
					<div class="cont">
						<div id="content_view" name="content">${content_view.content}</div>
					</div>
				</div>



				<div class="bt_wrap">
					<a href='<c:url value="/board/modify_view?community_num=${content_view.community_num}"/>'>수정</a>
					<a href='<c:url value="/board/delete?community_num=${content_view.community_num}"/>'>삭제</a>
					<a href='<c:url value="/board/reply_view?community_num=${content_view.community_num}"/>'>답변</a>
				</div>
				<!-- 아직 member없어서 주석.
				<c:if test="${not empty sessionScope.ValidMem}">
					<div class="bt_wrap">


						<c:if test="${showEditButton}">
							<input type="submit" value="수정">&nbsp;&nbsp; &nbsp;&nbsp;

							
							<a href="delete.do?community_num=${content_view.community_num}">삭제</a>
						</c:if>


						<a href="list.do?page=1">목록보기</a>&nbsp;&nbsp; <a
							href="reply_view.jsp?community_num=${content_view.community_num}&user_Id=${content_view.user_Id}&title=${content_view.title}
						&date_created=${content_view.date_created}&hit=${content_view.hit}&content=${content_view.content}
						&group_num=${content_view.group_num}&indent_num=${content_view.indent_num}&step_num=${content_view.step_num}">답변</a>
					</div>
				</c:if>
 				-->


				<c:if test="${empty sessionScope.ValidMem}">
					<div class="bt_wrap">
						<a href="list.do?page=1">목록보기</a>
					</div>
				</c:if>



		</div>
	</div>
	<!-- footer -->
	<jsp:include page="../include/footer.jsp" />
	<!-- bootstrap -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
		integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
		crossorigin="anonymous"></script>
</body>

</html>