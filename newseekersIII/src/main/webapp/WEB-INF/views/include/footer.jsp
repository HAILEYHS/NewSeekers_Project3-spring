<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<!-- 모달 창 부분 -->
<div class="modal fade" id="myPageModal" tabindex="10"
	aria-labelledby="ModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- 모달 제목 -->
			<button type="button" class="btn-close" data-bs-dismiss="modal"
				aria-label="Close"></button>
			<DIV class="modal-header">
				<h5 class="modal-title" id="modalLable">
					<c:out value="${sessionScope.name}" />님 반갑습니다.
				</h5>
			</DIV>
			<!-- 모달 내용 부분 -->
			<div class="modal-body">
				<img src="../img/profile.png"  id="profileImage" alt="프로필 이미지">
			</div>
			<div class="modal-footer">
				<!-- 로그아웃 및 수정 버튼 -->
				<button type="button" class="btn btn-danger" data-bs-dismiss="modal"
					onclick="javascript:window.location='/newseekers/member/logout'">로그아웃</button>
				<button type="button" class="btn btn-success"
    onclick="javascript:window.location='/newseekers/member/modifyMember?id=${sessionScope.user_id}'">수정</button>
			</div>

		</div>
	</div>
</div>



<footer id="footer_container">
	<div id="footer_box">
		<div id="footer_address">
			<li>서울시 마포구 신촌로 176 중앙빌딩</li>
			<li>대표전화 02-123-1234</li>
			<li>대표메일 abc@abc.com</li>
		</div>
		<div id="footer_info">
			<div>개인정보처리방침</div>
			<div>이메일 무단수집 거부</div>
			<div>이용약관</div>
		</div>
	</div>
</footer>

