package com.spring.newseekers.borough.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PerceivedSafetyVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;

public interface IBoroughRepository {

	List<ArRateVO> getArRate(String guNameValue);
	PopulationVO getPopulation(String guNameValue);
	SecufacilVO getSecufacil(String guNameValue);
	PerceivedSafetyVO getPerceivedSafetyOnload(String guNameValue);
	PerceivedSafetyVO getPerceivedSafety(Map<String, Object> mapperparam);
}
