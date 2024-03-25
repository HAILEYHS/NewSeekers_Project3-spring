package com.spring.newseekers.seoul.model;

public class GuNameVO {
	private int local;
	private String guName;
	public int getLocal() {
		return local;
	}
	public void setLocal(int local) {
		this.local = local;
	}
	public String getGuname() {
		return guName;
	}
	public void setGuname(String guname) {
		this.guName = guname;
	}
	@Override
	public String toString() {
		return "GuNameVO [local=" + local + ", guname=" + guName + "]";
	}
	
	
}
