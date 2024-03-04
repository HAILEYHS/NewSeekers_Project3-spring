<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
		<%@ page import="java.util.ArrayList" %>
			<c:set var="region" value="${param.region}" />
			<!DOCTYPE html>

			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>우리동네 돋보기</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
					integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
					crossorigin="anonymous">
				<link rel="stylesheet" href="./css/gu_page.css">
				<link rel="stylesheet" href="./css/header.footer.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
					integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
					crossorigin="anonymous" referrerpolicy="no-referrer" />
				<script type="text/javascript"
					src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b6db9027784dedc18bbafd22614168f8&libraries=services,drawing"></script>
				<script src="./json/seoul_park.json" type="text/javascript"></script>
				<script src="./json/policeOffice.geojson" type="text/javascript"></script>
				<script src="./json/SeoulCCTV.json" type="text/javascript"></script>
			</head>

			<body>


				<!-- -------------- header ---------------- -->

				<jsp:include page="./include/nav.jsp" />


				<!-- gu_rank -->
				<% request.setCharacterEncoding("UTF-8"); String region=request.getParameter("region"); %>

					<div id="screen1" class="container-fluid">
						<div id="screen1_container" class="row">
							<div id="screen1_title" class="col-lg-5">
								<div id="screen1_titleMent">
									<h2>우리동네 돋보기</h2>
								</div>

								<div id="gu_box">
									<% ArrayList<String> guList = new ArrayList<String>();
											guList.add("강남구");
											guList.add("송파구");
											guList.add("영등포구");
											guList.add("성동구");
											guList.add("노원구");
											guList.add("강북구");
											%>
											<div id="local_box">
												<select name="selectbox" id="selectbox" >
													<c:forEach var="gu" items="<%=guList%>">
														<c:set var="selected"
															value="${gu eq region ? 'selected' : ''}" />
														<option value="${gu}" ${selected}>${gu}</option>
													</c:forEach>
												</select>
											</div>
											<div id="gu_rankBox">치안등급 : <span id="gu_rank">1</span></div>
											<div id="gu_peopleBox">인구 수 : <span id="gu_people">5421</span></div>
								</div>
							</div>

							<div id="gu_nameBox" class="col-lg-5">
								<span id="gu_name">
									<c:choose>
										<c:when test="${region eq '강남구'}">
											<c:out value="<강남구>" />
										</c:when>
										<c:when test="${region eq '송파구'}">
											<c:out value="<송파구>" />
										</c:when>
										<c:when test="${region eq '영등포구'}">
											<c:out value="<영등포구>" />
										</c:when>
										<c:when test="${region eq '성동구'}">
											<c:out value="<성동구>" />
										</c:when>
										<c:when test="${region eq '노원구'}">
											<c:out value="<노원구>" />
										</c:when>
										<c:when test="${region eq '강북구'}">
											<c:out value="<강북구>" />
										</c:when>
										<c:otherwise>
											<c:out value="<강남구>" />
										</c:otherwise>
									</c:choose>
								</span>&nbsp;&nbsp;의 안전 알아보기
							</div>
						</div>
					</div>

					<div id="screen1_chart" class="container-fluid">
						<div id="screen1_chartBox" class="row">

							<span id="security"> 그래프로 보는 우리동네 치안시설 </span>

							<div id="cctv" class="security_box col-md-12 col-lg-3">
								<p>cctv</p>
								<div>
									<canvas id="myChart1"></canvas>
								</div>
							</div>
							<div id="light" class="security_box col-md-12 col-lg-3">
								<p>보안등</p>
								<div>
									<canvas id="myChart2"></canvas>
								</div>

							</div>
							<div id="police" class="security_box col-md-12 col-lg-3">
								<p>경찰관서 수</p>
								<div>
									<canvas id="myChart3"></canvas>
								</div>
							</div>
						</div>
					</div>


					<!-- arrest chart -->

					<div id="screen2" class="container-fluid">
						<div id="screen2_container" class="row">
							<span id="safety_rank"> 우리 동네의 체감안전도 알아보기 </span>
							<div id="screen2_chartBox" class="col-md-12 col-lg-7">
								<canvas id="safetyChart"></canvas>
							</div>
							<div id="chart_result" class="col-md-12 col-lg-4">
								<div class="btn-group">
									<button type="button" class="btn btn-secondary" id="bt2019">2019</button>
									<button type="button" class="btn btn-secondary" id="bt2020">2020</button>
									<button type="button" class="btn btn-secondary" id="bt2021">2021</button>
									<button type="button" class="btn btn-secondary" id="bt2022">2022</button>
									<button type="button" class="btn btn-secondary" id="bt2023">2023</button>
								</div>
								<div id="chart_resultMent">
									<div id="chart_resultMent1" class="result_Ment">
										<p>체감 안전도</p>
									</div>
									<div id="chart_resultMent2">
										<p>25개구 중</p>
									</div>
									<div>
										<span id="chart_resultMent3">1위</span>
									</div>
								</div>
							</div>
						</div>
					</div>


					<!-- ------- map ------------------------------------------------  -->

					<div id="map_container" class="container-fluid">
						<div id="map_box" class="row">
							<div>
								<p id="map_ment1">우리동네 주변의 공원</p>
								<p id="map_ment2">공원정보와 안전 시설물을 볼수 있어요!</p>
								<p id="policeq">경찰서 표시범위 산정기준?</p>
							</div>
							<div id="modalContainer2" class="hidden">
								<div id="modalContent2">
									<p>
									<h2>경찰서 표시범위 산정기준</h2>
									<br>
									<br>
									<h4>
										◎ 현장평균도착시간 : 4분 34초<br> ◎ 평균차량통행속도 : 23.1km/h
										<br> ◎ 긴급출동 평균도착시간 내 도달 가능한 거리 : 1.758km
										<br>
									</h4>
									</p>
								</div>
							</div>

							<div id="park_mapBox" class="col-lg-12 row">
								<div id="map" class="col-lg-12">
									<div id="modal">
										<div class="modal-content">
											<h5>지도 사용 방법</h5>
											<br>
											<p>● 마우스 클릭 위치에 해당하는 자치구의 공원이 표시됩니다.</p>
											<p>
												● 공원을 클릭하면 반경 500m이내의 CCTV 및<br> 반경 1700m이내의 경찰서가 표시됩니다.
											</p>
											<p>&nbsp;&nbsp;(경찰서의 위치는 긴급출동이 가능한 범위를 기준으로 산정하였습니다.)</p>
											<p>● 지도의 확대 및 축소는 지도 오른쪽 상단의 버튼을 통해서만 가능합니다.</p>
										</div>
									</div>
								</div>

								<div id="park_security">
									<div id="park_securityMent">공원주변의 치안시설 수</div>
									<div class="security_count">
										cctv수 : <span id="park_cctv"></span>
									</div>
									<div class="security_count">
										경찰서 수 : <span id="park_police"></span>
									</div>
								</div>
							</div>

							<div id="park_list" class="col-lg-12">
								<div id="park_information">
									<div class="park_i">
										공원이름 : <span id="p_park"></span>
									</div>
									<div class="park_i">
										관리부서 : <span id="p_name"></span>
									</div>
									<div class="park_i">
										전화번호 : <span id="p_admintel"></span>
									</div>
									<div class="park_i">
										공원정보 : <span id="p_list_content"></span>
									</div>
									<div class="park_i">
										이용정보 : <span id="use_refer"></span>
									</div>
									<!-- <div class="park_i">오시는 길 : <span id="visit_road">명동역(남산케이블카 와룡묘 서울애니메이션센터 방면)</span></div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="map_wrap">
						<div class="custom_zoomcontrol radius_border">
							<span onclick="zoomIn()"><img
									src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
									alt="확대"></span> <span onclick="zoomOut()"><img
									src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
									alt="축소"></span>
						</div>
					</div>

					<!--sidebar-->
					<div id="sidebar">
						<a href="./Index.html" id="home" data-bs-toggle="tooltip" data-bs-placement="right" title="홈으로"
							data-bs-custom-class="custom-tooltip" class="fa fa-home"></a> <a href="#" id="upsideIcon"
							data-bs-toggle="tooltip" data-bs-placement="right" title="상단으로"
							data-bs-custom-class="custom-tooltip" class="fa-solid fa-chevron-up"></a>
						<a href="#safety_rank" id="upsideIcon" data-bs-toggle="tooltip" data-bs-placement="right"
							title="우리동네 안전체감도 알아보기" data-bs-custom-class="custom-tooltip" class="fa-solid fa-award"></a>
						<a href="#map_box" id="mapIcon" data-bs-toggle="tooltip" data-bs-placement="right"
							title="우리동네 공원찾기" data-bs-custom-class="custom-tooltip"
							class="fa-solid fa-map-location-dot"></a>

					</div>
					<br>
					<br><br><br><br><br><br><br><br><br><br><br><br><br>

					<!-- ---------footer--------------------------->
					<jsp:include page="./include/footer.jsp" />
					<!-- -------------- script ---------------- -->
					<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
						integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
						crossorigin="anonymous"></script>
					<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
						integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
						crossorigin="anonymous"></script>
					<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
					<script src="./js/gu_page.js"></script>
					<script src="./js/map_ym.js"></script>

					<script src="http://code.jquery.com/jquery-latest.js"></script>
			</body>

			</html>