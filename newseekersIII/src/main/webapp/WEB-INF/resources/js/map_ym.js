
//call the kakao map
map = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(37.514575, 127.0495556),
    level: 6,
    minLevel: 2,
    maxLevel: 8,
    disableDoubleClickZoom: true
});



map.setZoomable(false);

function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}


// call the cctv json
var cctvjson = JSON.parse(JSON.stringify(mapData3));
var cctvSet = cctvjson.features;
var cctvs = [];
cctvSet.forEach(element => {
    cctvAddr = element.Address;
    cctvNum = element.CameraCount;
    cctvLat = element.WGS84Latitude;
    cctvLon = element.WGS84Longitude;

    var oneCctv = { cctvAddr, cctvNum, cctvLat, cctvLon }
    cctvs.push(oneCctv);
})

var nearcctvmarkers = [];
var nearcctvs = [];
function shownearcctv(latLng) {
    nearcctvs = [];
    var line;

    cctvs.forEach(element => {
        if (element.cctvLon < latLng.La + 0.0045 & element.cctvLon > latLng.La - 0.0045) {
            line = new kakao.maps.Polyline({
                path: [
                    new kakao.maps.LatLng(element.cctvLat, element.cctvLon),
                    new kakao.maps.LatLng(latLng.Ma, latLng.La)
                ],
                strokeWeight: 1,
                strokeColor: '#fff',
                strokeOpacity: 1,
                strokeStyle: 'solid'
            });
            var linelength = Math.round(line.getLength());
            if (linelength < 500) { nearcctvs.push(element) }
        }
    })
    for (var i = 0; i < nearcctvs.length; i++) {
        var imageSrc = "../img/cctv2.png";
        var imageSize = new kakao.maps.Size(32, 37);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(nearcctvs[i].cctvLat, nearcctvs[i].cctvLon),
            title: '수량' + nearcctvs[i].cctvNum + '대',
            image: markerImage,
            opacity: 1,
            zIndex: 1
        });
        nearcctvmarkers.push(marker);
    }

}

//remove cctvmarker
function delcctvmarkers() {
    for (var i = 0; i < nearcctvmarkers.length; i++) {
        nearcctvmarkers[i].setMap(null);
    }
    nearcctvmarkers = [];
}

// call the park json
var parkjson = JSON.parse(JSON.stringify(mapData));
var units = parkjson.DATA;
var parks = [];
var circle;

units.forEach(element => {

    adminName = element.p_name;
    addr = element.p_addr;
    gu = element.p_zone;
    phoneNumber = element.p_admintel;
    content = element.p_list_content;
    pName = element.p_park;
    // visitRoad = element.visit_road;
    useRefer = element.use_refer;
    latitude = element.latitude;
    longitude = element.longitude;
    kakaoposition = new kakao.maps.LatLng(latitude, longitude)

    var onePark = { adminName, addr, gu, phoneNumber, content, pName, useRefer, latitude, longitude, kakaoposition }
    parks.push(onePark);
})


var policejson = JSON.parse(JSON.stringify(mapData2));
var dataSet = policejson.features;
var policeOffice = [];
let dist;
var nearpolice = [];
var nearpolimarker = [];
var distanceOverlay;
var guNameOverlay;
// pre setup json data
for (var i = 0; i < dataSet.length; i++) {
    if (dataSet[i].properties.h1 === "서울" && dataSet[i].properties.success === true)
        policeOffice.push(dataSet[i].properties);
}

//police marker
function polimarker(latLng) {
    nearpolice = [];
    var line;
    policeOffice.forEach(element => {
        line = new kakao.maps.Polyline({
            path: [
                new kakao.maps.LatLng(element.lat, element.lng),
                new kakao.maps.LatLng(latLng.Ma, latLng.La)
            ],
            strokeWeight: 1,
            strokeColor: '#fff',
            strokeOpacity: 1,
            strokeStyle: 'solid'
        });
        var linelength = Math.round(line.getLength());
        if (linelength < 1700) { nearpolice.push(element) }
    })
    for (var i = 0; i < nearpolice.length; i++) {
        var imageSrc = "../img/police_office_icon.png";
        var imageSize = new kakao.maps.Size(32, 37);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(nearpolice[i].lat, nearpolice[i].lng),
            title: nearpolice[i].bm[0] + ' (' + nearpolice[i].address + ')',
            image: markerImage,
            opacity: 1,
            zIndex: 1
        });
        nearpolimarker.push(marker);
    }
}

// remove police marker
function deletemarker() {
    for (var i = 0; i < nearpolimarker.length; i++) {
        nearpolimarker[i].setMap(null);
    }
    nearpolimarker = [];
}


// changing address from coordinates
var geocoder = new kakao.maps.services.Geocoder();
var marker = new kakao.maps.Marker({
    clickable: true
})
var parkMarkers = [];



// click event on the map
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    deletemarker();
    delcctvmarkers();
    deleteCircle();
    deleteInnerCircle();
    var content;
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            detailAddr = result[0].address.region_2depth_name
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
            createMarkers(result[0].address.region_2depth_name);
            content = '<div class ="label2"><span class="center">' + detailAddr + '</span></div>';
            var position = mouseEvent.latLng;
            delGuName();
            showGuName(content, position);
        }
    });


});


// call address
function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}
function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}


/**----------------circle start------------------**/
circles = [];
function drawingCircle(parkmarker) {
    circle = new kakao.maps.Circle({
        center: parkmarker.getPosition(),
        radius: 1700, // m radius
        strokeWeight: 4,
        strokeColor: '#00ffff',
        strokeOpacity: 0.4,
        strokeStyle: 'dashed',
        fillColor: '#1e90ff',
        fillOpacity: 0.2
    });

    circles.push(circle);
    circle.setMap(map);

    kakao.maps.event.addListener(circle, 'mouseover', function (mouseEvent) {
        var position = mouseEvent.latLng;
        var radius = Math.round(circle.getRadius());
        var content = '<div class ="label"><span class="center">' + radius + '</span></div>';
        showDistance(content, position);
    })

    kakao.maps.event.addListener(circle, 'mousemove', function (mouseEvent) {
        var position = mouseEvent.latLng;
        var radius = Math.round(circle.getRadius());
        var content = '<div class ="label"><span class="center">반경: ' + radius + 'm</span></div>';
        showDistance(content, position);
    })

    let delay = 300;
    let timer = null;
    kakao.maps.event.addListener(circle, 'mousemove', function (mouseEvent) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            deleteDistnce();
        }, delay);
    })
}

function deleteCircle() {
    circles.forEach(element => {
        element.setMap(null)
    })
}

innerCircles = [];
function drawingInnerCircle(parkmarker) {
    innerCircle = new kakao.maps.Circle({
        center: parkmarker.getPosition(),
        radius: 500,
        strokeWeight: 4,
        strokeColor: '#ffffff',
        strokeOpacity: 0.4,
        strokeStyle: 'dashed',
        fillColor: '#ffffff',
        fillOpacity: 0.6
    });

    innerCircles.push(innerCircle);
    innerCircle.setMap(map);

    kakao.maps.event.addListener(innerCircle, 'mouseover', function (mouseEvent) {
        var position = mouseEvent.latLng;
        var radius = Math.round(innerCircle.getRadius());
        var content = '<div class ="label"><span class="left"></span><span class="center">' + radius + '</span><span class="right"></span></div>';
        showDistance(content, position);
    })

    kakao.maps.event.addListener(innerCircle, 'mousemove', function (mouseEvent) {
        var position = mouseEvent.latLng;
        var radius = Math.round(innerCircle.getRadius());
        var content = '<div class ="label"><span class="center">반경: ' + radius + 'm</span></div>';
        showDistance(content, position);
    })

    let delay = 300;
    let timer = null;
    kakao.maps.event.addListener(innerCircle, 'mousemove', function (mouseEvent) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            deleteDistnce();
        }, delay);
    })
}

//delete innercicle
function deleteInnerCircle() {
    innerCircles.forEach(element => {
        element.setMap(null)
    })
}

//disapear circle innercicle radius
function deleteDistnce() {
    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }
}

//show circle innercircle radius
function showDistance(content, position) {
    if (distanceOverlay) {
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
    } else {
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map,
            content: content,
            position: position,
            xAnchor: 0,
            yAnchor: 1,
            zIndex: 3
        });
    }
}

//disapear circle innercicle radius
function delGuName() {
    if (guNameOverlay) {
        guNameOverlay.setMap(null);
        guNameOverlay = null;
    }
}




function showGuName(content, position) {
    if (guNameOverlay) {
        guNameOverlay.setPosition(position);
        guNameOverlay.setContent(content);
    } else {
        guNameOverlay = new kakao.maps.CustomOverlay({
            map: map,
            content: content,
            position: position,
            xAnchor: .5,
            yAnchor: 3,
            zIndex: 3
        });
    }
}


/**----------------circle end------------------**/



/**----------------park marker start------------------**/
var markerImageSrc = "../img/parkMarker.png";
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
}
function createMarker(onePark, image) {
    var parkmarker = new kakao.maps.Marker({
        position: onePark.kakaoposition,
        image: image,
        title: onePark.pName,
    });

    kakao.maps.event.addListener(parkmarker, 'click', function () {




        deleteCircle();
        drawingCircle(parkmarker);

        deleteInnerCircle();
        drawingInnerCircle(parkmarker);

        var parkcoord = parkmarker.getPosition();
        deletemarker();
        polimarker(parkcoord);

        delcctvmarkers();
        shownearcctv(parkcoord);



        document.getElementById('p_park').innerText = onePark.pName;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
        document.getElementById('p_name').innerText = onePark.adminName;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
        document.getElementById('p_admintel').innerText = onePark.phoneNumber;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
        document.getElementById('p_list_content').innerText = onePark.content;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
        document.getElementById('use_refer').innerText = onePark.useRefer;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
        // document.getElementById('visit_road').innerText = onePark.visitRoad;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능





        document.getElementById('park_police').innerText = nearpolimarker.length;
        document.getElementById('park_cctv').innerText = nearcctvmarkers.length;








    })
    return parkmarker;
}

function createMarkers(region) {
    for (var i = 0; i < parkMarkers.length; i++) {
        parkMarkers[i].setMap(null);
    } parkMarkers = [];

    for (var i = 0; i < parks.length; i++) {
        if (parks[i].addr.includes(region)) {
            var imageSize = new kakao.maps.Size(30, 35)
            var markerImage = createMarkerImage(markerImageSrc, imageSize),
                parkmarker = createMarker(parks[i], markerImage);
            parkMarkers.push(parkmarker);
        }
    } setMarkers();
}

function setMarkers() {
    for (var i = 0; i < parkMarkers.length; i++) {
        parkMarkers[i].setMap(map);
    }
}

/**----------------park marker end------------------**/
