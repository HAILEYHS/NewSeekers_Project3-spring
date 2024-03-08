package com.spring.newseekers.borough.model;

public class PerceivedSafetyVO {
	private int year;
	private int local;
	private String guName;
	private String rank;
	
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
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
	
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	@Override
	public String toString() {
		return "PerceivedSafetyVO [year=" + year + ", local=" + local + ", guName=" + guName + ", rank=" + rank + "]";
	}
}
