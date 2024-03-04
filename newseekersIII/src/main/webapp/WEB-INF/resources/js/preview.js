var districtData;
var districtData2;
async function PredData(dropdownValue) {
    return await getData(dropdownValue);
}

function getData(dropdownValue) {
    return new Promise((resolve, reject) => {
        fetch("./callPredict.do?region=" + dropdownValue)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve(data);
            });
    });
}

function showchart() {
    var ctx = document.getElementById('chart').getContext('2d');
    const crimes = ['homicide', 'robber', 'sexual', 'theft', 'violence'];
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
            datasets: crimes.map(crime => {
                return {
                    label: crime,
                    data: districtData2["crimeData"][0][crime],
                    Color: getColor(crime), // 각 범죄별 색상 함수
                    borderWidth: 1,
                };
            })
        },
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    });
}

function getColor(crime) {
    switch (crime) {
        case 'homicide': return '##FF7D63';
        case 'robber': return '#C6EA46';
        case 'sexual': return '#73EFFB';
        case 'theft': return '#FFCA67';
        case 'violence': return '#046B99';
        default: return 'black';
    }
}

function changeChartLabels(facility) {
    myChart.data.labels = districtData["facilitySelector"][0][facility];
    myChart.update();
}

function removeChart() {
    if (typeof myChart !== 'undefined' && myChart !== null) {
        myChart.destroy();
    } else { return }
}

new Swiper('.swiper', {
    autoplay: {
        delay: 2000
    },
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    }
})

document.addEventListener('DOMContentLoaded', function () {
    var guDropdown = document.getElementById('guDropdown');
    var dropdownMenu = document.querySelector('.btn-group .dropdown-menu');
    guDropdown.click();
    if (dropdownMenu && dropdownMenu.children.length > 2) {
        var firstItem = dropdownMenu.children[2].firstElementChild;
        firstItem.click();
    }
});


var TotalBtnCount;
var plusBtnCount;
var minusBtnCount;
var valuesArray;
var dropdownValue = "강남구";
var guName;
var newhomicide;
var newrobber;
var newsexual;
var newtheft;
var newviolence;
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', async function () {

        chartLabelData = [];
        TotalBtnCount = 0;
        plusBtnCount = 0;
        minusBtnCount = 0;
        dropdownValue = this.value;
        guName = this.innerText;
        document.getElementById('plusBtnLeft').innerHTML = "+ 버튼 남은 수: " + (5 - plusBtnCount);
        document.getElementById('minusBtnLeft').innerHTML = "- 버튼 남은 수: " + (5 - minusBtnCount);


        districtData = await PredData(dropdownValue);
        districtData2 = await PredData(dropdownValue);
        await removeChart();
        await showchart();
        await setCCData();

        document.querySelectorAll('.guName').forEach(item => {
            item.innerText = guName;
        })


        document.getElementById('grade').innerText = districtData["grade"]
        document.getElementById('population').innerText = districtData["population"][9].toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 명";

        const crBoxes = document.querySelectorAll('.crBox');
        const compos = document.querySelectorAll('.compo');
        const counts = document.querySelectorAll('.count');

        const facilitySelectors = districtData["facilitySelector"][0];
        crBoxes.forEach(box => {
            box.setAttribute('data-condition', 0);
            box.style.display = 'none';
            box.classList.remove('show')
        })
        //valuesArray 치안시설 배열
        valuesArray = Object.keys(facilitySelectors);
        valuesArray.forEach((value, index) => {

            if (value == "cctv") {
                compos[index].textContent = "CCTV";
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            } else if (value == "lights") {
                compos[index].textContent = "보안등";
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            } else if (value == "policeStation") {
                compos[index].textContent = "경찰관서"
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            } else if (value == "pub") {
                compos[index].textContent = "주점";
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            } else if (value == "single") {
                compos[index].textContent = "1인가구";
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            } else if (value == "policeman") {
                compos[index].textContent = "경찰관";
                counts[index].innerText = facilitySelectors[value][facilitySelectors[value].length - 1].toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                crBoxes[index].setAttribute('data-condition', 1)
            }
        })



        //==============================================================================
        const boxes = document.querySelectorAll('.crBox');
        boxes.forEach(crBox => {
            const condition = parseInt(crBox.getAttribute('data-condition'));
            if (condition === 1) {
                crBox.style.display = 'block'
                setTimeout(function () {
                    crBox.classList.add('show')
                }, 300);
            } else {
                crBox.style.display = 'none'
                crBox.classList.remove('show'); // class 'show' has css element
            }
        });
        document.getElementById('plusBtnLeft').innerHTML = "+ 버튼 남은 수: " + (5 - plusBtnCount);
        document.getElementById('minusBtnLeft').innerHTML = "- 버튼 남은 수: " + (5 - minusBtnCount);
        //==============================================================================






        document.getElementById('resetButton').addEventListener('click', function () {
            const facilitySelectors2 = districtData2["facilitySelector"][0];
            valuesArray = Object.keys(facilitySelectors2);
            valuesArray.forEach((value, index) => {
                if (value == "cctv") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                } else if (value == "lights") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                } else if (value == "policeStation") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                } else if (value == "pub") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                } else if (value == "single") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                } else if (value == "policeman") {
                    counts[index].innerText = facilitySelectors2[value][facilitySelectors2[value].length - 1].toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                }
            })
            TotalBtnCountCount = 0;
            plusBtnCount = 0;
            minusBtnCount = 0;
            FacilityData = [];
            facilityLabels = {};
            chartLabelData = [];
            setCCData();
            removeChart();
            showchart();
            document.getElementById('plusBtnLeft').innerHTML = "+ 버튼 남은 수: " + (5 - plusBtnCount);
            document.getElementById('minusBtnLeft').innerHTML = "- 버튼 남은 수: " + (5 - minusBtnCount);
            var results = document.querySelectorAll('#result');
            var flucs = document.querySelectorAll('#fluc');
            document.getElementById('predGuGrade').innerText = "";
            for (i = 0; i < 5; i++) {
                results[i].innerText = "";
                flucs[i].innerText = "";
            }

        })

        compos.forEach(box => {
            var text = box.textContent.trim()
            var facility = changeFacilName(text);
            box.addEventListener('click', function () {
                removeChart();
                showchart();
                changeChartLabels(facility)
                TotalBtnCountCount = 0;
                plusBtnCount = 0;
                minusBtnCount = 0;
                chartLabelData = [];
                document.getElementById('plusBtnLeft').innerHTML = "+ 버튼 남은 수: " + (5 - plusBtnCount);
                document.getElementById('minusBtnLeft').innerHTML = "- 버튼 남은 수: " + (5 - minusBtnCount);
            })
        })


    });
});

function changeFacilName(text) {
    if (text == "CCTV") {
        return facility = "cctv"
    } else if (text == "보안등") {
        return facility = "lights"
    } else if (text == "경찰관서") {
        return facility = "policeStation"
    } else if (text == "주점") {
        return facility = "pub"
    } else if (text == "1인가구") {
        return facility = "single"
    } else if (text == "경찰관") {
        return facility = "policeman"
    }
}


function setCCData() {
    var districtFacil = districtData["facilitySelector"][0];
    if (districtFacil.cctv) { cctv = districtFacil["cctv"][districtFacil["cctv"].length - 1]; }
    if (districtFacil.lights) { lights = districtFacil["lights"][districtFacil["lights"].length - 1]; }
    if (districtFacil.policeStation) { ps = districtFacil["policeStation"][districtFacil["policeStation"].length - 1]; }
    if (districtFacil.pub) { pub = districtFacil["pub"][districtFacil["pub"].length - 1]; }
    if (districtFacil.single) { single = districtFacil["single"][districtFacil["single"].length - 1]; }
    if (districtFacil.policeman) { pm = districtFacil["policeman"][districtFacil["policeman"].length - 1]; }
}

function linearFomula(dropdownValue) {
    if (dropdownValue == "강남구") {
        newhomicide = Math.round((-0.01386 * pm) + 30.4354, 2)
        newrobber = Math.round((0.2219 * pub) + (-0.002662 * single) + 150, 2)
        newsexual = Math.round((-0.4881 * pub) + (0.023 * cctv) + 721.1480, 2)
        newtheft = Math.round((-10.1851 * pub) + (-0.9912 * cctv) + 12945, 2)
        newviolence = Math.round((2.40490 * pub) + (-0.11438 * cctv) + 3240.66897, 2)
    } else if (dropdownValue == "송파구") {
        newhomicide = Math.round((0.02 * pm) - 0.55, 2)
        newrobber = Math.round((0.868217 * pub) + (0.038574 * cctv) + (-0.249687 * pm), 2)
        newsexual = Math.round((-28.27 * ps) + 884.73, 2)
        newtheft = Math.round((-0.40439 * lights) + 7713.99518, 2)
        newviolence = Math.round((-0.09266 * lights) + (6.64268 * pub) + 2466.36834, 2)
    } else if (dropdownValue == "영등포구") {
        newhomicide = Math.round((0.01207 * lights) + (0.1288 * pub) - 151.3, 2)
        newrobber = Math.round((0.21563 * pub) - 71.86629, 2)
        newsexual = Math.round((-36.60834 * ps) + (-0.01625 * cctv) + (0.23162 * pm) + 736.69621, 2)
        newtheft = Math.round((-280.6012 * ps) + (-0.5272 * cctv) + (-2.5739 * pm) + 10950.4520, 2)
        newviolence = Math.round((0.3071 * lights) + (-0.6646 * cctv) + (3.10 * pm) - 1364, 2)
    } else if (dropdownValue == "성동구") {
        newhomicide = Math.round((0.0074954 * cctv) + (-0.0011057 * single) + 54.0135106, 2)
        newrobber = Math.round((0.02709 * cctv) + (-0.01248 * lights) + (-0.004272 * single) + 230.9, 2)
        newsexual = Math.round((-0.0128024 * cctv) + (0.0035218 * single) + 9.3096545, 2)
        newtheft = Math.round((-0.51652 * cctv) + (17.22919 * pub) + (-6.14257 * pm) + (0.08810 * single) + 1816.62870, 2)
        newviolence = Math.round((-0.03876 * single) + 2924, 2)
    } else if (dropdownValue == "노원구") {
        newhomicide = Math.round((-0.011215 * lights) + (0.005730 * cctv) + 100.566202, 2)
        newrobber = Math.round((-4.313 * ps) + (-0.001470 * single) + 194.1, 2)
        newsexual = Math.round((-0.014380 * lights) + (-0.086534 * cctv) + (0.008263 * single) + 12.740479, 2)
        newtheft = Math.round((-0.04215 * single) + (-4.95164 * pm) + 8055.75584, 2)
        newviolence = Math.round((-0.31102 * cctv) + 2856.35701, 2)
    } else if (dropdownValue == "강북구") {
        newhomicide = Math.round((0.01246 * lights) + (-0.236 * pub) + (-0.00872 * cctv) + (0.001041 * single) - 31.21, 2)
        newrobber = Math.round((-9.12 * ps) + (-0.002169 * single) + +298.3, 2)
        newsexual = Math.round((-0.05327 * cctv) + (0.006781 * single) - 19.91, 2)
        newtheft = Math.round((-0.68294 * lights) + (-0.28357 * cctv) + 4622.58705, 2)
        newviolence = Math.round((15.108 * pub) - 634.928, 2)
    }
}

var plusBtns = document.querySelectorAll('.btnplus');
var minusBtns = document.querySelectorAll('.btnminus');
var FacilityData;
var chartLabelData;
var crimeData;
var cctv;
var lights;
var ps;
var pub;
var single;
var pm;
var facilityLabels = {};
plusBtns.forEach(function (plusBtn) {
    plusBtn.addEventListener('click', function () {
        var text = plusBtn.parentElement.parentElement.querySelector('.compo').textContent.trim();
        var facility = changeFacilName(text);

        if (myChart.data.labels[0] == 2013) {
            changeChartLabels(facility);
        }

        //clicked facility's multiple rate '+5%'
        var multipleNum = Math.round(districtData["facilitySelector"][0][facility][districtData["facilitySelector"][0][facility].length - 1] * 0.05, 2)

        if (plusBtnCount < 5) {
            if (facilityLabels[facility] === undefined) {
                // facilityLabels = {};
                console.log("퍼실라벨실행됨?" + facilityLabels)
                if (facility == "cctv") {
                    facilityLabels.cctv = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "lights") {
                    facilityLabels.lights = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "policeStation") {
                    facilityLabels.policeStation = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "pub") {
                    facilityLabels.pub = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "single") {
                    facilityLabels.single = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "policeman") {
                    facilityLabels.policeman = districtData["facilitySelector"][0][facility].slice();
                }
            }
            chartLabelData = myChart.data.labels.slice();

            FacilityData = facilityLabels[facility];
            var newFacilData = FacilityData[(FacilityData.length - 1)] + multipleNum;
            if (facility == "cctv") {
                cctv = newFacilData;
            } else if (facility == "lights") {
                lights = newFacilData;
            } else if (facility == "policeStation") {
                ps = newFacilData;
            } else if (facility == "pub") {
                pub = newFacilData;
            } else if (facility == "single") {
                single = newFacilData;
            } else if (facility == "policeman") {
                pm = newFacilData;
            }
            plusBtn.parentElement.parentElement.querySelector('.count').innerText = newFacilData.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            FacilityData.push(newFacilData);
            chartLabelData.push(newFacilData);
            myChart.data.labels = chartLabelData;

            myChart.update();
            plusBtnCount++;
            document.getElementById('plusBtnLeft').innerHTML = "+ 버튼 남은 수: " + (5 - plusBtnCount);

            TotalBtnCount++;

            linearFomula(dropdownValue);
            var newCrimeData = [newhomicide, newrobber, newsexual, newtheft, newviolence];
            const datasets = myChart.data.datasets;
            datasets.forEach((dataset, index) => {
                crimeData = dataset.data.slice();
                dataset.data = crimeData;
                myChart.update();
                crimeData.push(newCrimeData[index]);
                myChart.update();
                const crimeafter = dataset.data[(dataset.data.length - 1)];

                /*-----standard num for compare before -----*/
                districtCrime = districtData2["crimeData"][0];
                homiStd = districtCrime["homicide"][(districtCrime["homicide"].length - 1)]
                robStd = districtCrime["robber"][(districtCrime["robber"].length - 1)]
                sexStd = districtCrime["sexual"][(districtCrime["sexual"].length - 1)]
                violStd = districtCrime["violence"][(districtCrime["violence"].length - 1)]
                theStd = districtCrime["theft"][(districtCrime["theft"].length - 1)]
                crimestd = [homiStd, robStd, sexStd, theStd, violStd];
                var results = document.querySelectorAll('#result');
                var flucs = document.querySelectorAll('#fluc');

                if (crimeafter - crimestd[index] > 0) {
                    results[index].innerText = Math.round((crimeafter - crimestd[index]) / crimestd[index] * 100) + "%"
                    flucs[index].innerText = "증가"
                } else if (crimeafter - crimestd[index] == 0) {
                    results[index].innerText = "그대로"
                    flucs[index].innerText = "유지"
                } else if (crimeafter - crimestd[index] < 0) {
                    results[index].innerText = Math.round((crimestd[index] - crimeafter) / crimestd[index] * 100) + "%"
                    flucs[index].innerText = "감소"
                }
            })

            if (!lights) { lights = 6842.9 }
            if (!pub) { pub = 216.6 }
            if (!ps) { ps = 18.5 }
            if (!cctv) { cctv = 1042.6 }
            if (!single) { single = 40495.1 }
            if (!pm) { pm = 802.1 }

            var popCount = districtData["population"][9];
            var sumCrimeData = newhomicide + newrobber + newsexual + newtheft + newviolence;
            var crimeScore = 50 - (((sumCrimeData / popCount * 100000) - 525.13) / (3831.84 - 525.13) * 50);
            var facilScore = (((lights / popCount * 100000) - 705.08) / (6753.43 - 705.08) * 0.5)
                + (5.1 - (((pub / popCount * 100000) - 11.54) / (414.49 - 11.54) * 5.1))
                + (((ps / popCount * 100000) - 1.41) / (15.77 - 1.41) * 35.8)
                + (((cctv / popCount * 100000) - 2.36) / (1549.11 - 2.36) * 2.1)
                + (0.1 - (((single / popCount * 100000) - 2682.57) / (29015.45 - 2682.57) * 0.1))
                + (((pm / popCount * 100000) - 90.42) / (779.14 - 90.42) * 6.4)
            var totalScore = crimeScore + facilScore;
            var newGrade;
            if (totalScore >= 59) {
                newGrade = 1;
            } else if (totalScore >= 56.5) {
                newGrade = 2;
            } else if (totalScore >= 54.4) {
                newGrade = 3;
            } else if (totalScore >= 51.58) {
                newGrade = 4;
            } else {
                newGrade = 5;
            }

            document.getElementById('predGuGrade').innerText = newGrade;

        }
    });
});



minusBtns.forEach(function (minusBtn) {
    minusBtn.addEventListener('click', function () {
        var text = minusBtn.parentElement.parentElement.querySelector('.compo').textContent.trim();
        facility = changeFacilName(text);
        if (myChart.data.labels[0] == 2013) {
            changeChartLabels(facility);
        }

        multipleNum = Math.round(districtData["facilitySelector"][0][facility][districtData["facilitySelector"][0][facility].length - 1] * 0.05, 2)

        if (minusBtnCount < 5) {

            if (facilityLabels[facility] === undefined) {
                // facilityLabels = {};
                if (facility == "cctv") {
                    facilityLabels.cctv = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "lights") {
                    facilityLabels.lights = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "policeStation") {
                    facilityLabels.policeStation = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "pub") {
                    facilityLabels.pub = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "single") {
                    facilityLabels.single = districtData["facilitySelector"][0][facility].slice();
                } else if (facility == "policeman") {
                    facilityLabels.policeman = districtData["facilitySelector"][0][facility].slice();
                }
            }

            FacilityData = facilityLabels[facility];
            newFacilData = FacilityData[(FacilityData.length - 1)] - multipleNum;

            if (facility == "cctv") {
                cctv = newFacilData;
            } else if (facility == "lights") {
                lights = newFacilData;
            } else if (facility == "policeStation") {
                ps = newFacilData;
            } else if (facility == "pub") {
                pub = newFacilData;
            } else if (facility == "single") {
                single = newFacilData;
            } else if (facility == "policeman") {
                pm = newFacilData;
            }

            minusBtn.parentElement.parentElement.querySelector('.count').innerText = newFacilData.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            FacilityData.push(newFacilData);
            chartLabelData.push(newFacilData);

            myChart.update();
            minusBtnCount++;
            document.getElementById('minusBtnLeft').innerHTML = "- 버튼 남은 수: " + (5 - minusBtnCount);
            TotalBtnCount++;

            linearFomula(dropdownValue);
            newCrimeData = [newhomicide, newrobber, newsexual, newtheft, newviolence];
            datasets = myChart.data.datasets;
            datasets.forEach((dataset, index) => {
                crimeData = dataset.data.slice();
                dataset.data = crimeData;
                myChart.update();
                crimeData.push(newCrimeData[index]);
                myChart.update();
                crimeafter = dataset.data[(dataset.data.length - 1)];

                /*-----standard num for compare before -----*/
                districtCrime = districtData2["crimeData"][0];
                homiStd = districtCrime["homicide"][(districtCrime["homicide"].length - 1)]
                robStd = districtCrime["robber"][(districtCrime["robber"].length - 1)]
                sexStd = districtCrime["sexual"][(districtCrime["sexual"].length - 1)]
                violStd = districtCrime["violence"][(districtCrime["violence"].length - 1)]
                theStd = districtCrime["theft"][(districtCrime["theft"].length - 1)]
                crimestd = [homiStd, robStd, sexStd, theStd, violStd];

                results = document.querySelectorAll('#result');
                flucs = document.querySelectorAll('#fluc');

                if (crimeafter - crimestd[index] > 0) {
                    results[index].innerText = Math.round((crimeafter - crimestd[index]) / crimestd[index] * 100) + "%"
                    flucs[index].innerText = "증가"
                } else if (crimeafter - crimestd[index] == 0) {
                    results[index].innerText = "그대로"
                    flucs[index].innerText = "유지"
                } else if (crimeafter - crimestd[index] < 0) {
                    results[index].innerText = Math.round((crimestd[index] - crimeafter) / crimestd[index] * 100) + "%"
                    flucs[index].innerText = "감소"
                }
            })
            if (!lights) { lights = 6842.9 }
            if (!pub) { pub = 216.6 }
            if (!ps) { ps = 18.5 }
            if (!cctv) { cctv = 1042.6 }
            if (!single) { single = 40495.1 }
            if (!pm) { pm = 802.1 }

            var popCount = districtData["population"][9];
            var sumCrimeData = newhomicide + newrobber + newsexual + newtheft + newviolence;
            var crimeScore = 50 - (((sumCrimeData / popCount * 100000) - 525.13) / (3831.84 - 525.13) * 50);
            var facilScore = (((lights / popCount * 100000) - 705.08) / (6753.43 - 705.08) * 0.5)
                + (5.1 - (((pub / popCount * 100000) - 11.54) / (414.49 - 11.54) * 5.1))
                + (((ps / popCount * 100000) - 1.41) / (15.77 - 1.41) * 35.8)
                + (((cctv / popCount * 100000) - 2.36) / (1549.11 - 2.36) * 2.1)
                + (0.1 - (((single / popCount * 100000) - 2682.57) / (29015.45 - 2682.57) * 0.1))
                + (((pm / popCount * 100000) - 90.42) / (779.14 - 90.42) * 6.4)
            var totalScore = crimeScore + facilScore;
            var newGrade;
            if (totalScore >= 59) {
                newGrade = 1;
            } else if (totalScore >= 56.5) {
                newGrade = 2;
            } else if (totalScore >= 54.4) {
                newGrade = 3;
            } else if (totalScore >= 51.58) {
                newGrade = 4;
            } else {
                newGrade = 5;
            }
            document.getElementById('predGuGrade').innerText = newGrade;
        }
    })
    var homiStd;
    var robStd;
    var sexStd;
    var violStd;
    var theStd;
    var crimestd;
})

var modal = document.querySelector("#exp_img")
modal.addEventListener('mouseover', function () {
    document.getElementById("modalContent").style.display = "block";
});
modal.addEventListener('mouseout', function () {
    document.getElementById("modalContent").style.display = "none";
});

const sidebar = document.getElementById('sidebar')
const homeIcon = document.getElementById('home')
const upIcon = document.getElementById('upsideIcon')
const rankIcon = document.getElementById('rankIcon')
const siteIcon = document.getElementById('siteIcon')


sidebar.addEventListener('mouseenter', function () {
    homeIcon.className = 'fa fa-home';
    upIcon.className = 'fa-solid fa-arrow-up';
    rankIcon.className = 'fa-solid fa-chart-column';
    siteIcon.className = 'fa-solid fa-link';
});


$(document).ready(function () {
    function getTooltipText(operation) {
        return operation === 'plus' ? '+5%' : '-5%';
    }

    function addTooltip(button, operation) {
        $(button).tooltip({
            title: getTooltipText(operation),
            placement: 'top',
            trigger: 'hover',
            template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }

    $('.btnplus').each(function () {
        addTooltip(this, 'plus');
    });

    $('.btnminus').each(function () {
        addTooltip(this, 'minus');
    });
});

function openPopup() {
    window.open("previewPopup.jsp", "mypopup", "width=800, height=650, top=200, left=100, resizeable = no");

}


//policeStation 부르는 patch문

function getPoliceData(guNameValue) {


    fetch('http://localhost:8181/ProjectII/info/policeStation.do?guNameValue=' + guNameValue, {
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

            // 받은 JSON 데이터를 테이블로 만들기
            createTable(data);
        })
        .catch(error => {
            console.error("Fetch error: " + error);
        });
}

//JSON 데이터를 테이블로 만드는 함수
function createTable(data) {
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
        for (var key in item) {
            var cell = row.insertCell();
            cell.textContent = item[key];
        }
    });
}

