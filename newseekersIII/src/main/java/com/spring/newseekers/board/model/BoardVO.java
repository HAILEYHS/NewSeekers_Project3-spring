package com.spring.newseekers.board.model;

public class BoardVO {
	@Override
	public String toString() {
		return "BoardVO [community_num=" + community_num + ", title=" + title + ", user_id=" + user_id + ", content="
				+ content + ", date_created=" + date_created + ", hit=" + hit + ", group_num=" + group_num
				+ ", step_num=" + step_num + ", indent_num=" + indent_num + "]";
	}
	private int community_num;
	private String title;
	private String user_id;
	private String content;
	private String date_created;
	private int hit;
	private int group_num;
	private int step_num;
	private int indent_num;
	
	public int getCommunity_num() {
		return community_num;
	}
	public void setCommunity_num(int community_num) {
		this.community_num = community_num;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDate_created() {
		return date_created;
	}
	public void setDate_created(String date_created) {
		this.date_created = date_created;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public int getGroup_num() {
		return group_num;
	}
	public void setGroup_num(int group_num) {
		this.group_num = group_num;
	}
	public int getStep_num() {
		return step_num;
	}
	public void setStep_num(int step_num) {
		this.step_num = step_num;
	}
	public int getIndent_num() {
		return indent_num;
	}
	public void setIndent_num(int indent_num) {
		this.indent_num = indent_num;
	}
	
}
