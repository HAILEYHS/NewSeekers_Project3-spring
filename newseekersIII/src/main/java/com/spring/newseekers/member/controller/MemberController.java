package com.spring.newseekers.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.spring.newseekers.member.model.MemberVO;
import com.spring.newseekers.member.service.IMemberService;

@Controller
public class MemberController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	IMemberService memberService;
	
	@GetMapping(value="/member/join")
	public String insertMember() {
		return "/member/join";
	}
	@PostMapping(value="/member/join")
	public String insertMember(MemberVO member, HttpSession session, Model model) {
		System.out.println("post로 join들어옴");
		try{
			if(!member.getUser_pw().equals(member.getUser_pw2())) {
			model.addAttribute("member", member);
			model.addAttribute("message", "MEMBER_PW_RE");
			return "redirect: /join";
		}
		memberService.insertMember(member);
		} catch (Exception e) {
			member.setUser_id(null);
			model.addAttribute("member", member);
			model.addAttribute("message", "ID_ALREADY_EXIST");
			return "/member/join";
		}
		session.invalidate();
		return "/";
	}
	
	@GetMapping(value="/member/login")
	public String login() {
		return "/member/login";
	}
	@PostMapping(value="/member/login")
	public String login(String user_id, String user_pw, HttpSession session, Model model) {
		MemberVO member = memberService.selectMember(user_id);
		if(member != null) {
			logger.info(member.toString());
			String dbPassword = member.getUser_pw();
			if(dbPassword.equals(user_pw)) {
				//비밀번호 일치
				session.setAttribute("user_id", user_id);
				session.setAttribute("name", member.getName());
				session.setAttribute("email", member.getEmail());
			} else {
				//비밀번호 불일치
				session.invalidate();
				model.addAttribute("message", "WRONG_PASSWORD");
			}
		} else {
			//아이디가 없음
			session.invalidate();
			model.addAttribute("message", "USER_NOT_FOUND");
		}
		return "/member/login";
	}
	@GetMapping(value="/member/logout")
	public String logout(HttpSession session, HttpServletRequest request) {
		//로그아웃
		session.invalidate();
		return "/";
	}// "/"안되면 redirect: 해보기
	
	@GetMapping(value="/member/modifyLogin")
	public String updateMember(HttpSession session, Model model) {
		String user_id = (String)session.getAttribute("user_id");
		if(user_id != null && !user_id.equals("")){
			MemberVO member = memberService.selectMember(user_id);
			model.addAttribute("member", member);
			model.addAttribute("message", "UPDATE_USER_INFO");
			return "/member/modifyMember";
		} else {
			//user_id가 세션에 없을때(로그인하지 않았을 때)
			model.addAttribute("message", "NOT_LOGIN_USER");
			return "/member/login";
		}
	}
	@PostMapping(value="/member/modifyLogin")
	public String updateMember(MemberVO member, HttpSession session, Model model) {
		try {
			memberService.updateMember(member);
			model.addAttribute("message", "UPDATE_USER_INFO");
			model.addAttribute("member", member);
			session.setAttribute("email", member.getEmail());
			return "/member/login";
		} catch (Exception e) {
			model.addAttribute("message", e.getMessage());
			e.printStackTrace();
			return "/member/error";
		}
	}
	
	@GetMapping(value="/member/delete")
	public String deleteMember(HttpSession session, Model model) {
		String user_id = (String)session.getAttribute("user_id");
		if(user_id != null && !user_id.equals("")){
			MemberVO member = memberService.selectMember(user_id);
			model.addAttribute("member", member);
			//다시 한번 확인하기 위해 비밀번호 입력
			model.addAttribute("message", "MEMBER_PW_RE");
			return "/member/delete";
		} else {
			//user_id가 세션에 없을때(로그인하지 않았을 때)
			model.addAttribute("message", "NOT_LOGIN_USER");
			return "/member/login";
		}
	}
	
	@PostMapping(value="/member/delete")
	public String deleteMember(String user_pw, HttpSession session, Model model) {
		MemberVO member = new MemberVO();
		member.setUser_id((String)session.getAttribute("user_id"));
		String dbPassword=memberService.getPassword(member.getUser_id());
		if(user_pw != null && user_pw.equals(dbPassword)) {
			member.setUser_pw(user_pw);
			memberService.deleteMember(member);
			model.addAttribute("message", "DELETE_USER_INFO");
			session.invalidate(); //회원 삭제 후 로구아웃 처리
			return "/";
		} else {
			model.addAttribute("message", "WRONG_PASSWORD");
			return "/member/delete";
		}
		
	}
}
