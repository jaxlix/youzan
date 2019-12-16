import React, { Component } from 'react';
import { Card, Radio, Dialog, Button, Notify, Input, Select, Option, DateRangePicker, Upload, Table } from 'zent';
import API from '@/services/api'
import { post, get, postJson } from '@/http/http';
import './add.css';
import 'zent/css/index.css';
import moment from 'moment';

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
            couponUrl: '',   // 活动路径
            meth: 1,    // 触发条件
            pos: 1,     // 频率限制
            startTime: "2019-12-21T04:47:52.172Z",
            endTime: "2019-12-29T04:47:52.172Z",
            shopId: "44704708",
            visible: false,
            showUpload: false,
            imgPosition: {
                left: "270px",
                top: "440px"
            },
            urlData: []
        };
    }

    // 提交
    submit = (values, zentForm) => {
        Notify.success(JSON.stringify(values));
    };

    // 活动名称
    model = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    // 展现样式
    changeStype = (e) => {
        console.log(e.target.value)
        if (e.target.value === 3) {
            this.setState({
                stype: e.target.value,
                showUpload: true
            })
        } else {
            this.setState({
                stype: e.target.value,
                showUpload: false
            })
        }
    }

    // 展示位置
    changeRare = (e) => {
        console.log(e.target.value)
        if (e.target.value === 1) {
            this.setState({
                rare: e.target.value,
                imgPosition: {
                    left: "270px",
                    top: "440px"
                }
            })
        } else if (e.target.value === 2) {
            this.setState({
                rare: e.target.value,
                imgPosition: {
                    left: "50px",
                    top: "440px"
                }
            })
        } else if (e.target.value === 3) {
            this.setState({
                rare: e.target.value,
                imgPosition: {
                    left: "270px",
                    top: "100px"
                }
            })
        } else if (e.target.value === 4) {
            this.setState({
                rare: e.target.value,
                imgPosition: {
                    left: "50px",
                    top: "100px"
                }
            })
        }
    }

    // 触发条件
    changeMeth = (e) => {
        console.log(e.target.value)
        this.setState({
            meth: e.target.value
        })
    }

    // 频率限制
    changePos = (e) => {
        console.log(e.target.value)
        this.setState({
            pos: e.target.value
        })
    }

    // 
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
        console.log(data[0].file)
        debugger
        let params = new URLSearchParams()
        params.append("multipartFile", data[0].file)
        params.append("shopId", this.state.shopId)
        post(API.reqUpload, params).then(res => {
            debugger
        })
        //   return new Promise(resolve => {
        //     setTimeout(() => {
        //       this.setState({
        //         imageList: data
        //       });
        //       resolve(data);
        //     }, 1000);
        //   });
    }

    handleActiveChange = (e) => {
        if(e.target.value === 1){
            get(API.queryReadPacks, { shopId: this.state.shopId }).then(res => {
                this.setState({
                    urlData: res.data,
                    visible: true
                })
            })
        }else{
            
        }
    }

    checkUrl = (e) => {
        console.log(e.target.value)
    }

    triggerDialog = (e) => {
        this.setState({
            visible: false
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
                                <img style={this.state.imgPosition} src={require("../assets/icon_small_red.png")} alt="" />
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
                                <div className={this.state.showUpload ? 'show' : 'hide'}>
                                    <Upload
                                        className='zent-upload-demo-pic'
                                        localOnly={true}
                                        maxSize={1 * 1024 * 1024}
                                        maxAmount={1}
                                        triggerInline
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
                                        <Radio value={1}>每次进入商品详情都出现</Radio><br />
                                        <Radio value={2}>查看该商品超过N次</Radio><br />
                                        <Radio value={3}>第N次查看该商品</Radio><br />
                                        <Radio value={4}>未完成购物车付款</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>频率限制：</label>
                                    <RadioGroup onChange={this.changePos} value={this.state.pos}>
                                        <Radio value={1}>不限制，每次符合条件都出现</Radio><br />
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
                                <Button type="primary" onClick={this.submit}>
                                    {this.state.rangeValue ? '保存修改' : '创建并生效'}
                                </Button>
                                <Button onClick={this.cancelClick} style={{ marginLeft: '20px' }}>取消</Button>
                            </div>
                        </div>
                    </Card>
                    <Dialog
                        visible={this.state.visible}
                        onClose={() => this.triggerDialog(false)}
                        title="请选择优惠券"
                    >
                        <Table
                            columns={
                                [
                                    {
                                        title: '',
                                        width: '5%',
                                        name: 'id',
                                        textAlign: 'center',
                                        bodyRender: data => <Radio value={data.couponId} onChange={this.checkUrl}></Radio>
                                    },
                                    {
                                        title: '名称',
                                        name: 'couponName',
                                        width: '10%',
                                        textAlign: 'center'
                                    },
                                    {
                                        title: '价值',
                                        name: 'money',
                                        width: '10%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{data.money}元</span>
                                    },
                                    {
                                        title: '使用条件',
                                        name: 'description',
                                        width: '45%',
                                        textAlign: 'center'
                                    },
                                    {
                                        title: '开始时间',
                                        name: 'startTime',
                                        width: '10%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{moment(data.startTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                    },
                                    {
                                        title: '结束时间',
                                        name: 'endTime',
                                        width: '10%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{moment(data.endTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                    }
                                ]
                            }
                            datasets={this.state.urlData}
                            rowKey="id"
                            pageInfo={this.state}
                        />
                    </Dialog>
                </div>
            </div >
        )
    }
}

export default Add;