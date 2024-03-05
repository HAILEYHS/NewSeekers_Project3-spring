package com.spring.newseekers.board.controller;

import java.util.List;

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
	@GetMapping(value="/board/home")
	public String home() {
		return "/board/home";
	}
	@GetMapping(value="/board/list")
	public String getList(int currentPage, Model model){
		List<BoardVO> boardList = boardService.getList(currentPage);
		System.out.println("컨트롤러 list 메소드 현재페이지 :"+currentPage);
		int listSize=boardService.getListSize();
		int showListNum = 10;
		int showPBtnNum = 5;
		int pageBtnNum = 0;
		if(listSize != 0) {
			pageBtnNum = (int) Math.ceil(listSize/showListNum);
			if(listSize % showListNum != 0) {
				pageBtnNum += 1;
			}
		}
		int startPage = Math.max(1, currentPage - showPBtnNum / 2);
		int endPage = Math.min(pageBtnNum, startPage+showPBtnNum-1);
		model.addAttribute("boardList", boardList);
		System.out.println("리스트 : "+boardList);
		model.addAttribute("pageBtnNum", pageBtnNum);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		return "/board/list";
	}
	
	@GetMapping(value = "/")
	public String indexList(Model model) {
		List<BoardVO> indexList = boardService.indexList();
		model.addAttribute("indexList", indexList);
		return "/Index";
	}

	@GetMapping(value = "/board/content_view")
	public String contentView(String community_num, Model model) {
		boardService.upHit(community_num);
		BoardVO content = boardService.contentView(community_num);
		model.addAttribute("content_view", content);
		return "/board/content_view";
	}
	@GetMapping(value = "/board/modify_view")
	public String modifyView(String community_num, Model model) {
		BoardVO content = boardService.modifyView(community_num);
		model.addAttribute("content", content);
		return "/board/modify_view";
	}
	@PostMapping(value = "/board/modify")
	public String modify(BoardVO board, Model model) {
		int result = boardService.modify(board);
		if (result == 1) {
			//model.addAttribute("message", "수정에 성공했습니다.");
		} else {
	//		model.addAttribute("message", "수정에 실패했습니다.");
		}
		return "redirect:/board/list?page=1"; // 수정 후 목록 페이지로 리다이렉트
	}
	@GetMapping(value = "/board/delete")
	public String delete(String community_num, Model model) {
		boardService.delete(community_num);
		return "redirect:/board/list?page=1";
	}
	@GetMapping(value="/board/write_view")
	public String writeView() {
		return "/board/write_view";
	}
	@PostMapping(value="/board/write")
	public String write(BoardVO board, Model model) {
		boardService.write(board);
		return "redirect:/board/list?page=1";
	}
	@GetMapping(value="/board/reply_view")
	public String replyView(String community_num, Model model) {
		BoardVO content = boardService.reply_view(community_num);
		model.addAttribute("content", content);
		return "/board/reply_view";
	}
	@PostMapping(value="/board/reply")
	public String reply(BoardVO board, Model model) {
		System.out.println("reply 들어옴");
		boardService.replyShape(board);
		boardService.reply(board);
		return "redirect:/board/list?page=1";
	}
}
