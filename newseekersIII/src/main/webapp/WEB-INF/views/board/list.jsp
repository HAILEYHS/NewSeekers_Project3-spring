<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>고객의견 목록</title>
<!-- css -->
<link rel="stylesheet" href="../css/header.footer.css">
<link rel="stylesheet" href="../css/board.css">
<!-- bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
	<!-- header  -->
	<jsp:include page="../include/nav.jsp" />
	<!-- 페이지네이션 < 버튼 생성을 위해 현재페이지 받음. -->
	<c:set var="currentPage" value="${param.page}" />

	<div class="board_wrap">
		<div class="board_title">
			<strong>커뮤니티</strong>
			<p>
				공유하고 싶은 정보를 작성해주세요.</p>
		</div>
		<div class="board_list_wrap">

			<div class="board_list">
				<div class="top">
					<div class="num">번호</div>
					<div class="title">제목</div>
					<div class="writer">글쓴이</div>
					<div class="date">작성일</div>
					<div class="count">조회</div>
				</div>
				<c:forEach items="${boardList}" var="dto">
					<div>
						<div class="num">${dto.community_num}</div>
						<div class="title">
							<c:forEach begin="1" end="${dto.indent_num}">RE : </c:forEach>
							<a href="content_view?community_num=${dto.community_num}">${dto.title}</a>
						</div>
						<div class="writer">${dto.user_id}</div>
						<div class="date" id="board_list_date">${dto.date_created}</div>
						<div class="count">${dto.hit}</div>
					</div>
				</c:forEach>
			</div>

			<div class="board_page">

				<a href="list?page=1" class="bt first"> << </a>

				<c:choose>
					<c:when test="${currentPage > 1}">
						<a href="list?page=${currentPage - 1}" class="bt  prev"><</a>
					</c:when>
				</c:choose>

				<c:forEach var="pageNumber" begin="${startPage}" end="${endPage}">
					<c:set var="onClass"
						value="${pageNumber eq currentPage ? 'on' : ''}" />
					<a href="list?page=${pageNumber}" class="num ${onClass}">${pageNumber}</a>
				</c:forEach>

				<c:choose>
					<c:when test="${currentPage < pageBtnNum}">
						<a href="list?page=${currentPage + 1}" class="bt next">></a>
					</c:when>
				</c:choose>

				<a href="list?page=${pageBtnNum}" class="bt last">>></a>

			</div>

			<div class="bt_wrap">
				<c:if test="${not empty sessionScope.user_id}">
					<div class="bt_wrap">
						<a href="write_view" class="on">글쓰기</a>
					</div>
				</c:if>


				<c:if test="${empty sessionScope.user_id}">
					<div class="bt_wrap">
						<a href="/newseekers/member/login">글쓰기</a>
					</div>
				</c:if>
			</div>
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