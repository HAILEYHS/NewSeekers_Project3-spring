package com.spring.newseekers.seoul.model;

public class ApiGlobalCrimeVO {

private int year;
private String localName;
private String crimeCode;
private double newData;


@Override
public String toString() {
	return "ApiGlobalCrimeVO [year=" + year + ", localName=" + localName + ", crimeCode=" + crimeCode + ", newData="
			+ newData + "]";
}
public int getYear() {
	return year;
}
public void setYear(int year) {
	this.year = year;
}
public String getLocalName() {
	return localName;
}
public void setLocalName(String localName) {
	this.localName = localName;
}
public String getCrimeCode() {
	return crimeCode;
}
public void setCrimeCode(String crimeCode) {
	this.crimeCode = crimeCode;
}
public double getNewData() {
	return newData;
}
public void setNewData(double newData) {
	this.newData = newData;
}
	
}