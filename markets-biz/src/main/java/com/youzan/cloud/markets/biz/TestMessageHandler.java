package com.youzan.cloud.markets.biz;

import com.alibaba.fastjson.JSON;
import com.youzan.cloud.extension.api.message.MessageHandler;
import com.youzan.cloud.extension.param.MessageTestDTO;
import com.youzan.cloud.metadata.annotation.Topic;
import com.youzan.cloud.metadata.common.NotifyMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 消息消费测试实现类（消息扩展点）
 * @author <a href="mailto:wangxing@youzan.com">汪兴</a>
 * @create 2018-09-04 下午4:17
 */
@Topic("columbusdemo_helloworld_msg")
public class TestMessageHandler implements MessageHandler {

    public static NotifyMessage notifyMessage = null;

    private final static Logger logger = LoggerFactory.getLogger(TestMessageHandler.class);

    @Override
    public void handle(NotifyMessage message) {
        logger.info("message consume start");
        logger.info("message topic：" + message.getTopic());
        logger.info("message data：" + message.getData());
        logger.info("message consume end");
        MessageTestDTO messageTestDTO = JSON.parseObject(message.getData(), MessageTestDTO.class);
        //do something
        //for example
        notifyMessage = message;

    }
}
