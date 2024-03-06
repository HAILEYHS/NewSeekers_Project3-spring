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
			<strong>의견 수정</strong>
			<p>의견의 수정사항을 입력해주세요.</p>
		</div>
		<div class="board_write_wrap">
			<form action="modify" method="post">
				<input type="hidden" name="community_num" value="${content.community_num}"> <input
					type="hidden" name="user_id" value="${content.user_id}"> <input
					type="hidden" name="date_created" value="${content.date_created}"> <input
					type="hidden" name="hit" value="${content.hit}">
				<div class="board_write">
					<div class="title">
						<dl>
							<dt>제목</dt>
							<dd>
								<input type="text" name="title" value="${content.title}">
							</dd>
						</dl>
					</div>
					<div class="info">
						<dl>
							<dt>글쓴이</dt>
							<dd>${content.user_id}</dd>
						</dl>
						<dl>
							<dt>작성일</dt>
							<dd>${content.date_created}</dd>
						</dl>


					</div>
					<div class="cont">
						<textarea name="content">${content.content}</textarea>
					</div>
				</div>
				<div class="bt_wrap">
					<input type="submit" value="수정"><a href="list?page=1">취소</a>
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

</html>