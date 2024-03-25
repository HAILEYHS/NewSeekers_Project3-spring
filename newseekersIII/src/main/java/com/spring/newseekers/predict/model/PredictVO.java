package com.spring.newseekers.predict.model;

public class PredictVO {

	private int pub;
	private int grdp;
	private int single;
	private int year;
	private int population;
	private double area;
	private int popDensity;
	private int lights;
	private int cctv;
	private int policeStation;
	private int policeman;
	private int homicide;
	private int robber;
	private int sexual;
	private int theft;
	private int violence;
	private int y2022;
	private String region;
	
	
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public int getY2022() {
		return y2022;
	}
	
	public void setY2022(int y2022) {
		this.y2022 = y2022;
	}
	
	public int getPub() {
		return pub;
	}
	public void setPub(int pub) {
		this.pub = pub;
	}
	public int getGrdp() {
		return grdp;
	}
	public void setGrdp(int grdp) {
		this.grdp = grdp;
	}
	public int getSingle() {
		return single;
	}
	public void setSingle(int single) {
		this.single = single;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getPopulation() {
		return population;
	}
	public void setPopulation(int population) {
		this.population = population;
	}
	public double getArea() {
		return area;
	}
	public void setArea(double area) {
		this.area = area;
	}
	public int getPopDensity() {
		return popDensity;
	}
	public void setPopDensity(int popDensity) {
		this.popDensity = popDensity;
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
	public int getPoliceStation() {
		return policeStation;
	}
	public void setPoliceStation(int policeStation) {
		this.policeStation = policeStation;
	}
	public int getPoliceman() {
		return policeman;
	}
	public void setPoliceman(int policeman) {
		this.policeman = policeman;
	}
	public int getHomicide() {
		return homicide;
	}
	public void setHomicide(int homicide) {
		this.homicide = homicide;
	}
	public int getRobber() {
		return robber;
	}
	public void setRobber(int robber) {
		this.robber = robber;
	}
	public int getSexual() {
		return sexual;
	}
	public void setSexual(int sexual) {
		this.sexual = sexual;
	}
	public int getTheft() {
		return theft;
	}
	public void setTheft(int theft) {
		this.theft = theft;
	}
	public int getViolence() {
		return violence;
	}
	public void setViolence(int violence) {
		this.violence = violence;
	}
	
	@Override
	public String toString() {
		return "PredictVO [pub=" + pub + ", grdp=" + grdp + ", single=" + single + ", year=" + year + ", population="
				+ population + ", area=" + area + ", popDensity=" + popDensity + ", lights=" + lights + ", cctv=" + cctv
				+ ", policeStation=" + policeStation + ", policeman=" + policeman + ", homicide=" + homicide
				+ ", robber=" + robber + ", sexual=" + sexual + ", theft=" + theft + ", violence=" + violence
				+ ", y2022=" + y2022 + ", region=" + region + "]";
	}
	
	
	
}
