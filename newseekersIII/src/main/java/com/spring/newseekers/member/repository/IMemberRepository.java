package com.spring.newseekers.member.repository;

import java.util.List;

import com.spring.newseekers.member.model.MemberVO;

public interface IMemberRepository {
	void insertMember(MemberVO member);
	MemberVO selectMember(String user_id);
	List<MemberVO> selectAllMembers();
	void updateMember(MemberVO member);
	void deleteMember(MemberVO member);
	String getPassword(String user_id);
}
