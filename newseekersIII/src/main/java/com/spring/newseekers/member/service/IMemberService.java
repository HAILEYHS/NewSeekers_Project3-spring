package com.spring.newseekers.member.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.spring.newseekers.member.model.MemberVO;

public interface IMemberService {
	String joinMember(MemberVO member, HttpSession session, Model model);
	Map<String, Boolean> confirmId(MemberVO member);
	boolean selectId(String user_id);
	String login(String user_id, String user_pw, HttpSession session, Model model);
	String logout(HttpSession session);
	List<MemberVO> selectAllMembers();
	String updateMemberForm(HttpSession session, Model model);
	String updateMember(MemberVO member, HttpSession session, Model model);
	String deleteMember(String user_pw, HttpSession session, Model model);
}
