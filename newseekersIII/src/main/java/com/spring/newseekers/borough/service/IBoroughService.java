package com.spring.newseekers.borough.service;

import java.util.List;
import java.util.Map;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.BoroughVO;
import com.spring.newseekers.borough.model.PerceivedSafetyVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;

public interface IBoroughService {
	List<ArRateVO> getArRate(String guNameValue);
	PopulationVO getPopulation(String guNameValue);
	SecufacilVO getSecufacil(String guNameValue);
	PerceivedSafetyVO getPerceivedSafetyOnload(String guNameValue);
	PerceivedSafetyVO getPerceivedSafety(Map<String, Object> mapperparam);
}
