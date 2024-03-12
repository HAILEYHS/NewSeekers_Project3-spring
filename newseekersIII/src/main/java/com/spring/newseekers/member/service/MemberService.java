package com.spring.newseekers.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.newseekers.member.model.MemberVO;
import com.spring.newseekers.member.repository.IMemberRepository;

@Service
public class MemberService implements IMemberService{
	@Autowired
	IMemberRepository memberRepository;

	@Override
	public void insertMember(MemberVO member) {
		memberRepository.insertMember(member);	
	}

	@Override
	public MemberVO selectMember(String user_id) {
		return memberRepository.selectMember(user_id);
	}
	
	@Override
	public MemberVO selectEmail(String email) {
		return memberRepository.selectEmail(email);
	}

	@Override
	public List<MemberVO> selectAllMembers() {
		return memberRepository.selectAllMembers();
	}

	@Override
	public void updateMember(MemberVO member) {
		memberRepository.updateMember(member);
	}

	@Override
	public void deleteMember(MemberVO member) {
		memberRepository.deleteMember(member);
	}

	@Override
	public String getPassword(String user_id) {
		return memberRepository.getPassword(user_id);
	}

	@Override
	public boolean selectId(String user_id) {
	    int count = memberRepository.selectId(user_id);
	    return count != 0;
	}
	
}
