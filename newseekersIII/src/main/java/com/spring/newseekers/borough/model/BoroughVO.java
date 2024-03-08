package com.spring.newseekers.borough.model;


public class BoroughVO {
	private int year;
	private int local;
	private String guName;
	private int population;
	private int gu_secugrade;
	private int gu_cctv;
	private int gu_light;
	private int gu_police;
	private int ar_rate;
	
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
	public int getPopulation() {
		return population;
	}
	public void setPopulation(int population) {
		this.population = population;
	}
	public int getGu_secugrade() {
		return gu_secugrade;
	}
	public void setGu_secugrade(int gu_secugrade) {
		this.gu_secugrade = gu_secugrade;
	}
	public int getGu_cctv() {
		return gu_cctv;
	}
	public void setGu_cctv(int gu_cctv) {
		this.gu_cctv = gu_cctv;
	}
	public int getGu_light() {
		return gu_light;
	}
	public void setGu_light(int gu_light) {
		this.gu_light = gu_light;
	}
	public int getGu_police() {
		return gu_police;
	}
	public void setGu_police(int gu_police) {
		this.gu_police = gu_police;
	}
	public int getAr_rate() {
		return ar_rate;
	}
	public void setAr_rate(int ar_rate) {
		this.ar_rate = ar_rate;
	}
	@Override
	public String toString() {
		return "BoroughVO [year=" + year + ", local=" + local + ", guName=" + guName + ", population=" + population
				+ ", gu_secugrade=" + gu_secugrade + ", gu_cctv=" + gu_cctv + ", gu_light=" + gu_light + ", gu_police="
				+ gu_police + ", ar_rate=" + ar_rate + "]";
	}
}
