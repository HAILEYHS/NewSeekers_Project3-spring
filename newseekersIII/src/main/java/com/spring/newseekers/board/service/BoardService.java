package com.spring.newseekers.board.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.spring.newseekers.board.model.BoardVO;
import com.spring.newseekers.board.repository.IBoardRepository;

@Service
public class BoardService implements IBoardService {

	@Autowired
	IBoardRepository boardRepository;

	@Override
	public List<BoardVO> getList(Model model, int page) {

		// System.out.println("컨트롤러 list 메소드 현재페이지 :"+page);
		int listSize = boardRepository.getListSize();
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

		int startRow = (page - 1) * showListNum + 1; // 페이지의 시작 행 번호
		int endRow = startRow + showListNum - 1; // 페이지의 끝 행 번호
		List<BoardVO> boardList = boardRepository.getList(startRow, endRow);
		model.addAttribute("boardList", boardList);
		model.addAttribute("pageBtnNum", pageBtnNum);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		return boardRepository.getList(startRow, endRow); // boardRepository를 통해 글 목록을 가져와서 반환
	}

	@Override
	public List<BoardVO> indexList(Model model, HttpSession session) {
		List<BoardVO> indexList = boardRepository.indexList();
		model.addAttribute("indexList", indexList);
		String userId = (String) session.getAttribute("user_id");
		if (userId != null) {
			model.addAttribute("loggedIn", true);
		} else {
			model.addAttribute("loggedIn", false);
		}
		return boardRepository.indexList();
	}

	@Override
	public void write(BoardVO board, HttpSession session, Model model) {
		String user_id = (String) session.getAttribute("user_id");
		board.setUser_id(user_id); // BoardVO에 사용자 아이디 설정
		boardRepository.write(board);
	}

	@Override
	public void upHit(String community_num) {
		boardRepository.upHit(community_num);
	}

	@Override
	public BoardVO contentView(String community_num, HttpSession session, Model model) {
		// 조회수 증가
		upHit(community_num);

		// 게시물 내용 가져오기
		BoardVO content = boardRepository.contentView(community_num);
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
		return boardRepository.contentView(community_num);
	}

	@Override
	public int modify(BoardVO board, Model model) {
		int result = boardRepository.modify(board);
		if (result == 1) {
			 model.addAttribute("message", "수정에 성공했습니다.");
		} else {
			 model.addAttribute("message", "수정에 실패했습니다.");
		}
		return boardRepository.modify(board);
	}

	@Override
	public BoardVO modifyView(String community_num, Model model) {
		BoardVO content = boardRepository.modifyView(community_num);
		model.addAttribute("content", content);
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
	public BoardVO reply_view(String community_num, Model model) {
		BoardVO content = boardRepository.reply_view(community_num);
		model.addAttribute("content", content);
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
