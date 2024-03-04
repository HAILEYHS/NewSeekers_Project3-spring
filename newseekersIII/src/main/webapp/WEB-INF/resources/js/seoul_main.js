
let level = "";
var polygons = [];
var areas = [];
var customOverlay2;
var paths = [];
var guGrade = [];
var guName;
var currentValue = 2022;
var btnValue;
var centerpoint = [];
var guCenterPoint;
var guNames = [];
var polygons2 = [];
var yearArrestArr = [];
let homicideYear = [];
let robberYear = [];
let sexualYear = [];
let theftYear = [];
let violenceYear = [];
let homiArRate = [];
let robArRate = [];
let sexArRate = [];
let thefArRate = [];
let violArRate = [];
let guGradeArr = [];
var cctvCount = [];
var lightCount = [];
var policeCount = [];
let crimeType = ["homicide", "robber", "sexcrime", "theft", "violence"]; // 범죄 유형
let Year = ["2004", "2007", "2010", "2013", "2016", "2019", "2022"]; // 범죄 발생연도
var gradeColors = [
    ["#f9ddb1", "#f5c77e", "#f1b04c", "#ee9f27", "#ec9006"], //2004년//
    ["#f7f5bc", "#fff172", "#ffe337", "#ffd000", "#ffb000"], //2007년//
    ["#e7ef9e", "#dde878", "#cfde3d", "#c2cc37", "#a09f28"], //2010년//
    ["#eeef20", "#d4d700", "#aacc00", "#80b918", "#55a630"], //2013년//
    ["#c0dfd3", "#9ccbb8", "#7cb69d", "#60a18b", "#578b74"], //2016년//
    ["#d8eaef", "#c0d5dd", "#acc8d7", "#88a9b7", "#537d90"], //2019년//
    ["#aaf2ef", "#75e9e5", "#00d5d6", "#00bdd0", "#00a0b7"],
];


(async () => {
    await fetchData();
    await ajaxArData();
    await secuFaciData();
    await guGradeData();
    await globalData();
    await readyToPolygon();
    await extractGuName();
    await guNamesSet();
    await displayAllArea();
    yearArrest(currentValue);
    chart1draw(currentValue);
    chart2draw(currentValue);
    chart3draw(currentValue);
    chart4draw(currentValue);

})();

// 자치구 연도별 치안등급 DB pull
async function guGradeData() {
    try {
        const response = await fetch("./callGuGrade.do");
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);

        jsonData.forEach(json => {

            guGradeArr.push([json["y2004"], json["y2007"], json["y2010"], json["y2013"], json["y2016"], json["y2019"], json["y2022"]]);

        });

        return guGradeArr;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}



// 세계 주요국 범죄 발생 수 API DB pull
async function globalData() {
    try {
        const response = await fetch("./callGlobal.do");
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);
        var korHomi = [], korRobb = [], korSexu = [], korThef = [], korViol = [];
        var gerHomi = [], gerRobb = [], gerSexu = [], gerThef = [], gerViol = [];
        var japHomi = [], japRobb = [], japSexu = [], japThef = [], japViol = [];
        var fraHomi = [], fraRobb = [], fraSexu = [], fraThef = [], fraViol = [];
        console.log(jsonData);

        jsonData.forEach(json => {
            if (json.name == "대한민국") {
                korHomi.push(json.homicide);
                korRobb.push(json.robber)
                korSexu.push(json.sexual)
                korThef.push(json.theft)
                korViol.push(json.violence)
            } else if (json.name == "독일") {
                gerHomi.push(json.homicide);
                gerRobb.push(json.robber)
                gerSexu.push(json.sexual)
                gerThef.push(json.theft)
                gerViol.push(json.violence)
            } else if (json.name == "일본") {
                japHomi.push(json.homicide);
                japRobb.push(json.robber)
                japSexu.push(json.sexual)
                japThef.push(json.theft)
                japViol.push(json.violence)
            } else if (json.name == "프랑스") {
                fraHomi.push(json.homicide);
                fraRobb.push(json.robber)
                fraSexu.push(json.sexual)
                fraThef.push(json.theft)
                fraViol.push(json.violence)
            }
        });
        var ctx = document.getElementById("globalChart").getContext("2d");
        var myChart4 = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
                datasets: [
                    {
                        label: "대한민국",
                        data: korHomi,
                        borderColor: '#03045e',
                        borderWidth: 5,
                        tension: 0.2
                    },
                    {
                        label: "독일",
                        data: gerHomi,
                        borderColor: "#0077b6",
                        borderWidth: 2,
                        tension: 0.2
                    },
                    {
                        label: "일본",
                        data: japHomi,
                        borderColor: "#00b4d8",
                        borderWidth: 2,
                        tension: 0.2
                    },
                    {
                        label: "프랑스",
                        data: fraHomi,
                        borderColor: "#90e0ef",
                        borderWidth: 2,
                        tension: 0.2
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
            },
        })

        document.getElementById('homiBtn').addEventListener('click', function () {
            myChart4.data.datasets[0].data = korHomi;
            myChart4.data.datasets[1].data = gerHomi;
            myChart4.data.datasets[2].data = japHomi;
            myChart4.data.datasets[3].data = fraHomi;
            myChart4.update();
        })
        document.getElementById('robbBtn').addEventListener('click', function () {
            myChart4.data.datasets[0].data = korRobb;
            myChart4.data.datasets[1].data = gerRobb;
            myChart4.data.datasets[2].data = japRobb;
            myChart4.data.datasets[3].data = fraRobb;
            myChart4.update();
        })
        document.getElementById('sexuBtn').addEventListener('click', function () {
            myChart4.data.datasets[0].data = korSexu;
            myChart4.data.datasets[1].data = gerSexu;
            myChart4.data.datasets[2].data = japSexu;
            myChart4.data.datasets[3].data = fraSexu;
            myChart4.update();
        })
        document.getElementById('thefBtn').addEventListener('click', function () {
            myChart4.data.datasets[0].data = korThef;
            myChart4.data.datasets[1].data = gerThef;
            myChart4.data.datasets[2].data = japThef;
            myChart4.data.datasets[3].data = fraThef;
            myChart4.update();
        })
        document.getElementById('violBtn').addEventListener('click', function () {
            myChart4.data.datasets[0].data = korViol;
            myChart4.data.datasets[1].data = gerViol;
            myChart4.data.datasets[2].data = japViol;
            myChart4.data.datasets[3].data = fraViol;
            myChart4.update();
        })



        return guGradeArr;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}





// 자치구 연도별 범죄발생 수 DB pull
async function fetchData() {
    try {
        const response = await fetch("./callCrime.do");
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);

        jsonData.forEach(json => {
            homicideYear.push(json.homicide);
            robberYear.push(json.robber);
            sexualYear.push(json.sexual);
            theftYear.push(json.theft);
            violenceYear.push(json.violence);
        });

        return homicideYear, robberYear, sexualYear, theftYear, violenceYear;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}

// 서울시 연도별 치안시설 수 DB pull
async function secuFaciData() {
    try {
        const response = await fetch("./secuFaci.do");
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);

        jsonData.forEach(json => {
            cctvCount.push(json.cctv);
            lightCount.push(json.lights);
            policeCount.push(json.policestation);
        });

        return cctvCount, lightCount, policeCount;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}

// 전체 범죄 검거율 DB pull
async function ajaxArData() {
    $.ajax({
        type: 'POST',
        url: "./callArrest.do",
        contentType: 'application/json',
        async: true,
        success: function (datas) {
            datas.myArrayList.forEach(array => {
                homiArRate.push(array.map.homiArRate);
                robArRate.push(array.map.robArRate);
                sexArRate.push(array.map.sexArRate);
                thefArRate.push(array.map.thefArRate);
                violArRate.push(array.map.violArRate);
            })

            return homiArRate, robArRate, sexArRate, thefArRate, violArRate;
        },
        error: function (status, error) {

            console.log(status + error);
        }
    });
    return homiArRate, robArRate, sexArRate, thefArRate, violArRate;
}

// 메인 카카오맵 단계구분도
var container = document.getElementById("s_map");
var options = {
    center: new kakao.maps.LatLng(37.5642135, 127.0016985),
    level: 9,
    disableDoubleClickZoom: true

};
var map = new kakao.maps.Map(container, options),
    customOverlay = new kakao.maps.CustomOverlay({}),
    customOverlay2 = new kakao.maps.CustomOverlay({}),
    infowindow = new kakao.maps.InfoWindow({ removable: true });
map.setDraggable(false);
map.setZoomable(false);


var locate = JSON.parse(JSON.stringify(mapData));
var units = locate.features; // json key값이 "features"인 것의 value를 통으로 가져온다.

// 카카오맵 폴리곤 json데이터 좌표 정리
function readyToPolygon() {
    units.forEach((element, index) => {
        var geo = element.geometry;
        var coord = geo.coordinates[0];
        guName = element.properties.SGG_NM;
        guGrade = guGradeArr[index]

        var path = [];
        var points = [];
        coord[0].forEach((point) => {
            centerPoint = new Object();
            centerPoint.x = point[1];
            centerPoint.y = point[0];
            points.push(centerPoint); // 1개 구의 좌표들

            path.push(new kakao.maps.LatLng(point[1], point[0]));

            function centroid(points) { // 중앙 좌표 계산
                var i, j, len, p1, p2, f, are, x, y;
                are = x = y = 0;
                for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
                    p1 = points[i];
                    p2 = points[j];
                    f = p1.y * p2.x - p2.y * p1.x;
                    x += (p1.x + p2.x) * f;
                    y += (p1.y + p2.y) * f;
                    are += f * 3;
                }
                return new kakao.maps.LatLng(x / are, y / are);
            }
            guCenterPoint = centroid(points);
        });
        var area = { guName, path, guGrade, guCenterPoint };
        paths.push(path);
        areas.push(area);
    });
    return paths, areas;
}

// 단계구분도 배경
backpoly();
function backpoly() {
    backgroundPath = [
        new kakao.maps.LatLng(39, 125.4),
        new kakao.maps.LatLng(39, 128.5),
        new kakao.maps.LatLng(36, 128.5),
        new kakao.maps.LatLng(36, 125.4),
    ];
    var backgroundPoly = new kakao.maps.Polygon({
        map: map,
        path: backgroundPath,
        strokeWeight: 2,
        strokeColor: "#fff5ee",
        strokeOpacity: 1,
        fillColor: "#fff5ee",
        fillOpacity: 1,
    });
    backgroundPoly.setMap(map);
}

// json 자치구 이름 추출
function extractGuName() {
    areas.forEach((point) => {
        var content = "<div id=guNameBox>" + point.guName + "</div>";

        var position = point.guCenterPoint;
        var temp = new kakao.maps.CustomOverlay({
            content: content,
            position: position,
        });
        guNames.push(temp);
    });
    return guNames;
}

// 폴리곤 제거 및 재생성
function displayAllArea() {
    deletePolygon(polygons);
    deletePolygon(polygons2);
    for (var i = 0, len = areas.length; i < len; i++) {
        displayArea(areas[i]);
    }

    guNamesReset();
    guNamesSet();
}

// 단계구분도 버튼 함수
function gradeSelec(buttonID) {
    var button = document.getElementById(buttonID);
    btnValue = button.value;
    deletePolygon(polygons);
    deletePolygon(polygons2);
    guNamesReset();

    for (var i = 0, len = areas.length; i < len; i++) {
        displayStroke(areas[i]);

        if (currentValue == 2004) {
            var j = 0;
        } else if (currentValue == 2007) {
            j = 1;
        } else if (currentValue == 2010) {
            j = 2;
        } else if (currentValue == 2013) {
            j = 3;
        } else if (currentValue == 2016) {
            j = 4;
        } else if (currentValue == 2019) {
            j = 5;
        } else if (currentValue == 2022) {
            j = 6;
        }

        if (areas[i].guGrade[j] == btnValue) {
            displayArea(areas[i]);

            guNames[i].setMap(map);
        }
    }
}


// 단계구분도 구 이름 삭제 및 생성 함수
function guNamesReset() {
    for (var i = 0; (len = guNames.length), i < len; i++) {
        guNames[i].setMap(null);
    }
}

function guNamesSet() {
    for (var i = 0; (len = guNames.length), i < len; i++) {
        guNames[i].setMap(map);
    }
}


// 단계구분도 버튼 클릭시 윤곽선 생성 함수
function displayStroke(area) {
    var polygon2 = new kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 1,
        strokeColor: "#004c80",
        strokeOpacity: 1,
        fillColor: "",
        fillOpacity: 0,
    });
    polygons2.push(polygon2);
}


// 단계구분도 기초좌표로부터 최초 생성
function displayArea(area) {
    var polygon = new kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 1,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor:
            gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
            area.guGrade[(parseInt(currentValue) - 2001) / 3 - 1] - 1
            ],
        fillOpacity: 0.7,
    });

    polygons.push(polygon);

    kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
        polygon.setOptions({ fillColor: "#00CED1" });
        customOverlay.setContent(
            '<div class="area">' +
            "<h5>" +
            area.guName +
            "</h5><br>" +
            "<h6>안전등급 : " +
            area.guGrade[(parseInt(currentValue) - 2001) / 3 - 1] +
            "</h6>" +
            "</div>"
        );
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
    });

    kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
        customOverlay.setPosition(mouseEvent.latLng);
    });

    kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({
            fillColor:
                gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
                area.guGrade[(parseInt(currentValue) - 2001) / 3 - 1] - 1
                ],
        });
        customOverlay.setMap(null);
    });

}


// 단계구분도 폴리곤 삭제
function deletePolygon(polygons) {
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
    }
    polygons = [];
}

var colorset = [
    ["#00456c", "#00588a", "#006ca7", "#0080c6", "#0092e0", "#00adf3", "#33baff"],
    ["#E8FC9D", "#D5F66C", "#C1ED47", "#A3E20F", "#85C20A", "#6AA207", "#518304"],
    ["#AFFEF4", "#86FEF8", "#68F7FD", "#37E5FC", "#28B6D8", "#1B8AB5", "#116492"],
    ["#FFEBB5", "#FFDD90", "#FFCF75", "#FFB847", "#DB9433", "#B77223", "#935416"],
    ["#FFC6B1", "#FFA08A", "#FF7C6D", "#FF403D", "#DB2C38", "#B71E36", "#931332"],
    ["#FFADF9", "#FE84FF", "#F266FF", "#DE33FF", "#AF25DB", "#8519B7", "#601093"],
    ["#FFEC67", "#FFE541", "#FFD902", "#DBB701", "#B79601", "#937600", "#7A6000"],
];


// 연도 선택에 따른 범죄 수 및 검거 수 배열 인덱싱
function yearCrime(currentValue) {
    return (crime = [
        homicideYear[(parseInt(currentValue) - 2001) / 3 - 1],
        robberYear[(parseInt(currentValue) - 2001) / 3 - 1],
        sexualYear[(parseInt(currentValue) - 2001) / 3 - 1],
        theftYear[(parseInt(currentValue) - 2001) / 3 - 1],
        violenceYear[(parseInt(currentValue) - 2001) / 3 - 1],
    ]);
}

function yearArrest(currentValue) {
    return (yearArrestArr = [
        homiArRate[(parseInt(currentValue) - 2001) / 3 - 1],
        robArRate[(parseInt(currentValue) - 2001) / 3 - 1],
        sexArRate[(parseInt(currentValue) - 2001) / 3 - 1],
        thefArRate[(parseInt(currentValue) - 2001) / 3 - 1],
        violArRate[(parseInt(currentValue) - 2001) / 3 - 1],
    ]);
}


// 차트 데이터 삭제 (업데이트용)
const removeData = (chart) => {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
        dataset.backgroundColor = [];
    });
    chart.update();
};

// 차트 데이터 추가 갱신 (업데이트용)
const addData = (chart, currentValue) => {
    removeData(chart);
    chart.data.labels = crimeType;
    chart.data.datasets.label = "crime";
    chart.data.datasets.forEach((dataset) => {
        dataset.data = yearCrime(currentValue);
        dataset.backgroundColor = colorset[(parseInt(currentValue) - 2001) / 3 - 1];
    });
    chart.update();
};

// 검거율 차트 데이터 갱신 (업데이트용)
const addArData = (chart, currentValue) => {
    removeData(chart);
    chart.data.labels = crimeType;
    chart.data.datasets.label = "crime";
    chart.data.datasets.forEach((dataset) => {
        dataset.data = yearArrest(currentValue);
        dataset.backgroundColor = colorset[(parseInt(currentValue) - 2001) / 3 - 1];
    });
    chart.update();
};


// 슬라이더 값에 따른 맵 단계구분도 구현
var slider = document.getElementById("slider");
// = slider.value;
slider.addEventListener("input", function () {
    currentValue = slider.value;
    // 타이틀에 연도 반영    
    document.querySelector("#s_title").innerHTML = currentValue + "년";
    document.getElementById("chartTitle1").innerHTML =
        currentValue + "년 범죄비율";
    document.getElementById("chartTitle2").innerHTML =
        currentValue + "년 범죄 발생수";
    //단계구분도 버튼 색상        
    document.getElementById("btn1").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn1").value - 1
        ];
    document.getElementById("btn2").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn2").value - 1
        ];
    document.getElementById("btn3").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn3").value - 1
        ];
    document.getElementById("btn4").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn4").value - 1
        ];
    document.getElementById("btn5").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn5").value - 1
        ];
    //CCTV 수
    document.getElementById("cctvNum").innerText =
        cctvCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("lightNum").innerText =
        lightCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("policeNum").innerText =
        policeCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    //치안시설물 제목
    document.getElementById("cctvNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
    document.getElementById("lightNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
    document.getElementById("policeNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
    //단계구분도 갱신
    displayAllArea();

    removeData(myChart1);
    addData(myChart1, currentValue);

    removeData(myChart2);
    addData(myChart2, currentValue);

    removeData(myChart4);
    addArData(myChart4, currentValue);
});

// 셀렉트박스 값에 따른 맵 단계구분도 구현 _ 내부내용 상동
var selectbox = document.querySelector("#selector");
selectbox.addEventListener("input", function () {
    currentValue = $("#selector option:selected").val();
    document.querySelector("#s_title").innerHTML = currentValue + "년";
    document.getElementById("chartTitle1").innerHTML =
        currentValue + "년 범죄비율";
    document.getElementById("chartTitle2").innerHTML =
        currentValue + "년 범죄 발생수";

    document.getElementById("btn1").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn1").value - 1
        ];
    document.getElementById("btn2").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn2").value - 1
        ];
    document.getElementById("btn3").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn3").value - 1
        ];
    document.getElementById("btn4").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn4").value - 1
        ];
    document.getElementById("btn5").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][
        document.getElementById("btn5").value - 1
        ];
    displayAllArea();

    removeData(myChart1);
    addData(myChart1, currentValue);

    removeData(myChart2);
    addData(myChart2, currentValue);

    removeData(myChart4);
    addArData(myChart4, currentValue);

    document.getElementById("cctvNum").innerText =
        cctvCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("lightNum").innerText =
        lightCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("policeNum").innerText =
        policeCount[(parseInt(currentValue) - 2001) / 3 - 1].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById("cctvNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
    document.getElementById("lightNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
    document.getElementById("policeNumHead").style.backgroundColor =
        gradeColors[(parseInt(currentValue) - 2001) / 3 - 1][0];
});

//창 폭에 따른 카카오맵 레벨 및 중심좌표 수정
// let delay = 300;
// let timer = null;
window.addEventListener("resize", function () {
    // clearTimeout(timer);
    // timer = setTimeout(function () {
    map.setCenter(new kakao.maps.LatLng(37.5642135, 127.0016985));
    if (1200 < window.innerWidth) {
        map.setLevel(9);
        const temp2 = document.querySelector("#btn1");
        temp2.innerHTML = "<h6>1등급</h6>";
        const temp3 = document.querySelector("#btn2");
        temp3.innerHTML = "<h6>2등급</h6>";
        const temp4 = document.querySelector("#btn3");
        temp4.innerHTML = "<h6>3등급</h6>";
        const temp5 = document.querySelector("#btn4");
        temp5.innerHTML = "<h6>4등급</h6>";
        const temp6 = document.querySelector("#btn5");
        temp6.innerHTML = "<h6>5등급</h6>";
        const temp7 = document.querySelector("#btn6");
        temp7.innerHTML = "<h6>전체등급</h6>";
        document.getElementById("s_map").style.height = "40vw";
    } else if (768 < window.innerWidth && window.innerWidth <= 1200) {
        map.setLevel(9);
        const temp2 = document.querySelector("#btn1");
        temp2.innerHTML = "<h6>1등급</h6>";
        const temp3 = document.querySelector("#btn2");
        temp3.innerHTML = "<h6>2등급</h6>";
        const temp4 = document.querySelector("#btn3");
        temp4.innerHTML = "<h6>3등급</h6>";
        const temp5 = document.querySelector("#btn4");
        temp5.innerHTML = "<h6>4등급</h6>";
        const temp6 = document.querySelector("#btn5");
        temp6.innerHTML = "<h6>5등급</h6>";
        const temp7 = document.querySelector("#btn6");
        temp7.innerHTML = "<h6>전체등급</h6>";
        document.getElementById("s_map").style.height = "60vw";
        document.getElementById("s_grade").style.marginTop = "0px";
    } else if (window.innerWidth <= 768) {
        map.setLevel(10);
        const temp2 = document.querySelector("#btn1");
        temp2.innerHTML = "<h4>1</h4>";
        const temp3 = document.querySelector("#btn2");
        temp3.innerHTML = "<h4>2</h4>";
        const temp4 = document.querySelector("#btn3");
        temp4.innerHTML = "<h4>3</h4>";
        const temp5 = document.querySelector("#btn4");
        temp5.innerHTML = "<h4>4</h4>";
        const temp6 = document.querySelector("#btn5");
        temp6.innerHTML = "<h4>5</h4>";
        const temp7 = document.querySelector("#btn6");
        temp7.innerHTML = "<h4>전체</h4>";
        document.getElementById("s_map").style.height = "75vw";
        document.getElementById("s_grade").style.marginTop = "0px";
    }
    // }, delay);
});

//범죄비율 도넛그래프
function chart1draw(currentValue) {
    var ctx = document.getElementById("cRateChart").getContext("2d");
    myChart1 = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: crimeType,
            datasets: [
                {
                    label: "Crime Rate",
                    data: yearCrime(currentValue),
                    backgroundColor: colorset[(parseInt(currentValue) - 2001) / 3 - 1],
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
        },
    });
}

//범죄발생수 막대그래프
function chart2draw(currentValue) {
    var ctx = document.getElementById("cNumChart").getContext("2d");
    myChart2 = new Chart(ctx, {
        type: "bar",
        data: {
            labels: crimeType,
            datasets: [
                {
                    label: "Number of Crime",
                    data: yearCrime(currentValue),
                    backgroundColor: colorset[(parseInt(currentValue) - 2001) / 3 - 1],
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
        },
    });
}

//연도별 범죄 발생 수 그래프
function chart3draw(currentValue) {
    var ctx = document.getElementById("cYearChart").getContext("2d");

    myChart3 = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["2004", "2007", "2010", "2013", "2016", "2019", "2022"],
            datasets: [
                {
                    label: "Homicide",
                    data: homicideYear,
                    borderColor: "darkorange",
                    borderWidth: 3,
                },
                {
                    label: "Robber",
                    data: robberYear,
                    borderColor: "blue",
                    borderWidth: 3,
                },
                {
                    label: "SexCrime",
                    data: sexualYear,
                    borderColor: "green",
                    borderWidth: 3,
                },
                {
                    label: "Theft",
                    data: theftYear,
                    borderColor: "navy",
                    borderWidth: 3,
                },
                {
                    label: "Violence",
                    data: violenceYear,
                    borderColor: "skyblue",
                    borderWidth: 3,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
        },
    });
}

// 연도별 검거율 그래프
function chart4draw(currentValue) {
    var ctx = document.getElementById("catchYearChart").getContext("2d");
    myChart4 = new Chart(ctx, {
        type: "line",
        data: {
            labels: crimeType,
            datasets: [
                {
                    label: "CatchRate",
                    data: yearArrest(currentValue),
                    borderColor: "rgba(16,163,127,1)",
                    backgroundColor: "rgba(16,163,127,0.2)",
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4,
                },
            ],
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
        },
    });
}

// 치안만족도 및 사회안전지수 이펙트 구현부
let observer = new IntersectionObserver((e) => {
    e.forEach((content) => {
        if (content.isIntersecting) {
            content.target.style.opacity = 1;
        }
    });
});
let img = document.querySelectorAll("#secuRank");
observer.observe(img[0]); // html요소 감시

const modal1 = document.getElementById("modalContainer1");
const icon1 = document.getElementById("question1");
const modal2 = document.getElementById("modalContainer2");
const icon2 = document.getElementById("question2");

icon1.addEventListener("mouseover", () => {
    modal1.classList.remove("hidden");
});

icon1.addEventListener("mouseout", () => {
    modal1.classList.add("hidden");
});
icon2.addEventListener("mouseover", () => {
    modal2.classList.remove("hidden");
});

icon2.addEventListener("mouseout", () => {
    modal2.classList.add("hidden");
});


//사이드바 구현부
const sidebar = document.getElementById("sidebar");
const homeIcon = document.getElementById("home");
const chartIcon = document.getElementById("chartIcon");
const rankIcon = document.getElementById("rankIcon");
const upIcon = document.getElementById("upsideIcon");

sidebar.addEventListener("mouseleave", function () {

    // 아이콘 원래대로 변경
    homeIcon.className = "fa fa-home";
    chartIcon.className = "fa-solid fa-chart-simple";
    rankIcon.className = "fa-solid fa-ranking-star";
    upIcon.className = "fa-solid fa-chevron-up";
});

// 슬라이드바가 펼쳐질 때 아이콘 변경
sidebar.addEventListener("mouseenter", function () {
    homeIcon.className = "fa-solid fa-house-user";
    chartIcon.className = "fa-solid fa-chart-pie";
    rankIcon.className = "fa-solid fa-award";
    upIcon.className = "fa-solid fa-arrow-up";
});

(function () {
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
})();



// 치안만족도 및 사회안전지수 DB데이터 pulling

async function secuIndex(year) {
    let indexYear = document.getElementById(year).value;
    try {
        const response = await fetch("./secuIndex.do?year=" + indexYear);
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);

        document.getElementById("sFirst").innerText = jsonData[0].guName;
        document.getElementById("sSec").innerText = jsonData[1].guName;
        document.getElementById("sThird").innerText = jsonData[2].guName;
        document.getElementById("sFourth").innerText = jsonData[3].guName;
        document.getElementById("sFifth").innerText = jsonData[4].guName;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}

async function safety(year) {
    let indexYear = document.getElementById(year).value;
    try {
        const response = await fetch("./safety.do?year=" + indexYear);
        const jsonArray = await response.text();
        const jsonData = JSON.parse(jsonArray);

        document.getElementById("tFirst").innerText = jsonData[0].guName;
        document.getElementById("tSec").innerText = jsonData[1].guName;
        document.getElementById("tThird").innerText = jsonData[2].guName;
        document.getElementById("tFourth").innerText = jsonData[3].guName;
        document.getElementById("tFifth").innerText = jsonData[4].guName;
    } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
    }
}
document.getElementById("yearOne").addEventListener("click", function () {
    let year = "yearOne"
    secuIndex(year);
    safety(year);
});

document.getElementById("yearTwo").addEventListener("click", function () {
    let year = "yearTwo";
    secuIndex(year);
    safety(year);
});

document.getElementById("yearThree").addEventListener("click", function () {
    let year = "yearThree"
    secuIndex(year);
    safety(year);
});



function secuInfoChart(guname, secuValue) {
    var ctx = document.getElementById("infoCanvas").getContext('2d');
    infoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: guname,
            datasets: [{
                label: 'SecuIndex Score',
                data: secuValue,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',

        }
    });
}

let guname = [];
let secuValue = [];
var secuRanks = document.querySelectorAll('.s_guName')
secuInfoChart(guname, secuValue)
document.addEventListener("DOMContentLoaded", function () {
    secuRanks.forEach(secuRank => {
        secuRank.addEventListener("mouseover", async function (e) {
            document.getElementById('secuInfo').style.display = 'block';
            document.getElementById('secuInfoText').innerText = secuRank.textContent.trim();

            var activeTabButton = document.querySelector('.nav-tabs .nav-link.active');
            var selectedYearValue = activeTabButton.getAttribute('value');
            const response = await fetch("./secuInfo.do?year=" + selectedYearValue);
            const jsonArray = await response.text();
            const jsonData = JSON.parse(jsonArray);

            jsonData.forEach(json => {
                guname.push(json["guName"]);
                secuValue.push(json["secuValue"]);
            });

            if (infoChart.data.datasets[0].data[0] != 65.63) {
                infoChart.data.datasets[0].backgroundColor = ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)'];
                infoChart.data.datasets[0].borderColor = 'rgba(75, 192, 192, 1)';
                infoChart.update();
            }
            infoChart.data.datasets[0].backgroundColor[guname.indexOf(secuRank.textContent.trim())] = 'rbga(173, 216, 230, 0.2)';
            infoChart.data.labels = guname;
            infoChart.data.datasets[0].data = secuValue;
            infoChart.update();

            document.getElementById('secuInfo').style.left = e.clientX + 20 + 'px';
            document.getElementById('secuInfo').style.top = e.clientY - 220 + 'px';
        })
        secuRank.addEventListener("mousemove", function (e) {
            document.getElementById('secuInfo').style.left = e.clientX + 20 + 'px';
            document.getElementById('secuInfo').style.top = e.clientY - 220 + 'px';
        })
        secuRank.addEventListener("mouseout", function (e) {
            guname = [];
            secuValue = [];
            infoChart.data.datasets[0].backgroundColor = ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)'];
            infoChart.update();
            document.getElementById('secuInfo').style.display = 'none';

        })

        secuRank.addEventListener("click", function () {
            window.location.href = './gu_page.jsp';
        })
    })

});




let guname2 = [];
let secuValue2 = [];
var secuRanks2 = document.querySelectorAll('.s_guName1')

document.addEventListener("DOMContentLoaded", function () {
    secuRanks2.forEach(secuRank2 => {
        secuRank2.addEventListener("mouseover", async function (e) {
            document.getElementById('secuInfo').style.display = 'block';
            document.getElementById('secuInfoText').innerText = secuRank2.textContent.trim();

            var activeTabButton = document.querySelector('.nav-tabs .nav-link.active');
            var selectedYearValue = activeTabButton.getAttribute('value');
            const response = await fetch("./perceivedSecuInfo.do?year=" + selectedYearValue);
            const jsonArray = await response.text();
            const jsonData = JSON.parse(jsonArray);

            jsonData.forEach(json => {
                guname2.push(json["guName"]);
                secuValue2.push(json["secuValue"]);
            });

            if (infoChart.data.datasets[0].data[0] != 81.6) {
                infoChart.data.datasets[0].backgroundColor = ['rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)'];
                infoChart.data.datasets[0].borderColor = 'rgba(144,238,144,1)';
                infoChart.update();
            }

            infoChart.data.datasets[0].backgroundColor[guname2.indexOf(secuRank2.textContent.trim())] = 'rbga(50,205,50,0.2)';
            infoChart.data.datasets[0].data = secuValue2;
            infoChart.data.labels = guname2;
            infoChart.update();

            document.getElementById('secuInfo').style.left = e.clientX + 20 + 'px';
            document.getElementById('secuInfo').style.top = e.clientY - 220 + 'px';
        })
        secuRank2.addEventListener("mousemove", function (e) {
            document.getElementById('secuInfo').style.left = e.clientX + 20 + 'px';
            document.getElementById('secuInfo').style.top = e.clientY - 220 + 'px';
        })
        secuRank2.addEventListener("mouseout", function (e) {
            guname2 = [];
            secuValue2 = [];
            infoChart.data.datasets[0].backgroundColor = ['rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)', 'rgba(144,238,144,0.2)'];
            infoChart.data.datasets[0].borderColor = 'rgba(144,238,144,1)';
            infoChart.update();
            document.getElementById('secuInfo').style.display = 'none';

        })

        secuRank2.addEventListener("click", function () {
            window.location.href = './gu_page.jsp';
        })

    })

});


