package com.spring.newseekers.predict.repository;

import java.util.List;
import java.util.Map;

import com.spring.newseekers.predict.model.PredictVO;

public interface IPredictRepository {
	public List<PredictVO> getPredData(String region);
}
