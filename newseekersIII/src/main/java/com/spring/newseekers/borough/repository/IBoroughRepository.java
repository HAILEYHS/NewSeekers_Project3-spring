package com.spring.newseekers.borough.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PoliceStationVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;

@Repository
public interface IBoroughRepository {

	List<ArRateVO> getArRate(String guNameValue);
	PopulationVO getPopulation(String guNameValue);
	SecufacilVO getSecufacil(String guNameValue);
	String getPerceivedSafety(@Param("year")String year,@Param("guNameValue") String guNameValue);
	List<PoliceStationVO> getPoliceStations(String guNameValue);
}
