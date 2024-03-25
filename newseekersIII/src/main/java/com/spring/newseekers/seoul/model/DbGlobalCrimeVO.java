package com.spring.newseekers.seoul.model;

public class DbGlobalCrimeVO {
	
	private String name;
	private int year;
	private double homicide;
	private double robber;
	private double sexual;
	private double theft;
	private double violence;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public double getHomicide() {
		return homicide;
	}
	public void setHomicide(double homicide) {
		this.homicide = homicide;
	}
	public double getRobber() {
		return robber;
	}
	public void setRobber(double robber) {
		this.robber = robber;
	}
	public double getSexual() {
		return sexual;
	}
	public void setSexual(double sexual) {
		this.sexual = sexual;
	}
	public double getTheft() {
		return theft;
	}
	public void setTheft(double theft) {
		this.theft = theft;
	}
	public double getViolence() {
		return violence;
	}
	public void setViolence(double violence) {
		this.violence = violence;
	}
	@Override
	public String toString() {
		return "DbGlobalCrimeVO [name=" + name + ", year=" + year + ", homicide=" + homicide + ", robber=" + robber
				+ ", sexual=" + sexual + ", theft=" + theft + ", violence=" + violence + "]";
	}
	
	
}
