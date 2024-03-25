package com.spring.newseekers.seoul.controller;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.newseekers.seoul.model.CrimeVO;
import com.spring.newseekers.seoul.model.DbGlobalCrimeVO;
import com.spring.newseekers.seoul.model.GuGradeVO;
import com.spring.newseekers.seoul.model.PerceivedSecuVO;
import com.spring.newseekers.seoul.model.SafetyVO;
import com.spring.newseekers.seoul.model.SecuFaciVO;
import com.spring.newseekers.seoul.model.SecuIndexVO;
import com.spring.newseekers.seoul.model.SecuInfoVO;
import com.spring.newseekers.seoul.service.ISeoulService;

@Controller
public class SeoulController {

	@Autowired
	@Qualifier("seoulService")
	ISeoulService seoulService;

	@GetMapping("/seoul_main")
	public String home() {
		return "/seoul_main";
	}
	
	@GetMapping("/callGuGrade.do")
	public @ResponseBody List<GuGradeVO> getGuGradeNum(){
		List list = seoulService.getGuGradeNum();
		return list;
	}
	
	@GetMapping("/callCrime.do")
	public @ResponseBody List<CrimeVO> getCrimeNum(){
		List list = seoulService.getCrimeNum();
		return list;
	}
	
	@PostMapping("/callArrest.do")
	public @ResponseBody List<CrimeVO> getArrestNum(){
		List list = seoulService.getArrestNum();
		return list;
	}
	
	@GetMapping("/secuFaci.do")
	public @ResponseBody List<SecuFaciVO> getSecuFaci(){
		List list = seoulService.getSecuFaci();
		return list;
	}
	
	@GetMapping("/secuIndex.do/{year}")
	public @ResponseBody List<SecuIndexVO> getSecuIndex(@PathVariable String year){
		List list = seoulService.getSecuIndex(year);
		return list;
	}
	
	@GetMapping("/safety.do/{year}")
	public @ResponseBody List<SafetyVO> getSafety(@PathVariable String year){
		List list = seoulService.getSafety(year);
		return list;
	}
	
	@GetMapping("/secuInfo.do/{year}")
	public @ResponseBody List<SecuInfoVO> getSecuInfo(@PathVariable String year){
		List list = seoulService.getSecuInfo(year);
		return list;
	}
	
	@GetMapping("/perceivedSecuInfo.do/{year}")
	public @ResponseBody List<PerceivedSecuVO> getPerceivedSecu(@PathVariable String year){
		List list = seoulService.getPerceivedSecu(year);
		return list;
	}
	
	@GetMapping("/callGlobal.do")
	public @ResponseBody List<DbGlobalCrimeVO> getGCrimeDB(){
		List list = seoulService.getGCrimeDB();
		return list;
	}
	
	
}
