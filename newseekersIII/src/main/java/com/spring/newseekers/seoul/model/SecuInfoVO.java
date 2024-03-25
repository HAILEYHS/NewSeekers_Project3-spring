package com.spring.newseekers.seoul.model;

public class SecuInfoVO {

	private int rowNumber;
	private String guName;
	private double secuValue;
	public int getRowNumber() {
		return rowNumber;
	}
	public void setRowNumber(int rowNumber) {
		this.rowNumber = rowNumber;
	}
	public String getGuName() {
		return guName;
	}
	public void setGuName(String guName) {
		this.guName = guName;
	}
	public double getSecuValue() {
		return secuValue;
	}
	public void setSecuValue(double secuValue) {
		this.secuValue = secuValue;
	}
	@Override
	public String toString() {
		return "SecuInfoVO [rowNumber=" + rowNumber + ", guName=" + guName + ", secuValue=" + secuValue + "]";
	}
	
	
	
	
	
	
}
