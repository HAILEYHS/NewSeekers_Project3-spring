<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>

	<html>


	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="./css/previewPopup.css">
		<title>산정기준 팝업</title>
	</head>

	<body>
		<div id="container">
			<div class="popupMentBox">
				<div class="popupMentTitle">
					등급 산정기준
				</div>

			</div>
			<div class="popupMent">
				<div>
					각 데이터 포인트의 값을 해당 열의 최소값과 최대값 사이의 비율로 변환하고,
				</div>
				<div>
					그 비율에 변환점수를 곱하여 최종적으로 정규화 점수를 얻습니다.
				</div>
				<div>
					그리고 2할 기준의 백위수를 도출하여 등급 기준점을 산출하였습니다.
				</div>
			</div>
			<table class="rankTable">

				<tr class="firstLine">
					<td>등급</td>
					<td>5</td>
					<td>4</td>
					<td>3</td>
					<td>2</td>
					<td>1</td>
				</tr>

				<tr class="seconLine">
					<td>구간</td>
					<td>20%</td>
					<td>40%</td>
					<td>60%</td>
					<td>80%</td>
					<td>100%</td>
				</tr>
				<tr class="LastLine">
					<td>점수</td>
					<td>39.8</td>
					<td>46.4</td>
					<td>51.04</td>
					<td>56.54</td>
					<td>91.8</td>
				</tr>

			</table>
			<div class="dataMent">
				기준데이터 : 서울시 자치구 치안시설물과 범죄 (2004년 ~ 2022년)
			</div>
			<div class="popupMentBox">
				<div class="popupMentTitle">
					범죄에 영향을 주는 요소 선정기준
				</div>
			</div>
			<div class="popupMent">
				<div>
					범죄를 제외한 요소들과 범죄 간 영향력을 점수로 환산하기 위하여
				</div>
				<div>
					다중회귀분석시의 상관계수를 기준으로 선정하였습니다.
				</div>
				<div>
					(변인들의 영향력만을 판단하기 위하여 절편(Intercept)은 제외하였습니다.)
				</div>
			</div>

			<table class="rankTable">
				<tr class="firstLine">
					<td>구분</td>
					<td>범죄</td>
					<td>방범등</td>
					<td>주점</td>
					<td>경찰관서</td>
					<td>CCTV</td>
					<td>1인 가구</td>
					<td>경찰관</td>
				</tr>
				<tr class="LastLine">
					<th>coef</th>
					<td>0.187954</td>
					<td>1.939136</td>
					<td>13.69737</td>
					<td>0.792215</td>
					<td>0.03354</td>
					<td>2.46271</td>
					<td>0.187954</td>
				</tr>

			</table>
			<div class="dataMent">이를 50점 만점의 소수점 첫째 자리 수치로 환산했습니다.</div>

			<table class="secondrankTable">
				<tr class="firstLine">
					<td>가중치</td>
					<td>50%</td>
					<td colspan='6'>50%</td>
				</tr>
				<tr class="seconLine">
					<td>구분</td>
					<td>범죄</td>
					<td>방범등</td>
					<td>주점</td>
					<td>경찰관서</td>
					<td>CCTV</td>
					<td>1인 가구</td>
					<td>경찰관</td>
				</tr>

				<tr class="LastLine">
					<th>coef</th>
					<td>0.187954</td>
					<td>1.939136</td>
					<td>13.69737</td>
					<td>0.792215</td>
					<td>0.03354</td>
					<td>2.46271</td>
					<td>0.187954</td>
				</tr>

			</table>

			<div class="popupMentBox">
				<div class="popupMentTitle">
					최대값과 최소값을 구한 공식
				</div>
			</div>

			<div class="popupMent">스케일을 조정하기 위한 요인들의 최대값과 최소값은 아래와 같습니다.</div>
			<div class="OperatorBox">
				<img src="./img/Popupplus.png" alt="">
				<div class="Operator">(+) 요일의 경우 적용 수식</div>
			</div>
			<div class="OperatorBox">
				<img src="./img/Popupminus.png" alt="">
				<div class="Operator">(-) 요일의 경우 적용 수식</div>
			</div>

			<table class="rankTable">
				<tr class="firstLine">
					<td>구분</td>
					<td>범죄</td>
					<td>방범등</td>
					<td>주점</td>
					<td>경찰관서</td>
					<td>CCTV</td>
					<td>1인 가구</td>
					<td>경찰관</td>
				</tr>
				<tr class="LastLine">
					<td> + / - </td>
					<td>-</td>
					<td>+</td>
					<td>-</td>
					<td>+</td>
					<td>+</td>
					<td>-</td>
					<td>+</td>
				</tr>
			</table>

			<div class="line"></div>

			<table class="rankTable">
				<tr class="firstLine">
					<td>구분</td>
					<td>범죄</td>
					<td>방범등</td>
					<td>주점</td>
					<td>경찰관서</td>
					<td>CCTV</td>
					<td>1인 가구</td>
					<td>경찰관</td>
				</tr>

				<tr class="seconLine">
					<td>최대값</td>
					<td>10134</td>
					<td>6753.43</td>
					<td>414.49</td>
					<td>15.77</td>
					<td>1549.11</td>
					<td>29015.45</td>
					<td>779.14</td>
				</tr>
				<tr class="LastLine">
					<td>최소값</td>
					<td>1718</td>
					<td>705.08</td>
					<td>11.54</td>
					<td>1.41</td>
					<td>2.36</td>
					<td>2682.57</td>
					<td>90.42</td>
				</tr>


			</table>

		</div>


	</body>

	</html>