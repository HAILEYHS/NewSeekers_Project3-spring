package com.spring.newseekers;


import javax.servlet.ServletException;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.springframework.stereotype.Component;

@Component
public class DataLodingService {
	
    public void init() throws ServletException {
        // 초기화 작업 수행
        // globalData call
        JobDetail jobDetail = JobBuilder.newJob(DataLoadingQuartz.class)
        		.withIdentity("dataLoadingQuartz", "group1").build();
        

        Trigger trigger = TriggerBuilder.newTrigger().withIdentity("dataLoadingTrigger", "group1").startNow()
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInHours(24).repeatForever()).build();

        try {
            Scheduler scheduler = new StdSchedulerFactory().getScheduler();
            scheduler.start();
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            throw new ServletException("Error initializing Quartz scheduler", e);
        }
    }
    
}
