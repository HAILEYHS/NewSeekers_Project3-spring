package com.spring.newseekers.borough.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PopulationVO;
import com.spring.newseekers.borough.model.SecufacilVO;
import com.spring.newseekers.borough.service.IBoroughService;

@Controller
public class BoroughController {
	@Autowired
	IBoroughService boroughService;
	
	@GetMapping(value="/borough/borough_saftyInfo")
	public String home() {
		return "/borough/borough_saftyInfo";
	}
	
	@GetMapping(value="/borough/getArRate")
	@ResponseBody
	public List<ArRateVO> getArRate(@RequestParam("guNameValue") String guNameValue) {
		 List<ArRateVO> arRateData = boroughService.getArRate(guNameValue);
		 System.out.println("검거 비율 : " + arRateData);
		return arRateData;
	}
	
	@GetMapping(value="/borough/getPopulation")
	@ResponseBody
	public PopulationVO getPopulation(@RequestParam("guNameValue") String guNameValue){
		System.out.println("컨트롤러  getPopulation 메소드 들어옴 guNameValue="+guNameValue);
		PopulationVO population = boroughService.getPopulation(guNameValue);
		 System.out.println("인구수, 치안등급 : " + population);
		return population;
	}
	
	@GetMapping(value="/borough/getSecufacil")
	@ResponseBody
	public SecufacilVO getSecufacil(@RequestParam("guNameValue") String guNameValue){
		System.out.println("컨트롤러  getSecufacil 메소드 들어옴 guNameValue="+guNameValue);
		SecufacilVO secufacil = boroughService.getSecufacil(guNameValue);
		 System.out.println("치안 시설물 : " + secufacil);
		return secufacil;
	}
	
	@GetMapping(value = "/borough/getPerceivedSafety")
	@ResponseBody
	public String getPerceivedSafety(@RequestParam("year")String year,@RequestParam("guNameValue") String guNameValue) {
		System.out.println("컨트롤러  getPerceivedSafety 메소드 들어옴 year : "+ year +", guNameValue : " + guNameValue);
		String perceivedSafety = boroughService.getPerceivedSafety(year, guNameValue);
		System.out.println("체감 안전도 : " + perceivedSafety);
		return perceivedSafety;
	}
}
