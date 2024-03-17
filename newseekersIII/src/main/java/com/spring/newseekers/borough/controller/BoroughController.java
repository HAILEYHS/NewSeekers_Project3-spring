package com.spring.newseekers.borough.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.borough.model.ArRateVO;
import com.spring.newseekers.borough.model.PoliceStationVO;
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
		return boroughService.getArRate(guNameValue);
	}
	
	@GetMapping(value="/borough/getPopulation")
	@ResponseBody
	public PopulationVO getPopulation(@RequestParam("guNameValue") String guNameValue){
		System.out.println("guNameValue : " +guNameValue);
		return boroughService.getPopulation(guNameValue);
	}
	
	@GetMapping(value="/borough/getSecufacil")
	@ResponseBody
	public SecufacilVO getSecufacil(@RequestParam("guNameValue") String guNameValue){
		return boroughService.getSecufacil(guNameValue);
	}
	
	@GetMapping(value = "/borough/getPerceivedSafety")
	@ResponseBody
	public String getPerceivedSafety(@RequestParam("year")String year,@RequestParam("guNameValue") String guNameValue) {
		return boroughService.getPerceivedSafety(year, guNameValue);
	}
	
	@GetMapping(value="/borough/getPoliceStations")
	@ResponseBody
	public List<PoliceStationVO> getPoliceStations(@RequestParam("guNameValue") String guNameValue) {
		System.out.println(boroughService.getPoliceStations(guNameValue));
		return boroughService.getPoliceStations(guNameValue);
	}

}
