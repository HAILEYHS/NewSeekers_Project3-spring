package com.spring.newseekers.seoul.model;

public class SecuFaciVO {
	private int year;
	private int lights;
	private int cctv;
	private int policestation;
	private int policeman;
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getLights() {
		return lights;
	}
	public void setLights(int lights) {
		this.lights = lights;
	}
	public int getCctv() {
		return cctv;
	}
	public void setCctv(int cctv) {
		this.cctv = cctv;
	}
	public int getPolicestation() {
		return policestation;
	}
	public void setPolicestation(int policestation) {
		this.policestation = policestation;
	}
	public int getPoliceman() {
		return policeman;
	}
	public void setPoliceman(int policeman) {
		this.policeman = policeman;
	}
	@Override
	public String toString() {
		return "SecuFaciVO [year=" + year + ", lights=" + lights + ", cctv=" + cctv + ", policestation=" + policestation
				+ ", policeman=" + policeman + "]";
	}
	
	
}
