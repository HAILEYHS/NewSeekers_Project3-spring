package com.spring.newseekers.seoul.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.spring.newseekers.seoul.model.ApiGlobalCrimeVO;
import com.spring.newseekers.seoul.model.CrimeVO;
import com.spring.newseekers.seoul.model.DbGlobalCrimeVO;
import com.spring.newseekers.seoul.model.GuGradeVO;
import com.spring.newseekers.seoul.model.PerceivedSecuVO;
import com.spring.newseekers.seoul.model.SafetyVO;
import com.spring.newseekers.seoul.model.SecuFaciVO;
import com.spring.newseekers.seoul.model.SecuIndexVO;
import com.spring.newseekers.seoul.model.SecuInfoVO;
import com.spring.newseekers.seoul.repository.ISeoulRepository;

@Service
public class SeoulService implements ISeoulService {


	RestTemplate restTemplate = new RestTemplate();

	@Autowired
	ISeoulRepository seoulRepository;

	@Override
	public List<CrimeVO> getCrimeNum() {
		return seoulRepository.getCrimeNum();
	}

	@Override
	public List<CrimeVO> getArrestNum() {
		return seoulRepository.getArrestNum();
	}

	@Override
	public List<GuGradeVO> getGuGradeNum() {
		return seoulRepository.getGuGradeNum();
	}

	@Override
	public List<SecuFaciVO> getSecuFaci() {
		return seoulRepository.getSecuFaci();
	}

	@Override
	public List<SecuIndexVO> getSecuIndex(String year) {
		return seoulRepository.getSecuIndex(year);
	}

	@Override
	public List<SafetyVO> getSafety(String year) {
		return seoulRepository.getSafety(year);
	}

	@Override
	public List<SecuInfoVO> getSecuInfo(String year) {
		return seoulRepository.getSecuInfo(year);
	}

	@Override
	public List<PerceivedSecuVO> getPerceivedSecu(String year) {
		return seoulRepository.getPerceivedSecu(year);
	}

	@Override
	public List<DbGlobalCrimeVO> getGCrimeDB() {
		return seoulRepository.getGCrimeDB();
	}

	@Override
	public List<ApiGlobalCrimeVO> setApiGCrime() {
		System.out.println("스케쥴러동작확인////////////////////////");
		
		String homiDataTable = "T189403025013347";
		String violenceDataTable = "T185963025029492";	
		String sexualDataTable = "T185573025062134";
		String robberDataTable = "T187993025051517";
		String theftDataTable = "T189473025047133";
		String[] crimeArr = { homiDataTable, violenceDataTable, sexualDataTable, robberDataTable, theftDataTable };
		int[] yearArr = { 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017 };
		ArrayList<ApiGlobalCrimeVO> gcdArr = new ArrayList<ApiGlobalCrimeVO>();
		for (int j = 0; j < yearArr.length; j++) {
			for (int k = 0; k < crimeArr.length; k++) {
				JSONObject obj = getDataFromAPI(yearArr[j], crimeArr[k]);
				JSONArray arr2 = obj.getJSONArray("Sttsapitbldata").getJSONObject(1).getJSONArray("row");
				for (int i = 0; i < arr2.length(); i++) {
					ApiGlobalCrimeVO gcd = new ApiGlobalCrimeVO();
					JSONObject arr = arr2.getJSONObject(i);
					int yearVal = (arr.isNull("WRTTIME_IDTFR_ID")) ? 0 : arr.getInt("WRTTIME_IDTFR_ID");
					gcd.setYear(yearVal);
					String nameVal = (arr.isNull("ITM_NM")) ? "" : arr.getString("ITM_NM");
					gcd.setLocalName(nameVal);
					String crimeKindVal = (arr.isNull("STATBL_ID")) ? "" : arr.getString("STATBL_ID");
					gcd.setCrimeCode(crimeKindVal);
					double dtaVal = (arr.isNull("DTA_VAL")) ? 0.0 : arr.getDouble("DTA_VAL");
					gcd.setNewData(dtaVal);
					gcdArr.add(gcd);
				}
			}
		}
		return gcdArr;
	}

	@Override
	public JSONObject getDataFromAPI(int year, String crimeTable) {
		String url = "https://www.kicj.re.kr/crimestats/openapi/Sttsapitbldata.do";

		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
				.queryParam("key", "593096a998f840f889a9dff387e6a4f8").queryParam("DTACYCLE_CD", "YY")
				.queryParam("STATBL_ID", crimeTable).queryParam("WRTTIME_IDTFR_ID", year).queryParam("type", "json");

		ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

		if (response.getStatusCode().is2xxSuccessful()) {
			String responseBody = response.getBody();
			JSONObject obj = new JSONObject(responseBody);
			return obj;
		} else {
			return null;
		}
	}

}
