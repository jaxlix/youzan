package com.youzan.cloud.markets.web;

import com.youzan.cloud.metadata.common.NotifyMessage;
import com.youzan.cloud.markets.biz.TestMessageHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * @author <a href="mailto:wangxing@youzan.com">汪兴</a>
 * @create 2018-09-10 下午1:04
 */
@RestController
@RequestMapping("/test")
public class TestController {

    private final static Logger logger = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/message")
    public NotifyMessage message() {
        if (TestMessageHandler.notifyMessage == null) {
            NotifyMessage notifyMessage = new NotifyMessage();
            notifyMessage.setData("数据为空，请发送测试数据");
            notifyMessage.setTopic("Topic为空");
            return notifyMessage;
        }
        return TestMessageHandler.notifyMessage;
    }

    @GetMapping("/index")
    public ModelAndView index(ModelAndView modelAndView) {
        modelAndView.setViewName("index");
        List<String> messageList=new ArrayList<String>();
        messageList.add("Hello, 这是有赞电商云！");
        messageList.add("欢迎使用电商云！！");
        messageList.add("有你有赞！！！");

        modelAndView.addObject("messageList", messageList);
        return modelAndView;
    }

}
