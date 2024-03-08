package com.spring.newseekers.borough.model;

public class ArRateVO {
	private int year;
	private int ar_rate;
	
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getAr_rate() {
		return ar_rate;
	}
	public void setAr_rate(int ar_rate) {
		this.ar_rate = ar_rate;
	}
	@Override
	public String toString() {
		return "ArRateVO [year=" + year + ", ar_rate=" + ar_rate + "]";
	}
}
