
var guName;
var guNameValue= "강남구";
var arrestdata;
var safetyChart;
var year ="y2023";
window.onload = function () {


function fetchDataAndProcess(url, callback) {
   guName = document.getElementById("selectbox");
   guNameValue = guName.options[guName.selectedIndex].value;

  fetch(url+'?guNameValue=' + guNameValue)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
	
    callback(data);
  })
  .catch(error => {
    console.error("Fetch error: " + error);
  });
}


//fetchDataAndProcess 함수 사용
//검거비율 그래프
fetchDataAndProcess('getArRate', function(data) {
  const ar_rateDatas = data.map(item => item.ar_rate);
  ar_rateChart(ar_rateDatas);
});
//자치구 랭크, 자치구 인구 수
fetchDataAndProcess('getPopulation', function(data) {
  if (data.gu_secugrade !== undefined) {
    document.getElementById("gu_rank").innerHTML = data.gu_secugrade;
    document.getElementById("gu_people").innerHTML = data.population.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
} else {
	console.log("데이터 없음");
}
});
//치안시설물 그래프
fetchDataAndProcess('getSecufacil', function(data) {
    addData(securityChart1, data.avg_cctv, data.cctv, guNameValue);
    addData(securityChart2, data.avg_lights, data.lights, guNameValue);
    addData(securityChart3, data.avg_policestation, data.policeStation, guNameValue);
});
//경찰서 테이블
fetchDataAndProcess('getPoliceStations', function(data) {
   createPoliceStationTable(data);
});

 fetch('getPerceivedSafety?year=' + year + "&guNameValue=" + guNameValue, {
 method: 'Get',
 headers: {
 'Content-Type': 'application/json'
 }
 })
 .then(response => {
 if (!response.ok) {
 throw new Error('Network response was not ok' + response.statusText);
 }
 // 반환된 객체를 JSON으로 전환하기 위해 json() 메서드를 사용
 return response.json();
 })
 .then(data => {
 document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " +
 data + "위</p>";


 })
 .catch(error => {
 console.error("Fetch error: " + error);
 });




  // 셀렉트박스
  var selectregion = document.getElementById("selectbox");
  selectregion.addEventListener('input', function () {
    guName = document.getElementById("selectbox");
    guNameValue = guName.options[guName.selectedIndex].value;
    document.getElementById("gu_name").innerHTML = "< "+guNameValue+" >";


    fetchDataAndProcess('getPopulation', function(data) {
 		document.getElementById("gu_rank").innerHTML = data.gu_secugrade;
  		document.getElementById("gu_people").innerHTML = data.population.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
    
    fetchDataAndProcess('getSecufacil', function(data) {
        addData(securityChart1, data.avg_cctv, data.cctv, guNameValue);
        addData(securityChart2, data.avg_lights, data.lights, guNameValue);
        addData(securityChart3, data.avg_policestation, data.policeStation, guNameValue);
        
    });
    fetchDataAndProcess('getArRate', function(data) {
  	 safetyChart.destroy();
   	  const ar_rateDatas = data.map(item => item.ar_rate);
    	  ar_rateChart(ar_rateDatas);
    });
    //경찰서 테이블
    fetchDataAndProcess('getPoliceStations', function(data) {
		createPoliceStationTable(data); 
    });

    fetch('getPerceivedSafety?year=' + year + "&guNameValue=" + guNameValue, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }
        // 반환된 객체를 JSON으로 전환하기 위해 json() 메서드를 사용
        return response.json();
      })
      .then(data => {
        document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " + data + "위</p>";


      })
      .catch(error => {
        console.error("Fetch error: " + error);
      });

  });



// 치안 시설물 그래프
  const addData = (chart, data1, data2, guNameValue) => {
    chart.data.datasets[0].data = [data1, data2];
    chart.data.labels = ['평균', guNameValue]
    chart.update();
  };
  var security_CCTV = {
    labels: ['평균', guNameValue],
    // a 강남구의 범례
    datasets: [{
      label: [
        ' 지역 '
      ],
      data: [0, 0],
      backgroundColor: ['#43c2c2', '#4eddad'],
    }]
  };


  var security_light = {
    labels: ['평균', guNameValue],
    // a 강남구의 범례
    datasets: [{
      label: [
        ' 지역 '
      ],
      data: [0, 0],
      backgroundColor: ['#43c2c2', '#4eddad'],
    }]
  };

  var security_police = {
    labels: ['평균', guNameValue],
    // a 강남구의 범례
    datasets: [{
      label: [
        ' 지역 '
      ],
      data: [0, 0],
      backgroundColor: ['#43c2c2', '#4eddad'],
    }]
  };

  var ctx1 = document.getElementById('myChart1').getContext('2d');
  var securityChart1 = new Chart(ctx1, {
    type: 'bar',
    data: security_CCTV,
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      // plugins안에
      maintainAspectRatio: false

    }
  });

  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var securityChart2 = new Chart(ctx2, {
    type: 'bar',
    data: security_light,
    options: {
       plugins: {
        legend: {
          display: false,
        }
      },
      maintainAspectRatio: false
      // reponsive : false

    }
  });

  var ctx3 = document.getElementById('myChart3').getContext('2d');
  var securityChart3 = new Chart(ctx3, {
    type: 'bar',
    data: security_police,
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      // 이게 사이즈 바꿔주는거
      maintainAspectRatio: false
    }
  });


 // 검거비율 그래프
  function ar_rateChart(data) {
    var ctx = document.getElementById('safetyChart').getContext('2d');
    safetyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2004', '2007', '2010', '2013', '2015', '2018', '2022'],
        datasets: [{
          label: '검거 비율',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false
      }
    });
  }
  function guChangeChart(data) {
  safetyChart.destroy();

  var ctx = document.getElementById('safetyChart').getContext('2d');
  safetyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2004', '2007', '2010', '2013', '2015', '2018', '2022'],
      datasets: [{
        label: '검거 비율',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      maintainAspectRatio: false
    }
  });
}

//체감 안전도 그래프
  var buttons = document.querySelectorAll('.btn');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // 클릭된 버튼의 값
      var year = button.id;
      guName = document.getElementById("selectbox");
      guNameValue = guName.options[guName.selectedIndex].value;
      fetch('getPerceivedSafety?year=' + year + "&guNameValue=" + guNameValue, {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
          }
          // 반환된 객체를 JSON으로 전환하기 위해 json() 메서드를 사용
          return response.json();
        })
        .then(data => {
          // 클릭된 버튼의 ID 가져오기
          var year = button.id;
          // ID에 따라 #lower의 내용 변경
          switch (year) {
            case "y2019":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2019 년도 " + data + "위</p>";
              break;
            case "y2020":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2020 년도 " + data + "위</p>";
              break;
            case "y2021":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2021 년도" + data + "위</p>";
              break;
            case "y2022":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2022 년도 " + data + "위</p>";
              break;
            case "y2023":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " + data + "위</p>";
              break;
            default:
              document.getElementById("chart_resultMent3").innerHTML = "<p>기본 내용</p>";
              break;
          }

        })
        .catch(error => {
          console.error("Fetch error: " + error);
        });

    });
  });



//경찰관서 데이터를 테이블로 만드는 함수
function createPoliceStationTable(data) {
    var tableBody = document.getElementById('policeStationData');

    // 테이블 본문 초기화
    tableBody.innerHTML = '';

    // 데이터가 없을 경우 처리
    if (data.length === 0) {
        var noDataRow = tableBody.insertRow();
        var noDataCell = noDataRow.insertCell();
        noDataCell.colSpan = 6; // 테이블 셀이 6개이므로
        noDataCell.textContent = '데이터가 없습니다.';
        return;
    }

    // 테이블 본문에 데이터 추가
    data.forEach(function (item) {
    var row = tableBody.insertRow();
    // 각 데이터 항목에 대해 새로운 셀을 생성하고 데이터를 채움
    var districtCell = row.insertCell();
    districtCell.textContent = item.district;

    var subDistrictCell = row.insertCell();
    subDistrictCell.textContent = item.sub_district;

    var departmentCell = row.insertCell();
    departmentCell.textContent = item.department;

    var addressCell = row.insertCell();
    addressCell.textContent = item.address;

    var telCell = row.insertCell();
    telCell.textContent = item.tel;
    });
}


//지도 모달창
  var modalwindow = document.getElementById('modal')
  modalwindow.addEventListener('click', function () {
    modalwindow.style.display = "none";
  })

}


var modalwindow2 = document.querySelector("#policeq")
modalwindow2.addEventListener('mouseover', function () {
  document.getElementById("modalContent2").style.display = "block";
});

modalwindow2.addEventListener('mouseout', function () {
  document.getElementById("modalContent2").style.display = "none";
});

// 왼쪽 스크롤 컨트롤러
const sidedar = document.getElementById('sidebar')
const homeIcon = document.getElementById('home')
const upIcon = document.getElementById('upIcon')
const rankIcon = document.getElementById('rankIcon')
const mapIcon = document.getElementById('mapIcon')


sidedar.addEventListener('mouseenter', function () {
  homeIcon.className = 'fa-solid fa-house-user';
  upIcon.className = 'fa-solid fa-arrow-up';
  rankIcon.className = 'fa-solid fa-award';
  mapIcon.className = 'fa-solid fa-map-location-dot';
});


