package com.spring.newseekers.borough.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.borough.model.BoroughVO;
import com.spring.newseekers.borough.model.PerceivedSafetyVO;
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
	@GetMapping(value = "/borough/getPerceivedSafetyOnload")
	@ResponseBody
	public PerceivedSafetyVO getPerceivedSafetyOnload(@RequestParam("guNameValue") String guNameValue) {
		System.out.println("컨트롤러  getPerceivedSafetyOnload 메소드 들어옴 guNameValue=" + guNameValue);
		PerceivedSafetyVO perceivedSafety = boroughService.getPerceivedSafetyOnload(guNameValue);
		System.out.println("체감 안전도 : " + perceivedSafety);
		return perceivedSafety;
	}
	@GetMapping(value = "/borough/getPerceivedSafety")
	@ResponseBody
	public PerceivedSafetyVO getPerceivedSafety(@RequestParam("year") String year,
			@RequestParam("guNameValue") String guNameValue) {
		System.out.println("컨트롤러  getPerceivedSafety 메소드 들어옴 year : "+ year +", guNameValue : " + guNameValue);
		Map<String, Object> mapperparam = new HashMap<String, Object>();
		mapperparam.put("year", "year"); // year 값을 설정
		mapperparam.put("guNameValue", "강남구"); // guNameValue 값을 설정
		
		PerceivedSafetyVO perceivedSafety = boroughService.getPerceivedSafety(mapperparam);
		System.out.println("체감 안전도 : " + perceivedSafety);
		return perceivedSafety;
	}
}
