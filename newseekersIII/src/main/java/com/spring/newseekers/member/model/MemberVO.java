package com.spring.newseekers.member.model;

public class MemberVO {
	private String user_id;
	private String user_pw;
	private String user_pw2;
	private String name;
	private String date_created;
	private String email;
	private String address;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_pw() {
		return user_pw;
	}
	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}
	public String getUser_pw2() {
		return user_pw2;
	}
	public void setUser_pw2(String user_pw2) {
		this.user_pw2 = user_pw2;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDate_created() {
		return date_created;
	}
	public void setDate_created(String date_created) {
		this.date_created = date_created;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "MemberVO [user_id=" + user_id + ", user_pw=" + user_pw + ", user_pw2=" + user_pw2 + ", name=" + name
				+ ", date_created=" + date_created + ", email=" + email + ", address=" + address + "]";
	}
	
}
