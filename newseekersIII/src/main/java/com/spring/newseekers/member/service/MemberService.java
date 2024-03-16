package com.spring.newseekers.member.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.spring.newseekers.member.model.MemberVO;
import com.spring.newseekers.member.repository.IMemberRepository;

@Service
public class MemberService implements IMemberService {
	@Autowired
	IMemberRepository memberRepository;

	@Override
	public String joinMember(MemberVO member, HttpSession session, Model model) {
		if (member == null) {
			model.addAttribute("error", "입력 값이 없습니다. 다시 입력해 주세요.");
			return "/member/join";
		}
		MemberVO dbMember = memberRepository.selectMember(member.getUser_id());
		if (dbMember != null) {
			model.addAttribute("error", "이미 사용중인 아이디입니다.");
			return "/member/join";
		} else {
			memberRepository.joinMember(member);
			session.invalidate();
			return "/member/login";
		}
	}

	@Override
	public Map<String, Boolean> confirmId(MemberVO member) {
		String user_id = member.getUser_id();
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		boolean result = selectId(user_id);
		response.put("result", result);
		return response;
	}

	@Override
	public String login(String user_id, String user_pw, HttpSession session, Model model) {
		MemberVO member = memberRepository.selectMember(user_id);
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

	public String logout(HttpSession session) {
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
	@Override
	public List<MemberVO> selectAllMembers() {
		return memberRepository.selectAllMembers();
	}

	@Override
	public String updateMemberForm(HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		if (user_id != null && !user_id.equals("")) {
			MemberVO member = memberRepository.selectMember(user_id);
			model.addAttribute("member", member);
			return "/member/modifyMember";
		} else {
			// user_id가 세션에 없을때(로그인하지 않았을 때)
			return "/member/login";
		}
	}
	
	@Override
	public String updateMember(MemberVO member, HttpSession session, Model model) {
	    try {
	        // 회원 정보 업데이트
	        memberRepository.updateMember(member);
	        model.addAttribute("member", member);
	        session.invalidate();
	        return "/member/login";
	    } catch (Exception e) {
	        model.addAttribute("message", e.getMessage());
	        e.printStackTrace();
	        return "/member/error";
	    }
	}
	
	@Override
	public String deleteMember(String user_pw, HttpSession session, Model model) {
		MemberVO member = new MemberVO();
		member.setUser_id((String) session.getAttribute("user_id"));
		String dbPassword = memberRepository.getPassword(member.getUser_id());
		String encodedMessage;
		if (user_pw != null && user_pw.equals(dbPassword)) {
			member.setUser_pw(user_pw);
			memberRepository.deleteMember(member);
			session.invalidate(); // 회원 삭제 후 로그아웃 처리
			
			try {
				encodedMessage = URLEncoder.encode("회원 탈퇴되었습니다.", "UTF-8");
				return "redirect:/?deleteMessage=" + encodedMessage;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		} else {
			try {
				encodedMessage = URLEncoder.encode("회원 탈퇴 중 오류가 발생하였습니다. 다시 시도해주세요.", "UTF-8");
				return "redirect:/member/modifyMember?deleteMessage=" + encodedMessage;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return"redirect:/";
	}

	@Override
	public boolean selectId(String user_id) {
		int count = memberRepository.selectId(user_id);
		return count != 0;
	}

}
