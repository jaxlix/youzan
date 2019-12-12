package com.youzan.cloud.markets.biz;

import com.youzan.api.rpc.annotation.ExtensionService;
import com.youzan.cloud.extension.api.test.BizTestService;
import com.youzan.cloud.extension.param.test.BizTestRequest;
import com.youzan.cloud.extension.param.test.BizTestResponse;
import com.youzan.cloud.metadata.common.OutParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 扩展点测试实现类（业务扩展点）
 * @author <a href="mailto:wangxing@youzan.com">汪兴</a>
 * @create 2018-10-12 上午11:09
 */
@ExtensionService("bizTest")
public class BizTestServiceImpl implements BizTestService {

    private static final Logger logger = LoggerFactory.getLogger(BizTestServiceImpl.class);

    @Override
    public OutParam<BizTestResponse> invoke(BizTestRequest bizTestRequest) {
        //这里填写扩展点实现的业务逻辑，下面为示例代码
        logger.info("扩展点调用成功");
        OutParam param = new OutParam();
        BizTestResponse bizTestResponse = new BizTestResponse();
        bizTestResponse.setContent("hello world");
        bizTestResponse.setRequestId(1L);
        param.setCode("200");
        param.setSuccess(true);
        param.setMessage("ok");
        param.setData(bizTestResponse);
        return param;
    }
}
