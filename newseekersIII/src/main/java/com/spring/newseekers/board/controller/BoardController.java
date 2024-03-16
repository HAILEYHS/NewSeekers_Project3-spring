package com.spring.newseekers.board.controller;

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
		boardService.indexList(model, session);
		return "/Index";
	}

	@GetMapping(value = "/board/list")
	public String getList(int page, Model model) {
		boardService.getList(model,page);
		return "/board/list";
	}

	@GetMapping(value = "/board/content_view")
	public String contentView(String community_num, HttpSession session, Model model) {
		boardService.contentView(community_num, session, model);
		return "/board/content_view";
	}

	@PostMapping(value = "/board/modify_view")
	public String modifyView(String community_num, Model model) {
		boardService.modifyView(community_num, model);
		return "/board/modify_view";
	}

	@PostMapping(value = "/board/modify")
	public String modify(BoardVO board, Model model) {
		boardService.modify(board, model);
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
		boardService.write(board, session, model);
		return "redirect:/board/list?page=1";
	}

	@GetMapping(value = "/board/reply_view")
	public String replyView(String community_num, Model model) {
		boardService.reply_view(community_num, model);
		return "/board/reply_view";
	}

	@PostMapping(value = "/board/reply")
	public String reply(BoardVO board, Model model) {
		boardService.replyShape(board);
		boardService.reply(board);
		return "redirect:/board/list?page=1";
	}
}
