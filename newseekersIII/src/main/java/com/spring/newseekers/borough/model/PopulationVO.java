package com.spring.newseekers.borough.model;

public class PopulationVO {
	private String guName;
	private int population;
	private int gu_secugrade;
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
	@Override
	public String toString() {
		return "PopulationVO [guName=" + guName + ", population=" + population + ", gu_secugrade=" + gu_secugrade + "]";
	}
}
