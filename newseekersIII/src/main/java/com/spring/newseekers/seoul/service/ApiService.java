package com.spring.newseekers.seoul.service;

import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.spring.newseekers.seoul.model.ApiGlobalCrimeVO;

@EnableScheduling
@Component
public class ApiService {
	private static final Logger logger = LoggerFactory.getLogger(ApiService.class);

	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Autowired
	private ISeoulService seoulService;

	
	@PostConstruct
	  @Scheduled
//	  (cron = "0 * * * * *")
	  (cron = "0 0 */12 * * *")
	  public void autoUpdate() throws Exception {
	    logger.info(new Date() + " 범죄와 형사사법 통계정보 API 스케쥴러 실행 ( 현재 설정: 매 1분 )");
	  }
	public void init() {

		List<ApiGlobalCrimeVO> gcdArr = seoulService.setApiGCrime();
		for (ApiGlobalCrimeVO gcd : gcdArr) {
			sqlSession.insert("mergeCrimeData", gcd);
		}
		;

	}

}
