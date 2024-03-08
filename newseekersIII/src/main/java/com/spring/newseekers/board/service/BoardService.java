package com.spring.newseekers.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.newseekers.board.model.BoardVO;
import com.spring.newseekers.board.repository.IBoardRepository;

@Service
public class BoardService implements IBoardService {

	@Autowired
	IBoardRepository boardRepository;

	@Override
	public List<BoardVO> getList(int page) {
	    int showListNum = 10; // 한 페이지에 보여줄 글의 개수
	    int startRow = (page - 1) * showListNum + 1; // 페이지의 시작 행 번호
	    int endRow = startRow + showListNum - 1; // 페이지의 끝 행 번호
//	    System.out.println("startRow : "+startRow);
//	    System.out.println("endRow :"+endRow);
	    return boardRepository.getList(startRow, endRow); // boardRepository를 통해 글 목록을 가져와서 반환
	}


	@Override
	public List<BoardVO> indexList() {
		return boardRepository.indexList();
	}

	@Override
	public void write(BoardVO board) {
		boardRepository.write(board);
	}

	@Override
	public void upHit(String community_num) {
		boardRepository.upHit(community_num);
	}

	@Override
	public BoardVO contentView(String community_num) {
		return boardRepository.contentView(community_num);
	}
	
	@Override
	public int modify(BoardVO board) {
		return boardRepository.modify(board);
	}
	
	@Override
	public BoardVO modifyView(String community_num) {
		return boardRepository.modifyView(community_num);
	}
	
	@Override
	public BoardVO getPostById(String community_num) {
		return boardRepository.getPostById(community_num);
	}

	@Override
	public void delete(String community_num) {
		boardRepository.delete(community_num);
	}

	@Override
	public BoardVO reply_view(String community_num) {
		return boardRepository.reply_view(community_num);
	}

	@Override
	public void replyShape(BoardVO board) {
		boardRepository.replyShape(board);
	}

	@Override
	public void reply(BoardVO board) {
		boardRepository.reply(board);
	}

	@Override
	public int getListSize() {
		return boardRepository.getListSize();
	}

}
