package com.spring.newseekers.member.repository;

import java.util.List;

import com.spring.newseekers.member.model.MemberVO;

public interface IMemberRepository {
	void insertMember(MemberVO member);
	public int selectId(String user_id);
	MemberVO selectMember(String user_id);
	MemberVO selectEmail(String email);
	List<MemberVO> selectAllMembers();
	void updateMember(MemberVO member);
	void deleteMember(MemberVO member);
	String getPassword(String user_id);
}
