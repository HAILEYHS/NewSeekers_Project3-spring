package com.spring.newseekers.board.service;

import java.util.List;

import com.spring.newseekers.board.model.BoardVO;

public interface IBoardService {
	List<BoardVO> getList(int page);
	List<BoardVO> indexList();
	void write(BoardVO board);
	void upHit(String community_num);
	BoardVO contentView(String community_num);
	BoardVO modifyView(String community_num);
	int modify(BoardVO board);
	BoardVO getPostById(String community_num);
	void delete(String community_num);
	BoardVO reply_view(String community_num);
	void replyShape(BoardVO board);
	void reply(BoardVO board);
	int getListSize();
}
