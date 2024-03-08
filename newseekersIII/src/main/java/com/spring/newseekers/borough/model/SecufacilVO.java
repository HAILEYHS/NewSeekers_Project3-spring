package com.spring.newseekers.borough.model;

public class SecufacilVO {
    private int year;
    private int local;
    private String guName;
    private int cctv;
    private int lights;
    private int policeStation;
    private int avg_cctv;
    private int avg_lights;
    private int avg_policestation;
    
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
	public int getCctv() {
		return cctv;
	}
	public void setCctv(int cctv) {
		this.cctv = cctv;
	}
	public int getLights() {
		return lights;
	}
	public void setLights(int lights) {
		this.lights = lights;
	}
	public int getPoliceStation() {
		return policeStation;
	}
	public void setPoliceStation(int policeStation) {
		this.policeStation = policeStation;
	}
	public int getAvg_cctv() {
		return avg_cctv;
	}
	public void setAvg_cctv(int avg_cctv) {
		this.avg_cctv = avg_cctv;
	}
	public int getAvg_lights() {
		return avg_lights;
	}
	public void setAvg_lights(int avg_lights) {
		this.avg_lights = avg_lights;
	}
	public int getAvg_policestation() {
		return avg_policestation;
	}
	public void setAvg_policestation(int avg_policestation) {
		this.avg_policestation = avg_policestation;
	}
	@Override
	public String toString() {
		return "SecufacilVO [year=" + year + ", local=" + local + ", guName=" + guName + ", cctv=" + cctv + ", lights="
				+ lights + ", policeStation=" + policeStation + ", avg_cctv=" + avg_cctv + ", avg_lights=" + avg_lights
				+ ", avg_policestation=" + avg_policestation + "]";
	}

    
}
