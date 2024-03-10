package com.spring.newseekers.borough.service;

import java.util.List;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PoliceStationVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;

public interface IBoroughService {
	List<ArRateVO> getArRate(String guNameValue);
	PopulationVO getPopulation(String guNameValue);
	SecufacilVO getSecufacil(String guNameValue);
	String getPerceivedSafety(String year, String guNameValue);
	List<PoliceStationVO> getPoliceStations(String guNameValue);
}
