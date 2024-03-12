package com.spring.newseekers.borough.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.annotation.PostConstruct;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.newseekers.borough.model.PoliceStationVO;
import com.spring.newseekers.borough.repository.IPoliceStationRepository;

@Service
public class PoliceStationAPIData {

	@Autowired
	IPoliceStationRepository policeStationRepository;

	@PostConstruct
	public void init() {
		try {
			// 공공DB Open API에서 JSON 데이터 가져오기
			String policeStationApiUrl = "https://api.odcloud.kr/api/15054711/v1/uddi:9097ad1f-3471-42c6-a390-d85b5121816a?page=1&perPage=243&serviceKey=ZMC3yM4jjMpWPdEfL3Hl2BlzqhQUeN8herjSp2HWSNyV4aUEh7HaJliCLEyGGi2Fn38GRXeQeCiE1WAPXDJljA%3D%3D";
			String policeStationData = fetchDataFromAPI(policeStationApiUrl);
			// JSON 데이터 파싱
			JSONObject policeStationDataJson = new JSONObject(policeStationData);
			JSONArray policeStationArray = policeStationDataJson.getJSONArray("data");
			// 테이블 존재 여부 확인
			if (policeStationRepository.isTableExists() > 0) {
				// 테이블이 존재하면 데이터 삭제
				policeStationRepository.deleteData();
			} else {
				// 테이블이 존재하지 않으면 테이블 생성
				policeStationRepository.createTable();
			}
			// 데이터베이스에 저장
			for (int i = 0; i < policeStationArray.length(); i++) {
				JSONObject stationJson = policeStationArray.getJSONObject(i);
				PoliceStationVO policeStation = new PoliceStationVO();
				// JSON 데이터를 PoliceStation 객체로 변환
                policeStation.setId(stationJson.getInt("연번")); 
                policeStation.setDistrict(getDistrict(stationJson.getString("경찰서")));
                policeStation.setSub_district(stationJson.getString("관서명"));
                policeStation.setDepartment(stationJson.getString("구분"));
                policeStation.setTel(stationJson.getString("전화번호"));
                policeStation.setAddress(stationJson.getString("주소"));
				// MyBatis 매퍼 인터페이스를 통해 데이터베이스에 삽입
				policeStationRepository.insert(policeStation);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 경찰서에서 district 가져오는 메서드
	private String getDistrict(String policeStation) {
		// 각각의 경찰서에 따른 district 로직을 추가
		if ("서울강남".equals(policeStation)) {
			return "강남구";
		} else if ("서울송파".equals(policeStation)) {
			return "송파구";
		} else if ("서울영등포".equals(policeStation)) {
			return "영등포구";
		} else if ("서울성동".equals(policeStation)) {
			return "성동구";
		} else if ("서울노원".equals(policeStation)) {
			return "노원구";
		} else if ("서울강북".equals(policeStation)) {
			return "강북구";
		} else {
			return policeStation;
		}
	}

	private String fetchDataFromAPI(String apiUrl) throws IOException {
		HttpURLConnection connection = (HttpURLConnection) new URL(apiUrl).openConnection();
		connection.setRequestMethod("GET");
		BufferedReader reader = null;
		StringBuilder apiData = new StringBuilder();

		try {
			reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				apiData.append(line);
			}
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return apiData.toString();
	}
}
