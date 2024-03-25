package com.spring.newseekers.predict.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.predict.service.IPredictService;

@Controller
public class PredictController {

	@Autowired
	@Qualifier("predictService")
	IPredictService predictService;
	
	@GetMapping("/predict")
	public String home() {
		return "/preview";
	}
	
	@GetMapping("/callPredict.do/{region}")
	public @ResponseBody ResponseEntity<Map<String,Object>> getPredData(@PathVariable String region){
		
		ResponseEntity<Map<String, Object>> result = predictService.getPredData(region);
		
		return result;
	}
	
    @GetMapping("/predict/previewPopup")
    public String showPopupPage() {
        return "/previewPopup";
    }
}
