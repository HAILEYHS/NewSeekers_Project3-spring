<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NewSeekers</title>
<!-- -------------- css ---------------- -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="<c:url value='./css/index.css'/>">
<link rel="stylesheet" href="<c:url value='./css/header.footer.css'/>">
	<link rel="stylesheet" href="<c:url value='./css/animate.css'/>">
	<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/di
st/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
    
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
            <!-- 부트스트랩에 필요한 jQuery -->
      
</head>

<body>
    <!-- 상단바 -->
	<jsp:include page="./include/nav.jsp" />
   
    <!-- 캐러셀 -->
    <div id="carousel1" class="carousel carousel slide"
		data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel1"
				data-bs-slide-to="0" class="active" aria-current="true"
				aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel1"
				data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carousel1"
				data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="2000">
                <img src="<c:url value='./img/carousel1.jpg'/>" class="d-block w-100"
					alt="...">
                <a href="./seoul_main.jsp"><button type="button"
						class="btn1 btn-outline-dark"> 바로가기 </button></a>

            </div>
            <div class="carousel-item">
                <img src="<c:url value='./img/carousel2.jpg'/>" class="d-block w-100"
					alt="...">
                <a href="./gu_page.jsp"><button type="button"
						class="btn1 btn-outline-dark"> 바로가기 </button></a>

            </div>
            <div class="carousel-item">
                <img src="<c:url value='./img/carousel3.jpg'/>" class="d-block w-100"
					alt="...">
                <a href="./preview.jsp"><button type="button"
						class="btn3 btn-outline-dark"> 바로가기</button></a>
            </div>
        </div>
        <button class="carousel-control-prev" type="button"
			data-bs-target="#carousel1" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button"
			data-bs-target="#carousel1" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
	<!-- content -->
    <div class="intro container mt-5 mb-5">
        <div class="row">
            <div class="intro1 col-md-6 px-5">
                <h4 class="mb-4">
					<br>우리 사이트에서는<br>서울의 사회안전지수에 대해 알려드립니다.
				</h4>
                <p class="container_ment mb-4">
                    자치구별 치안 시설물과 범죄 • 검거 비율을<br>한눈에 볼 수 있게 시각적으로 제공합니다.
                
				</p>
				<a href="./seoul_main.jsp">
                    <img class="img-fluid mb-4" src="<c:url value='./img/siteimg.png'/>"
					alt="">
				</a>
            </div>
            <div class="intro2 col-md-6 px-5">
                <h4 class="mb-4">
					<br>고객의견<br>
				</h4>
                <p class="container_ment mb-4">사용 고객에게 필요한 정보를 제공합니다.<br>시민들께서는 생활안전 정보를 활용해서 안전한 하루를 보내세요!
				</p>
                <div class="row">
                    <div class="table-responsive">

                        <div id="j_board_list">

                                <table id="board-table"
								class=" table table-bordered table-condensed table-hover">
                                <thead>
                                    <tr class="success">
                                        <th class="num"><a
											href="/newseekers/board/list?page=1">No</a></th>
                                        <th class="title"><a
											href="/newseekers/board/list?page=1">제목</a></th>
                                        <th class="writer"><a
											href="/newseekers/board/list?page=1">작성자</a></th>
                                        <th class="date"><a
											href="/newseekers/board/list?page=1">작성일</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                	<c:forEach items="${indexList}" var="dto">
                                		<tr>
                                			<td>${dto.community_num}</td>
                                			<td>${dto.title}</td>
                                			<td>${dto.user_Id}</td>
                                			<td>${dto.date_created}</td>
                                		</tr>
                                	</c:forEach>
                                </tbody>
                            </table>
                            <br>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- One -->

    <div id="one" class="container-fluid wow fadeInUp">
        <div id="one_ment">
            도심 속 생태공원.<br>
            안심하고 산책할 수 있는 걷기좋은 공원들을 소개해드려요!
        
		</div>


        <div id="site" class="row">
            <div id="recommend_site1"
				class="col-lg-12  col-xl-12 col-xxl-7 row">

                <div class="recommend col-lg-2">
                    <div id="recommend_img1"></div>
                    <div class="menu">
                        <div>
                            <p>시를 읽으며 산책할 수 있는 시비 광장</p>
                            <p>맨발로 걷기 좋은 공원.</p>
                        </div>
                              <button type="button" class="btn">
							<a href="./gu_page.jsp?region=강남구">[ 강남구 ] 청담근린공원
                            </a>
						</button>
                    </div>
                </div>

                <div class="recommend col-lg-2">
                    <div id="recommend_img2"></div>
                    <div class="menu">
                        <div>
                            <p>시원스러운 음악분수와 맞은편에<br>개울이 조성<br>과거 OB 맥주 영등포공장 부지.
							</p>
                        </div>
                            <button type="button" class="btn">
							<a href="./gu_page.jsp?region=영등포구">[ 영등포구 ] 영등포 공원
                            </a>
						</button>
                    </div>
                </div>

                <div class="recommend col-lg-2">
                    <div id="recommend_img3"></div>
                    <div class="menu">
                        <div>
                            <p>서울시에서는 서울의 우수한 경관을<br>알리자는 취지로<br>선정한 우수 경관 조망 명소 50개소 중의 한 곳.</p>
                        </div>
							<button type="button" class="btn">
							<a href="./gu_page.jsp?region=송파구">[ 송파구 ] 석촌 호수 공원
                            </a>
						</button>
                    </div>
                </div>
            </div>

            <div id="recomend_site2"
				class="col-lg-12 col-xl-12 col-xxl-5 row">
                <div class="recommend col-lg-4">
                    <div id="recommend_img4"></div>
                    <div class="menu">
                        <div>
                            <p>서울숲은 네 가지의 특색 있는 공간들로<br>구성되어 있으며,<br>
                            	한강과 맞닿아 있어<br>다양한 문화여가공간을 제공</p>
                        </div>
                        <button type="button" class="btn">
							<a href="./gu_page.jsp?region=성동구">[ 성동구 ] 서울 숲 공원
                            </a>
						</button>
                    </div>
                </div>

                <div class="recommend col-lg-4">
                    <div id="recommend_img5"></div>
                    <div class="menu">
                        <div>
                            <p>오동공원은 수림이 잘 형성되어 있어 인근 주택단지에 주거하고 있는 <br>
                            	주민들의 휴식과 운동장소로 이용</p>
                        </div>
                        <button type="button" class="btn">
							<a href="./gu_page.jsp?region=강북구">[ 강북구 ] 오동 공원
                            </a>
						</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

    <div id="safety" class="container-fluid">
        <div class="safe_ment">
            우리는 작은 습관으로<br>
            큰 문제를 해결할 수 있습니다.
        
		</div>
        <div id="safetyMenu">
            <div id="safetyMenu1">
                <div class="wow fadeInUp" data-wow-delay="0.3s">
                    <div class="icon">
						<img src="<c:url value='./img/icon1.PNG'/>" alt="">
					</div>
                    <div class="icon_ment1">문단속, 창문단속</div>
                    <div class="icon_ment2">침입으로 인한 강도범죄<br>대부분은 깜빡하고 나온<br>문을 통해 이루어집니다.<br> 단순하지만 문을
                        잠두었는지<br>확인하는것만으로도<br>피해를 예방할 수 있습니다.
                    
					</div>
                </div>
                <div class="wow fadeInUp" data-wow-delay="0.8s">
                    <div class="icon">
						<img src="<c:url value='./img/icon2.PNG'/>" alt="">
					</div>
                    <div class="icon_ment1">어두운 길피하기</div>
                    <div class="icon_ment2">어두운 밤,<br>시야가 확보되지않은 상황에<br>어두운 길을 걷는것은 위험합니다.<br>가로등이나 밝은 상가가<br>많은 거리를
                        걷는것이<br>안전에 도움이 됩니다. 
					</div>
                </div>
            </div>
            <div id="safetyMenu2">
                <div class="wow fadeInUp" data-wow-delay="1.3s">
                    <div class="icon">
						<img src="<c:url value='./img/icon3.PNG'/>" alt="">
					</div>
                    <div class="icon_ment1">걸어다닐때<br> 핸드폰하지않기
					</div>
                    <div class="icon_ment2"> 생활의 편리를 제공해주는<br>스마트 폰이지만<br>안전사고로<br>위험해 질 수 있는 스마트폰!<br>보행중에는 스마트폰을
                        사용을<br>지양시길
                        당부드립니다.
                    
					</div>
                </div>
                <div class="wow fadeInUp" data-wow-delay="1.8s">
                    <div class="icon">
						<img src="<c:url value='./img/icon4.PNG'/>" alt="">
					</div>
                    <div class="icon_ment1">우리집 주변의<br>치안시설<br> 인지하고 있기
					</div>
                    <div class="icon_ment2">주변의 경찰서, cctv 위치,<br>안심벨 위치 등을 알고있음으로<br>안전에 유의할 수 있습니다.
                    
					</div>
                </div>
            </div>
        </div>
    </div>


<!-- -------------- footer ---------------- -->
<jsp:include page="./include/footer.jsp" />

<!-- -------------- script ---------------- -->
    <script
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
		integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
		crossorigin="anonymous"></script>
    <script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
		integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
		crossorigin="anonymous"></script>
        <SCRIPT type="./js/index.js"></SCRIPT>
    <script src="<c:url value='./js/wow.min.js'/>"></script>
	<script>
		new WOW().init();
	</script>
</body>

</html>