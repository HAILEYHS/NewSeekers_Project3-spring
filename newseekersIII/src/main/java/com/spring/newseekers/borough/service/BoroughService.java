package com.spring.newseekers.borough.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PerceivedSafetyVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;
import com.spring.newseekers.borough.repository.IBoroughRepository;

@Service
public class BoroughService implements IBoroughService {
	
	@Autowired
	IBoroughRepository boroughRepository;
	
	@Override
	public List<ArRateVO> getArRate(String guNameValue) {
		return boroughRepository.getArRate(guNameValue);
	}
	
	@Override
	public PopulationVO getPopulation(String guNameValue) {
		return boroughRepository.getPopulation(guNameValue);
	}
	
	@Override
	public SecufacilVO getSecufacil(String guNameValue){
		System.out.println("서비스 getSecufacil메소드 들어옴. \r\n guNameValue : "+guNameValue);
		return boroughRepository.getSecufacil(guNameValue);
	}
	
	@Override
	public String getPerceivedSafety(String year, String guNameValue) {
		System.out.println("서비스 getPerceivedSafety메소드 들어옴. \r\n"+"  year: "+year+"    guNameValue : "+ guNameValue);
		return boroughRepository.getPerceivedSafety(year, guNameValue);
	}
}
