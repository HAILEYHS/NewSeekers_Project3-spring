package com.spring.newseekers.borough.model;


public class PoliceStationVO {
	private int id;
	private String district;
	private String sub_district;
	private String department;
	private String tel;
	private String address;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getSub_district() {
		return sub_district;
	}
	public void setSub_district(String sub_district) {
		this.sub_district = sub_district;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "PoliceStationVO [id=" + id +", district=" + district
				+ ", sub_district=" + sub_district + ", department=" + department + ", tel=" + tel + ", address="
				+ address + "]";
	}
	
}
