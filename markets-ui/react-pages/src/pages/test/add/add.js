import React, { Component } from 'react';
import { Card, Radio, Dialog, Button, Notify, Input, Select, Option, DateRangePicker,Upload } from 'zent';
import API from '@/services/api'
import { post, get } from '@/http/http';
import './add.css';
import 'zent/css/index.css';
const RadioGroup = Radio.Group;

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: [],
            datasets: [], // 数据源
            current: 1,
            total: 100,
            pageSize: 10,
            pageSizeOptions: [20, 30],
            isOnlyView: false,
            time: '',
            rangeValue: null,
            name: '',   // 活动名称
            stype: 1,   // 样式
            rare: 1,   // 位置
            couponUrl:'',   // 活动路径
            meth: 1,    // 触发条件
            pos: 1,     // 频率限制
            startTime: "2019-12-21T04:47:52.172Z",
            endTime: "2019-12-29T04:47:52.172Z",
            shopId: "44704708",
            visible: false
        };
    }

    onCheckboxChange = checkedList => {
        this.setState({ checkedList });
    };

    submit = (values, zentForm) => {
        Notify.success(JSON.stringify(values));
    };

    resetForm = () => {
        this.props.zentForm.resetFieldsValue();
    };

    handleSubmit = d => {
        console.log(d)
    }

    model = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changeStype = (e) => {
        console.log(e.target.value)
        this.setState({
            stype: e.target.value
        })
    }
    changeRare = (e) => {
        console.log(e.target.value)
        this.setState({
            rare: e.target.value
        })
    }
    changeMeth = (e) => {
        console.log(e.target.value)
        this.setState({
            meth: e.target.value
        })
    }
    changePos = (e) => {
        console.log(e.target.value)
        this.setState({
            pos: e.target.value
        })
    }

    fetchNetworkImage(data) {
        return new Promise(resolve => {
          this.setState({
            imageList: [{
              file: null,
              src: data
            }]
          });
          resolve(data);
        });
      }
  
      updateLocalImage(data) {
          return new Promise(resolve => {
            setTimeout(() => {
              this.setState({
                imageList: data
              });
              resolve(data);
            }, 1000);
          });
      }

      handleActiveChange = (e) => {
          debugger
          this.setState({
              visible: true
          })
      }

    render() {
        return (
            <div className="index">
                <div className="App-content">
                    <Card style={{ width: "100%" }} title="创建新红包活动">
                        <div className="contentWrap">
                            <div className="left_wrap">
                                <img className="left_img" src={require("../assets/app_page.png")} alt="" />
                            </div>
                            <div className="formWrap">
                                <div className="form-item">
                                    <label><i>*</i>活动名称：</label>
                                    <Input value={this.state.name} onInput={this.model} placeholder="请输入活动名称" />
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>展现样式：</label>
                                    <RadioGroup onChange={this.changeStype} value={this.state.stype}>
                                        <Radio value={1}>动态红包</Radio>
                                        <Radio value={2}>动态宝箱</Radio>
                                        <Radio value={3}>自定义</Radio>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <Upload
                                        className='zent-upload-demo-pic'
                                        maxSize={1 * 1024 * 1024}
                                        maxAmount={2}
                                        triggerInline
                                        tips="建议尺寸：640 x 640 像素"
                                        onFetch={this.fetchNetworkImage.bind(this)}
                                        onUpload={this.updateLocalImage.bind(this)}
                                        errorMessages={{
                                        overMaxSize: (data) => `Over size: ${data.maxSize}`, // function
                                        overMaxAmount: 'So many', // string
                                        wrongMimeType: false || null || '' || (() => false) // show nothing
                                        }}
                                    />
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>展示位置：</label>
                                    <RadioGroup onChange={this.changeRare} value={this.state.rare}>
                                        <Radio value={1}>右下</Radio>
                                        <Radio value={2}>左下</Radio>
                                        <Radio value={3}>右上</Radio>
                                        <Radio value={4}>左上</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>活动路径：</label>
                                    <Select placeholder="请选择活动路径" value={this.state.couponUrl} onChange={this.handleActiveChange}>
                                        <Option value={1}>优惠券</Option>
                                        <Option value={2}>自定义地址</Option>
                                    </Select>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>触发条件：</label>
                                    <RadioGroup onChange={this.changeMeth} value={this.state.meth}>
                                        <Radio value={1}>每次进入商品详情都出现</Radio><br/>
                                        <Radio value={2}>查看该商品超过N次</Radio><br/>
                                        <Radio value={3}>第N次查看该商品</Radio><br/>
                                        <Radio value={4}>未完成购物车付款</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>频率限制：</label>
                                    <RadioGroup onChange={this.changePos}  value={this.state.pos}>
                                        <Radio value={1}>不限制，每次符合条件都出现</Radio><br/>
                                        <Radio value={2}>直到用户点击，再不出现</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>投放时间：</label>
                                    <DateRangePicker
                                        className="zent-picker-demo"
                                        value={this.state.time}
                                        onChange={this.onChangeRange}
                                    />
                                </div>
                                <div className="form-item"></div>
                                <Button type="primary" htmlType="submit">
                                    {this.state.rangeValue ? '保存修改' : '创建并生效'}
                                </Button>
                                <Button onClick={this.cancelClick} style={{ marginLeft: '20px' }}>取消</Button>
                            </div>
                        </div>
                    </Card>
                    <Dialog
                        visible={this.state.visible}
                        onClose={() => this.triggerDialog(false)}
                        title="对话框"
                        >
                        <p>对话框内容</p>
                        <p>对话框其他内容</p>
                    </Dialog>
                </div>
            </div >
        )
    }
}

export default Add;