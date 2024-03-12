package com.spring.newseekers.board.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.spring.newseekers.board.model.BoardVO;
import com.spring.newseekers.board.service.IBoardService;

@Controller
public class BoardController {
	@Autowired
	IBoardService boardService;

	@GetMapping(value = "/board/home")
	public String home() {
		return "/board/home";
	}

	// nav바에 회원인지 확인하는 세션

	@GetMapping(value = "/")
	public String indexList(Model model, HttpSession session) {
		List<BoardVO> indexList = boardService.indexList();
		model.addAttribute("indexList", indexList);
		String userId = (String) session.getAttribute("user_id");
		if (userId != null) {
			model.addAttribute("loggedIn", true);
		} else {
			model.addAttribute("loggedIn", false);
		}
		return "/Index";
	}

	@GetMapping(value = "/board/list")
	public String getList(int page, Model model) {
		List<BoardVO> boardList = boardService.getList(page);
		// System.out.println("컨트롤러 list 메소드 현재페이지 :"+page);
		int listSize = boardService.getListSize();
		int showListNum = 10;
		int showPBtnNum = 5;
		int pageBtnNum = 0;
		if (listSize != 0) {
			pageBtnNum = (int) Math.ceil(listSize / showListNum);
			if (listSize % showListNum != 0) {
				pageBtnNum += 1;
			}
		}
		int startPage = Math.max(1, page - showPBtnNum / 2);
		int endPage = Math.min(pageBtnNum, startPage + showPBtnNum - 1);
		model.addAttribute("boardList", boardList);
		// System.out.println("리스트 : "+boardList);
		model.addAttribute("pageBtnNum", pageBtnNum);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		return "/board/list";
	}

	@GetMapping(value = "/board/content_view")
	public String contentView(String community_num, HttpSession session, Model model) {
		// 조회수 증가
		boardService.upHit(community_num);

		// 게시물 내용 가져오기
		BoardVO content = boardService.contentView(community_num);
		model.addAttribute("content_view", content);

		// 세션에서 현재 사용자의 user_id 값 가져오기
		String userId = (String) session.getAttribute("user_id");

		// 세션의 user_id 값과 게시물의 작성자인 user_id 값 비교
		if (userId != null && userId.equals(content.getUser_id())) {
			// 현재 사용자가 게시물 작성자인 경우
			model.addAttribute("showEditButton", true); // 수정 및 삭제 버튼 표시 여부 설정
		} else {
			// 현재 사용자가 게시물 작성자가 아닌 경우
			model.addAttribute("showEditButton", false); // 수정 및 삭제 버튼 표시 여부 설정
		}
		return "/board/content_view";
	}

	@PostMapping(value = "/board/modify_view")
	public String modifyView(String community_num, Model model) {
		BoardVO content = boardService.modifyView(community_num);
		model.addAttribute("content", content);
		System.out.println("modifyView 정보 : " + content);
		return "/board/modify_view";
	}

	@PostMapping(value = "/board/modify")
	public String modify(BoardVO board, Model model) {
		System.out.println("modify 메소드에 들어온 board 정보 : "+board);
		int result = boardService.modify(board);
		if (result == 1) {
			 model.addAttribute("message", "수정에 성공했습니다.");
		} else {
			 model.addAttribute("message", "수정에 실패했습니다.");
		}
		return "redirect:/board/list?page=1"; // 수정 후 목록 페이지로 리다이렉트
	}

	@GetMapping(value = "/board/delete")
	public String delete(String community_num, Model model) {
		boardService.delete(community_num);
		return "redirect:/board/list?page=1";
	}

	@GetMapping(value = "/board/write_view")
	public String writeView(HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		model.addAttribute("user_id", user_id);
		return "/board/write_view";
	}

	@PostMapping(value = "/board/write")
	public String write(BoardVO board, HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		board.setUser_id(user_id); // BoardVO에 사용자 아이디 설정
		boardService.write(board);
		return "redirect:/board/list?page=1";
	}

	@GetMapping(value = "/board/reply_view")
	public String replyView(String community_num, Model model) {
		BoardVO content = boardService.reply_view(community_num);
		model.addAttribute("content", content);
		return "/board/reply_view";
	}

	@PostMapping(value = "/board/reply")
	public String reply(BoardVO board, Model model) {
		System.out.println("reply 들어옴");
		boardService.replyShape(board);
		boardService.reply(board);
		return "redirect:/board/list?page=1";
	}
}
