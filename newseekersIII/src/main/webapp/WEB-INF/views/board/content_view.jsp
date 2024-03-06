<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>고객의견</title>
<!-- css -->
<link rel="stylesheet" href="../css/header.footer.css">
<link rel="stylesheet" href="../css/board.css">

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
			<form action="modify_view" method="post" accept-charset="utf-8">
				<input type="hidden" name="community_num" value="${content_view.community_num}">
				<input type="hidden" name="user_id" value="${content_view.user_id}">
				<input type="hidden" name="title" value="${content_view.title}">
				<input type="hidden" name="date_created" value="${content_view.date_created}">
				<input type="hidden" name="hit" value="${content_view.hit}">
				<div class="board_view">
					<div class="title">${content_view.title}</div>
					<div class="info">
						<dl>
							<dt>번호</dt>
							<dd>${content_view.community_num}</dd>
						</dl>
						<dl>
							<dt>글쓴이</dt>
							<dd>${content_view.user_id}</dd>
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
				<c:if test="${not empty sessionScope.user_id}">
					<div class="bt_wrap">

						<c:if test="${showEditButton}">
							<input type="submit" value="수정"> &nbsp;&nbsp;
								&nbsp;&nbsp; 
							<a href="delete.do?community_num=${content_view.community_num}">삭제</a>
						</c:if>

						<a href="list.do?page=1">목록보기</a>&nbsp;&nbsp; <a
							href="reply_view?community_num=${content_view.community_num}&user_id=${content_view.user_id}&title=${content_view.title}
						&date_created=${content_view.date_created}&hit=${content_view.hit}&content=${content_view.content}
						&group_num=${content_view.group_num}&indent_num=${content_view.indent_num}&step_num=${content_view.step_num}">답변</a>
					</div>
				</c:if>

				<c:if test="${empty sessionScope.user_id}">
					<div class="bt_wrap">
						<a href="list?page=1">목록보기</a>
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