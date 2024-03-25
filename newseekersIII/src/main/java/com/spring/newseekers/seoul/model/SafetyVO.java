package com.spring.newseekers.seoul.model;

public class SafetyVO {
	private int local;
	private String guName;
	private int year;
	private int rowNum;
	private double y2021;
	private double y2022;
	private double y2023;
	

	public int getLocal() {
		return local;
	}
	public void setLocal(int local) {
		this.local = local;
	}
	public String getGuName() {
		return guName;
	}
	public void setGuName(String guName) {
		this.guName = guName;
	}
	
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getRowNum() {
		return rowNum;
	}
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	public double getY2021() {
		return y2021;
	}
	public void setY2021(double y2021) {
		this.y2021 = y2021;
	}
	public double getY2022() {
		return y2022;
	}
	public void setY2022(double y2022) {
		this.y2022 = y2022;
	}
	public double getY2023() {
		return y2023;
	}
	public void setY2023(double y2023) {
		this.y2023 = y2023;
	}
	@Override
	public String toString() {
		return "SafetyVO [local=" + local + ", guName=" + guName + ", year=" + year + ", rowNum=" + rowNum + ", y2021="
				+ y2021 + ", y2022=" + y2022 + ", y2023=" + y2023 + "]";
	}
	
}
