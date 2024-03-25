package com.spring.newseekers.seoul.service;

import java.util.List;

import org.json.JSONObject;

import com.spring.newseekers.seoul.model.ApiGlobalCrimeVO;
import com.spring.newseekers.seoul.model.CrimeVO;
import com.spring.newseekers.seoul.model.DbGlobalCrimeVO;
import com.spring.newseekers.seoul.model.GuGradeVO;
import com.spring.newseekers.seoul.model.PerceivedSecuVO;
import com.spring.newseekers.seoul.model.SafetyVO;
import com.spring.newseekers.seoul.model.SecuFaciVO;
import com.spring.newseekers.seoul.model.SecuIndexVO;
import com.spring.newseekers.seoul.model.SecuInfoVO;

public interface ISeoulService {
	
	public List<CrimeVO> getCrimeNum();
	public List<CrimeVO> getArrestNum();
	public List<GuGradeVO> getGuGradeNum();
	public List<SecuFaciVO> getSecuFaci(); 
	public List<SecuIndexVO> getSecuIndex(String year);
	public List<SafetyVO> getSafety(String year);
	public List<SecuInfoVO> getSecuInfo(String year);
	public List<PerceivedSecuVO> getPerceivedSecu(String year);
	public List<DbGlobalCrimeVO> getGCrimeDB();
	public List<ApiGlobalCrimeVO> setApiGCrime();
	public JSONObject getDataFromAPI(int year, String crimeTable);
	
}
