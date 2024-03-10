package com.spring.newseekers.borough.repository;

import org.json.JSONArray;
import org.springframework.stereotype.Repository;

import com.spring.newseekers.borough.model.PoliceStationVO;

@Repository
public interface IPoliceStationRepository {
	
	int isTableExists();
    void createTable();
    void deleteData();
	void savePoliceSationData(JSONArray policeStationArray);
	void insert(PoliceStationVO policeStation);
}
