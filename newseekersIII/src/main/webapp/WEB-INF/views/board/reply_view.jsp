<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>커뮤니티</title>
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
			<strong>커뮤니티 -답변</strong>
			<p>공유하고 싶은 정보를 작성해주세요.</p>
		</div>
		<div class="board_write_wrap">
			<div class="board_view">
				<div class="title">${content.title}</div>
				<div class="info">
					<dl>
						<dt>번호</dt>
						<dd>${content.community_num}</dd>
					</dl>
					<dl>
						<dt>글쓴이</dt>
						<dd>${content.user_id}</dd>
					</dl>
					<dl>
						<dt>작성일</dt>
						<dd>${content.date_created}</dd>
					</dl>
					<dl>
						<dt>조회</dt>
						<dd>${content.hit}</dd>
					</dl>
				</div>
				<div class="cont">
					<dl>
						<dt>내용</dt>
						<dd>${content.content}</dd>
					</dl>
				</div>
			</div>
			<form action="reply" method="post">
				<input type="hidden" name="community_num" value="${content.community_num}"> <input
					type="hidden" name="group_num" value="${content.group_num}"> <input
					type="hidden" name="step_num" value="${content.step_num}"> <input
					type="hidden" name="indent_num" value="${content.indent_num}">

				<div class="board_write">
					<div class="title">
						<dl>
							<dt>제목</dt>
							<dd>
								<input type="text" name="title">
							</dd>
						</dl>
					</div>
					<div class="info">
						<dl>
							<dt>글쓴이</dt>
							<dd>
							<!-- session에 있는 user_id -->
								<input type="hidden" name="user_id" value="${user_id}">
								${user_id}
							</dd>
						</dl>
					</div>
					<div class="cont">
						<textarea name="content"></textarea>
					</div>
				</div>
				<div class="bt_wrap">
					<input type="submit" value="답변"><a href="list.do?page=1">목록</a>
				</div>
			</form>
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