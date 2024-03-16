package com.spring.newseekers.board.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.spring.newseekers.board.model.BoardVO;

public interface IBoardService {
	List<BoardVO> getList(Model model,int page);
	List<BoardVO> indexList(Model model, HttpSession session);
	void write(BoardVO board, HttpSession session, Model model);
	void upHit(String community_num);
	BoardVO contentView(String community_num, HttpSession session, Model model);
	BoardVO modifyView(String community_num, Model model);
	int modify(BoardVO board, Model model);
	BoardVO getPostById(String community_num);
	void delete(String community_num);
	BoardVO reply_view(String community_num, Model model);
	void replyShape(BoardVO board);
	void reply(BoardVO board);
	int getListSize();
}
