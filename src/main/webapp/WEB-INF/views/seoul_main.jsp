<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
		<!DOCTYPE html>

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Beautiful_Seoul</title>
			<!--geojson-->
			<script src="./json/seoul.geojson" type="text/javascript"></script>
			<!--style css-->
			<link rel="stylesheet" href="./css/seoul_main.css">
			<link rel="stylesheet" href="./css/header.footer.css">
			<!--bootstrap-->
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
				crossorigin="anonymous">
			<!--fontawsome icon-->
			<script src="https://kit.fontawesome.com/2a2ce3b1ad.js" crossorigin="anonymous"></script>

		</head>

		<body>
			<!--subtitle-->
			<!-- <div class="container-fluid" id="s_head">
            <a href="./Index.html"><img src="./img/1logo.png"></a>
            <span class="section-title" id="s_title">2022년</span>
            <span id="s_subTitle">서울시안전등급지도</span>
        </div> -->


			<!--nav-->
			<header>
				<div class="headbar fixed-top ">
					<jsp:include page="./include/nav.jsp" />

					<div id="s_head" style="margin-top: 68px">
						<span class="section-title" id="s_title">
							&nbsp;&nbsp;2022년&nbsp; </span> <span id="s_subTitle">[서울시안전등급지도&nbsp;&nbsp;]</span>
					</div>
				</div>
				</div>
			</header>





			<!--adjust space-->
			<!-- <div class="s_space"></div> -->

			<!--responsive layout start-->
			<div class="container-fluid">

				<div class="row" id="map_box">
					<!--security grade layout-->
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-1" id="gradeBox">

						<div class="row gx-5" id="s_grade">
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn1" type="button" class="btn btn-lg " value="1"
									style="color: rgb(39, 39, 39); background-color: #f9ddb1;"
									onclick="gradeSelec('btn1')">
									<h6>1 등급</h6>
								</button>
							</div>
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn2" type="button" class="btn btn-lg " value="2"
									style="color: rgb(39, 39, 39); background-color: #f5c77e;"
									onclick="gradeSelec('btn2')">
									<h6>2등급</h6>
								</button>
							</div>
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn3" type="button" class="btn btn-lg " value="3"
									style="color: rgb(39, 39, 39); background-color: #f1b04c;"
									onclick="gradeSelec('btn3')">
									<h6>3등급</h6>
								</button>
							</div>
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn4" type="button" class="btn btn-lg " value="4"
									style="color: rgb(39, 39, 39); background-color: #ee9f27;"
									onclick="gradeSelec('btn4')">
									<h6>4등급</h6>
								</button>
							</div>
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn5" type="button" class="btn btn-lg " value="5"
									style="color: rgb(39, 39, 39); background-color: #ec9006;"
									onclick="gradeSelec('btn5')">
									<h6>5등급</h6>
								</button>
							</div>
							<div class="col-2 col-sm-2 col-md-2 col-lg-12">
								<button id="btn6" type="button" class="btn btn-lg" value="1" onclick="displayAllArea()">
									<h5>전체등급</h5>
								</button>
							</div>
						</div>

					</div>

					<!--kakao map-->
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
						<div id="s_map"></div>

						<!--slider-->
						<div id="adjYear">
							<div id="s_slide">
								<div>
									<input id="slider" class="slider" type="range" min="2004" max="2022" value="2022"
										step="3" list="tickmarks">
								</div>
								<div id="output"></div>
								<div>
									<span id="question1">&nbsp;&nbsp;<i class="fa-solid fa-question">&nbsp;&nbsp;</i>
										<div id="modalContainer1" class="hidden">
											<div id="modalContent1">
												<p>
												<h5>안전등급산정기준</h5>
												<br>
												<h6>
													◎ 인구 10만명당 5대주요범죄 발생건수(-) : 50%
													<br>
													<br> ◎ 인구 10만명당 경찰관서 수(+) : 35.8%
													<br> ◎ 인구 10만명당 경찰관 수(+) : 6.4%
													<br> ◎ 인구 10만명당 주점 수(-) : 5.1%
													<br> ◎ 인구 10만명당 범죄예방CCTV 수(+) : 2.1%
													<br> ◎ 인구 10만명당 방범등 수(+) : 0.5%
													<br> ◎ 인구 10만명당 1인가구 수(-) : 0.1%
													<br>
													<br>
												</h6>
												</p>
											</div>
										</div>
									</span>
									<datalist id="tickmarks">
										<option value="2004">2004</option>
										<option value="2007">2007</option>
										<option value="2010">2010</option>
										<option value="2013">2013</option>
										<option value="2016">2016</option>
										<option value="2019">2019</option>
										<option value="2022">2022</option>
									</datalist>
								</div>
							</div>


							<!--select box-->
							<div id="s_select">
								<span id="question2">&nbsp;&nbsp;<i class="fa-solid fa-question">&nbsp;&nbsp;</i>
									<div id="modalContainer2" class="hidden">
										<div id="modalContent2">
											<p>
											<h5>안전등급산정기준</h5>
											<br>
											<h6>
												◎ 인구 10만명당 5대주요범죄 발생건수(-) : 50%
												<br>
												<br> ◎ 인구 10만명당 경찰관서 수(+) : 35.8%
												<br> ◎ 인구 10만명당 경찰관 수(+) : 6.4%
												<br> ◎ 인구 10만명당 주점 수(-) : 5.1%
												<br> ◎ 인구 10만명당 범죄예방CCTV 수(+) : 2.1%
												<br> ◎ 인구 10만명당 방범등 수(+) : 0.5%
												<br> ◎ 인구 10만명당 1인가구 수(-) : 0.1%
												<br>
												<br>
											</h6>
											</p>
										</div>
									</div>
								</span> <select id="selector" onchange="">
									<option value="2004">2004</option>
									<option value="2007">2007</option>
									<option value="2010">2010</option>
									<option value="2013">2013</option>
									<option value="2016">2016</option>
									<option value="2019">2019</option>
									<option value="2022" selected="selected">2022</option>
								</select>
							</div>
						</div>


					</div>

					<!--number of security facilities-->

					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-1" id="secuNum">
						<div class="row " id="numBox">
							<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-12 col-xxl-12">
								<div id="cctvNumHead">CCTV</div>
								<div id="cctvNum">80,005</div>
							</div>
							<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-12 col-xxl-12">
								<div id="lightNumHead">보안등수</div>
								<div id="lightNum">199,538</div>
							</div>
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-12 col-xxl-12">
								<div id="policeNumHead">경찰관서수</div>
								<div id="policeNum">438</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<!--Space-->
			<div class="s_space"></div>


			<!--Chart start-->
			<div class="container-fluid" id="chartBox">
				<div class="mainChartTitle">
					<h2 class="section-title">&nbsp;&nbsp;차트로 보는 서울</h2>
				</div>

				<div class="row" id="s_chart">
					<!--Doughnut Chart-->
					<div class=" col-sm-12 col-lg-5 col-xl-5 col-xxl-3" id="rateWrap">
						<div id="chartTitle1">2022년 범죄 발생 비율</div>
						<div id="rateBox">
							<canvas id="cRateChart"></canvas>
						</div>
					</div>
					<!--Bar Chart-->
					<div class=" col-sm-12 col-lg-5 col-xl-5 col-xxl-3" id="barWrap">
						<div id="chartTitle2">2022년 범죄 발생 수</div>
						<div id="barBox">
							<canvas id="cNumChart"></canvas>
						</div>
					</div>
					<!--Line Chart-->
					<div class="col-sm-12 col-lg-5 col-xl-5 col-xxl-3" id="lineWrap">
						<div id="chartTitle3">연도별 범죄 발생 수</div>
						<div id="lineBox">
							<canvas id="cYearChart"></canvas>
						</div>
					</div>
					<!--Arrest Line Chart-->
					<div class="col-sm-12 col-lg-5 col-xl-5 col-xxl-3" id="catchLineWrap">
						<div id="chartTitle4">범죄별 검거율</div>
						<div id="catchLineBox">
							<canvas id="catchYearChart"></canvas>
						</div>
					</div>
				</div>
			</div>
			<!--Chart end-->



			<div class="s_space"></div>


			<div class="container-fluid globalBox">
				<div class="global">
					<div class="globalTitle">세계 주요 국가와 비교하는 10만명당 범죄 발생 수</div>
					<button id="homiBtn">살인</button>
					<button id="robbBtn">강도</button>
					<button id="sexuBtn">성범죄</button>
					<button id="thefBtn">절도</button>
					<button id="violBtn">폭력</button>
					<canvas id="globalChart"></canvas>


				</div>


				<div class="s_space"></div>
			</div>


			<!--button tap-->
			<div id="yearBtnBox">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="yearOne" data-bs-toggle="tab" type="button" role="tab"
							aria-selected="true" value="y2021">
							<h4>2021</h4>
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="yearTwo" data-bs-toggle="tab" type="button" role="tab"
							aria-selected="false" value="y2022">
							<h4>2022</h4>
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link active" id="yearThree" data-bs-toggle="tab" type="button" role="tab"
							aria-selected="false" value="y2023">
							<h4>2023</h4>
						</button>
					</li>
				</ul>
			</div>
			<!--button tap end-->





			<!--Security Ranking Start-->
			<div class="container-fluid rankContainer">

				<div class="row" id="secuRank">
					<!--Public safety index ranking-->
					<div class="col-sm-12 col-lg-3 s_secuTitle">
						<p class="s_titleTop">사회안전지수 TOP5</p>
						<div class="row">

							<div class="s_rankTop col-lg-12">순위</div>
							<div class="s_guNameTop col-lg-12">지역구</div>
							<div class="group row">
								<div class="s_rank col-5">1위</div>
								<div id="sFirst" name="SIR1" class="s_guName col-7">중구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank col-5">2위</div>
								<div id="sSec" name="SIR2" class="s_guName col-7">종로구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank col-5">3위</div>
								<div id="sThird" name="SIR3" class="s_guName col-7">성동구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank col-5">4위</div>
								<div id="sFourth" name="SIR4" class="s_guName col-7">성북구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank col-5">5위</div>
								<div id="sFifth" name="SIR5" class="s_guName col-7">도봉구&nbsp;&nbsp;&nbsp;</div>
							</div>

						</div>
					</div>

					<!--Public Security Satisfying -->
					<div class="col-sm-12 col-lg-3 s_secuTitle">
						<p class="s_titleTop1">체감안전도&nbsp; TOP5</p>
						<div class="row">
							<div class="s_rankTop1 col-lg-12">순위</div>
							<div class="s_guNameTop1 col-lg-12">지역구</div>

							<div class="group row">
								<div class="s_rank1 col-5">1위</div>
								<div id="tFirst" class="s_guName1 col-7">서초구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank1 col-5">2위</div>
								<div id="tSec" class="s_guName1 col-7">송파구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank1 col-5">3위</div>
								<div id="tThird" class="s_guName1 col-7">성동구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank1 col-5">4위</div>
								<div id="tFourth" class="s_guName1 col-7">양천구&nbsp;&nbsp;&nbsp;</div>
							</div>
							<div class="group row">
								<div class="s_rank1 col-5">5위</div>
								<div id="tFifth" class="s_guName1 col-7">노원구&nbsp;&nbsp;&nbsp;</div>
							</div>
						</div>
					</div>

					<div class="col-sm-12 col-lg-5 secuContent">
						<br>
						<br>
						<h4>사회안전지수</h4>
						<br>
						<h6>
							성신여대 데이터 사이언스 센터, 여론조사기관 케이스탯리서치,<br>
							<br>온라인패널 조사기업 피앰아이와 공동으로
							<br>
							<br>'사회안전지수(Korea Security Index)'를 2021년부터 발표하고 있다.
							<br>
							<br>조사대상은 기초지방자치단체 중 표본의 숫자가 적은 곳을 제외한
							<br>
							<br>155개 시, 군, 구이며 매년 정기적으로 사회안전지수를 발표할 계획이다.
						</h6>
						<br>
						<h4>체감안전도</h4>
						<br>
						<h6>
							1년에 2번씩 각 지방청에서 전국 단위로 200여개<br>
							<br>경찰서 단위로 경찰서 당 200명씩 상,하반기에 체감안전도 설문조사
							<br>
							<br>전화, 모바일을 통해 설문조사를 실시하고 있으며,
							<br>
							<br> 범죄로부터 얼마나 안전한지 유형별로 분류하고있다.
						</h6>

						<div id="secuInfo">
							<div id="secuInfoText"></div>
							<div id="icbox">
								<canvas id="infoCanvas" height="300px"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>






			<!--sidebar-->
			<div id="sidebar">
				<a href="./Index.jsp" id="home" data-bs-toggle="tooltip" data-bs-placement="right" title="홈으로"
					data-bs-custom-class="custom-tooltip" class="fa fa-home"></a> <a href="#" id="upsideIcon"
					data-bs-toggle="tooltip" data-bs-placement="right" title="상단으로"
					data-bs-custom-class="custom-tooltip" class="fa-solid fa-chevron-up"></a>
				<a href="#chartBox" id="chartIcon" data-bs-toggle="tooltip" data-bs-placement="right" title="차트로 보는 서울"
					data-bs-custom-class="custom-tooltip" class="fa-solid fa-chart-simple"></a> <a href="#secuRank"
					id="rankIcon" data-bs-toggle="tooltip" data-bs-placement="right" title="사회 안전 지수"
					data-bs-custom-class="custom-tooltip" class="fa-solid fa-ranking-star"></a>
			</div>



			<!-- -------------- footer ---------------- -->
			<jsp:include page="./include/footer.jsp" />




			<!--javascript for kakao start-->
			<script type="text/javascript"
				src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b6db9027784dedc18bbafd22614168f8&libraries&libraries=services"></script>
			<!--javascript for kakao end-->
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
				crossorigin="anonymous"></script>
			<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
			<script src="./js/seoul_main.js"></script>
		</body>

		</html>