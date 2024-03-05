package com.spring.newseekers.member.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.member.model.MemberVO;
import com.spring.newseekers.member.service.IMemberService;

@Controller
public class MemberController {
	@Autowired
	IMemberService memberService;

	@GetMapping(value = "/member/join")
	public String insertMember() {
		return "/member/join";
	}

	@PostMapping(value = "/member/join")
	public String insertMember(MemberVO member, HttpSession session, Model model) {
		memberService.insertMember(member);
		session.invalidate();
		return "/member/login";
	}

//	@PostMapping(value="/member/confirmId")
//	public Map<String, Boolean> confirmId(@RequestBody String user_id) {
//	    Map<String, Boolean> response = new HashMap<String, Boolean>();
//	    boolean result = false;
//	    System.out.println("user_id : " + user_id);
//	    if(user_id.trim().isEmpty()) {
//	        logger.info("id : " + user_id);
//	        result = false;
//	    } else {
//	        if (memberService.selectId(user_id)) {
//	            result = false;
//	        } else {
//	            result = true;
//	        }
//	    }
//	    response.put("result", result);
//	    return response;
//	}
	// 회원가입시 중복 ID인지 검사하는 메소드
	@PostMapping(value = "/member/confirmId")
	// @ResponseBody 어노테이션 꼭 붙여야 JSON형식으로 받을 수 있음.
	@ResponseBody
	public Map<String, Boolean> confirmId(@RequestBody MemberVO member) {
		String user_id = member.getUser_id();
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		boolean result = memberService.selectId(user_id);
		response.put("result", result);
		return response;
	}

	@GetMapping(value = "/member/login")
	public String login() {
		return "/member/login";
	}

	@PostMapping(value = "/member/login")
	public String login(String user_id, String user_pw, HttpSession session, Model model) {
		MemberVO member = memberService.selectMember(user_id);
//		if (member != null) {
//			String dbPassword = member.getUser_pw();
//			if (dbPassword.equals(user_pw)) {
//				// 비밀번호 일치
//				session.setAttribute("user_id", user_id);
//				session.setAttribute("name", member.getName());
//				session.setAttribute("email", member.getEmail());
//			} else {
//				// 비밀번호 불일치
//				session.invalidate();
//				model.addAttribute("message", "WRONG_PASSWORD");
//			}
//		} else {
//			// 아이디가 없음
//			session.invalidate();
//			model.addAttribute("message", "USER_NOT_FOUND");
//		}
//		return "redirect:/";
		if (member != null) {
			String dbPassword = member.getUser_pw();
			// 데이터베이스에서 가져온 비밀번호와 클라이언트가 입력한 비밀번호를 비교
			if (dbPassword.equals(user_pw)) {
				// 로그인 성공 시 세션에 사용자 정보 저장
				session.setAttribute("user_id", user_id);
				session.setAttribute("name", member.getName());
				session.setAttribute("email", member.getEmail());
				return "redirect:/"; // 로그인 성공 후 대시보드 페이지로 리다이렉트
			} else {
				// 비밀번호가 일치하지 않을 경우 에러 메시지를 모델에 추가하여 로그인 페이지로 리턴
				model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
				return "/member/login"; // 로그인 페이지로 이동
			}
		} else {
			// 입력한 아이디가 데이터베이스에 존재하지 않을 경우 에러 메시지를 모델에 추가하여 로그인 페이지로 리턴
			model.addAttribute("error", "존재하지 않는 사용자입니다.");
			return "/member/login"; // 로그인 페이지로 이동
		}
	}

	@GetMapping(value = "/member/logout")
	public String logout(HttpSession session, HttpServletRequest request) {
		session.invalidate();
		// 로그아웃 메시지를 URL에 추가하여 리다이렉트
		try {
			String encodedMessage = URLEncoder.encode("로그아웃되었습니다.", "UTF-8");
			return "redirect:/?logoutMessage=" + encodedMessage;
		} catch (UnsupportedEncodingException e) {
			// URL 인코딩 중 예외 발생 시 처리
			e.printStackTrace();
			return "redirect:/";
		}
	}

	@GetMapping(value = "/member/modifyMember")
	public String updateMember(HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		System.out.println("modifyMember GET 메소드 들어옴");
		if (user_id != null && !user_id.equals("")) {
			MemberVO member = memberService.selectMember(user_id);
			model.addAttribute("member", member);
			model.addAttribute("message", "UPDATE_USER_INFO");
			return "/member/modifyMember";
		} else {
			// user_id가 세션에 없을때(로그인하지 않았을 때)
			model.addAttribute("message", "NOT_LOGIN_USER");
			return "/member/login";
		}
	}

	@PostMapping(value = "/member/modifyMember")
//	public String updateMember(MemberVO member, HttpSession session, Model model) {
//		System.out.println("modifyMember POST 메소드 들어옴");
//		try {
//			memberService.updateMember(member);
//			model.addAttribute("message", "UPDATE_USER_INFO");
//			model.addAttribute("member", member);
//			session.setAttribute("email", member.getEmail());
//			return "/member/login";
//		} catch (Exception e) {
//			model.addAttribute("message", e.getMessage());
//			e.printStackTrace();
//			return "/member/error";
//		}
//	}

	public String updateMember(MemberVO member, HttpSession session, Model model) {
	    System.out.println("modifyMember POST 메소드 들어옴");
	    System.out.println("Id는 히든으로 보내줌"+ member);
	    try {
	        // 회원 정보 업데이트
	        memberService.updateMember(member);

//	        // 세션에 이메일 업데이트
//	        session.setAttribute("user_id", member.getUser_id());
//	        session.setAttribute("name", member.getName());
//	        session.setAttribute("email", member.getEmail());

	        model.addAttribute("message", "UPDATE_USER_INFO");
	        model.addAttribute("member", member);
	        System.out.println("수정되었는지 확인 : "+ member);
	        return "/member/login";
	    } catch (Exception e) {
	        model.addAttribute("message", e.getMessage());
	        e.printStackTrace();
	        return "/member/error";
	    }
	}

	@GetMapping(value = "/member/delete")
	public String deleteMember(HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		if (user_id != null && !user_id.equals("")) {
			MemberVO member = memberService.selectMember(user_id);
			model.addAttribute("member", member);
			// 다시 한번 확인하기 위해 비밀번호 입력
			model.addAttribute("message", "MEMBER_PW_RE");
			return "/member/delete";
		} else {
			// user_id가 세션에 없을때(로그인하지 않았을 때)
			model.addAttribute("message", "NOT_LOGIN_USER");
			return "/member/login";
		}
	}

	@PostMapping(value = "/member/delete")
	public String deleteMember(String user_pw, HttpSession session, Model model) {
		MemberVO member = new MemberVO();
		member.setUser_id((String) session.getAttribute("user_id"));
		String dbPassword = memberService.getPassword(member.getUser_id());
		if (user_pw != null && user_pw.equals(dbPassword)) {
			member.setUser_pw(user_pw);
			memberService.deleteMember(member);
			model.addAttribute("message", "DELETE_USER_INFO");
			session.invalidate(); // 회원 삭제 후 로구아웃 처리
			return "/";
		} else {
			model.addAttribute("message", "WRONG_PASSWORD");
			return "/member/delete";
		}

	}
}
