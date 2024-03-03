var local = "강남구";
console.log(local)



var guName;
var guNameValue;
var arrestdata;
var safetyChart;

window.onload = function () {


function fetchDataAndProcess(url, callback) {
   guName = document.getElementById("selectbox");
   guNameValue = guName.options[guName.selectedIndex].value;

  fetch(url+'?guNameValue=' + guNameValue , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
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


// 예제로 fetchDataAndProcess 함수를 사용하는 방법
fetchDataAndProcess('./guPage_chart.do', function(data) {
  console.log(data);
  const ar_rateDatas = data.map(item => item.total_ar_rate);
  ar_rateChart(ar_rateDatas);
});

fetchDataAndProcess('./guPage_secuGrade.do', function(data) {
	console.log(data);
  document.getElementById("gu_rank").innerHTML = data.secugrade;
  document.getElementById("gu_people").innerHTML = data.population.toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
});

fetchDataAndProcess('./guPage_secufacil.do', function(data) {
	  console.log(data);
    addData(securityChart1, data.avg_cctv, data.cctv, guNameValue);
    addData(securityChart2, data.avg_lights, data.lights, guNameValue);
    addData(securityChart3, data.avg_policestation, data.policestation, guNameValue);
});


 fetch('./guPage_perceivedSafety.do?year=y2023&guNameValue='
 + guNameValue, {
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
 console.log(data);
 document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " +
 data.rank + "위</p>";


 })
 .catch(error => {
 console.error("Fetch error: " + error);
 });

  const addData = (chart, data1, data2, guNameValue) => {
//     removeData(chart);
    chart.data.datasets[0].data = [data1, data2];
    chart.data.labels = ['평균', guNameValue]
    chart.update();
  };


  // 셀렉트박스
  var selectregion = document.getElementById("selectbox");
  selectregion.addEventListener('input', function () {
    guName = document.getElementById("selectbox");
    guNameValue = guName.options[guName.selectedIndex].value;

    fetchDataAndProcess('./guPage_secuGrade.do', function(data) {
    	console.log(data);
      document.getElementById("gu_rank").innerHTML = data.secugrade;
      document.getElementById("gu_people").innerHTML = data.population.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });
    
    fetchDataAndProcess('./guPage_secufacil.do', function(data) {
    	  console.log(data);
        addData(securityChart1, data.avg_cctv, data.cctv, guNameValue);
        addData(securityChart2, data.avg_lights, data.lights, guNameValue);
        addData(securityChart3, data.avg_policestation, data.policestation, guNameValue);
        
    });
    fetchDataAndProcess('./guPage_chart.do', function(data) {
  	  console.log(data);
  	 safetyChart.destroy();
   	  const ar_rateDatas = data.map(item => item.total_ar_rate);
    	  ar_rateChart(ar_rateDatas);
    });

    fetch('./guPage_perceivedSafety.do?year=y2023&guNameValue=' + guNameValue, {
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
        console.log(data);
        document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " + data.rank + "위</p>";


      })
      .catch(error => {
        console.error("Fetch error: " + error);
      });

  });


  var security_CCTV = {
    labels: ['평균', local],
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
    labels: ['평균', local],
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
    labels: ['평균', local],
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




  // ----------------------------------------------------------



  // 검거비율 만드는 차트 함수
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


  var buttons = document.querySelectorAll('.btn');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // 클릭된 버튼의 값을 읽어옵니다.
      var buttonValue = button.textContent;
      // 읽어온 값을 콘솔에 출력합니다. 실제로 사용하는 곳에서는 다른 작업을 수행할 수 있습니다.
      console.log("Button Value: " + buttonValue);
      guName = document.getElementById("selectbox");
      guNameValue = guName.options[guName.selectedIndex].value;
      fetch('./guPage_perceivedSafety.do?year=y' + buttonValue + "&guNameValue=" + guNameValue, {
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
          console.log(data);
          // 클릭된 버튼의 ID 가져오기
          var buttonID = button.id;
          console.log("buttonID : " + buttonID);
          // ID에 따라 #lower의 내용 변경
          switch (buttonID) {
            case "bt2019":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2019 년도 " + data.rank + "위</p>";
              break;
            case "bt2020":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2020 년도 " + data.rank + "위</p>";
              break;
            case "bt2021":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2021 년도" + data.rank + "위</p>";
              break;
            case "bt2022":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2022 년도 " + data.rank + "위</p>";
              break;
            case "bt2023":
              document.getElementById("chart_resultMent3").innerHTML = "<p>2023 년도 " + data.rank + "위</p>";
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



  var modalwindow = document.getElementById('modal')
  modalwindow.addEventListener('click', function () {
    modalwindow.style.display = "none";
  })

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


