package com.spring.newseekers.board.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.newseekers.board.model.BoardVO;

public interface IBoardRepository {
	List<BoardVO> getList(@Param("startRow") int startRow, @Param("endRow") int endRow);
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
