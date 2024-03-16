package com.spring.newseekers.member.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.member.model.MemberVO;
import com.spring.newseekers.member.service.IMemberService;

@Controller
public class MemberController {
	@Autowired
	IMemberService memberService;

	@GetMapping(value = "/member/join")
	public String showJoinForm() {
		return "/member/join";
	}

	@PostMapping(value = "/member/join")
	public String joinMember(MemberVO member, HttpSession session, Model model) {
		return memberService.joinMember(member, session, model);
	}

	// 회원가입시 중복 ID인지 검사하는 메소드
	@PostMapping(value = "/member/confirmId")
	// @ResponseBody 어노테이션 꼭 붙여야 JSON형식으로 받을 수 있음.
	@ResponseBody
	public Map<String, Boolean> confirmId(@RequestBody MemberVO member) {
		return memberService.confirmId(member);
	}

	@GetMapping(value = "/member/login")
	public String showLoginForm() {
		return "/member/login";
	}

	@PostMapping(value = "/member/login")
	public String login(String user_id, String user_pw, HttpSession session, Model model) {
		return memberService.login(user_id, user_pw, session, model);
	}

	@GetMapping(value = "/member/logout")
	public String logout(HttpSession session) {
		return memberService.logout(session);
	}

	@GetMapping(value = "/member/modifyMember")
	public String updateMemberForm(HttpSession session, Model model) {
		return memberService.updateMemberForm(session, model);
	}

	@PostMapping(value = "/member/modifyMember")
	public String updateMember(MemberVO member, HttpSession session, Model model) {
		return memberService.updateMember(member, session, model);
	}

	@PostMapping(value = "/member/delete")
	public String deleteMember(String user_pw, HttpSession session, Model model) {
		return memberService.deleteMember(user_pw, session, model);
	}
}
