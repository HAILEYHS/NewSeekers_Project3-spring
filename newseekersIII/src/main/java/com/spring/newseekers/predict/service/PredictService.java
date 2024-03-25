package com.spring.newseekers.predict.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.spring.newseekers.predict.model.PredictVO;
import com.spring.newseekers.predict.repository.IPredictRepository;

@Service
public class PredictService implements IPredictService {

	@Autowired
	private IPredictRepository predictRepository;

	@Override
	public ResponseEntity<Map<String, Object>> getPredData(String region) {
		List<PredictVO> queryResult = predictRepository.getPredData(region);

		Map<String, Object> data = new HashMap<String, Object>();

		List<Integer> population = new ArrayList<Integer>();
		int grade = 0;

		List<Integer> single = new ArrayList<Integer>();
		List<Integer> pub = new ArrayList<Integer>();
		List<Integer> cctv = new ArrayList<Integer>();
		List<Integer> policeman = new ArrayList<Integer>();
		List<Integer> policeStation = new ArrayList<Integer>();
		List<Integer> lights = new ArrayList<Integer>();

		List<Integer> homicide = new ArrayList<Integer>();
		List<Integer> robber = new ArrayList<Integer>();
		List<Integer> sexual = new ArrayList<Integer>();
		List<Integer> theft = new ArrayList<Integer>();
		List<Integer> violence = new ArrayList<Integer>();

		Map<String, Object> facilitySelector = new HashMap<String, Object>();
		Map<String, Object> crimeData = new HashMap<String, Object>();
		
		for (PredictVO predictVO : queryResult) {

			single.add(predictVO.getSingle());
			pub.add(predictVO.getPub());
			policeman.add(predictVO.getPoliceman());
			cctv.add(predictVO.getCctv());
			policeStation.add(predictVO.getPoliceStation());
			lights.add(predictVO.getLights());

			homicide.add(predictVO.getHomicide());
			robber.add(predictVO.getRobber());
			sexual.add(predictVO.getSexual());
			theft.add(predictVO.getTheft());
			violence.add(predictVO.getViolence());

			grade = predictVO.getY2022();
			population.add(predictVO.getPopulation());
		}
		
		if (region.equals("강남구")) {
			facilitySelector.put("single", single);
			facilitySelector.put("pub", pub);
			facilitySelector.put("policeman", policeman);
			facilitySelector.put("cctv", cctv);
		} else if (region.equals("송파구")) {
			facilitySelector.put("policeStation", policeStation);
			facilitySelector.put("pub", pub);
			facilitySelector.put("cctv", cctv);
			facilitySelector.put("policeman", policeman);
			facilitySelector.put("lights", lights);
		} else if (region.equals("영등포구")) {
			facilitySelector.put("lights", lights);
			facilitySelector.put("pub", pub);
			facilitySelector.put("cctv", cctv);
			facilitySelector.put("policeStation", policeStation);
			facilitySelector.put("policeman", policeman);
		} else if (region.equals("성동구")) {
			facilitySelector.put("pub", pub);
			facilitySelector.put("cctv", cctv);
			facilitySelector.put("single", single);
			facilitySelector.put("lights", lights);
			facilitySelector.put("policeman", policeman);
		} else if (region.equals("노원구")) {
			facilitySelector.put("policeStation", policeStation);
			facilitySelector.put("cctv", cctv);
			facilitySelector.put("single", single);
			facilitySelector.put("lights", lights);
			facilitySelector.put("policeman", policeman);
		} else if (region.equals("강북구")) {
			facilitySelector.put("lights", lights);
			facilitySelector.put("pub", pub);
			facilitySelector.put("cctv", cctv);
			facilitySelector.put("single", single);
			facilitySelector.put("policeStation", policeStation);
		}
			crimeData.put("homicide", homicide);
			crimeData.put("robber", robber);
			crimeData.put("sexual", sexual);
			crimeData.put("theft", theft);
			crimeData.put("violence", violence);

			data.put("facilitySelector", facilitySelector);
			data.put("crimeData", crimeData);
			data.put("population", population);
			data.put("grade", grade);


		return ResponseEntity.ok().body(data);
	}
}
