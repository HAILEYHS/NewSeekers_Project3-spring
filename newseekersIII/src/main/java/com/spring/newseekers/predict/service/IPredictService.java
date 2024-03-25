package com.spring.newseekers.predict.service;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

public interface IPredictService {
	public ResponseEntity<Map<String, Object>> getPredData(String region);
}
