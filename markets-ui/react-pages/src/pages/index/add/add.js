import React, { Component } from 'react';
import { Card, Radio, Dialog, Button, Notify, Input, Select, Option, DateRangePicker, Upload, Table } from 'zent';
import API from '@/services/api'
import { post, get, postJson } from '@/http/http';
import './add.css';
import 'zent/css/index.css';
import moment from 'moment';
import * as lottie_redpack from '../assets/lottie_redpack.json'
import * as lottie_box from '../assets/lottie_box.json'
import Lottie from 'lottie-react-web'

const RadioGroup = Radio.Group;

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: [],
            datasets: [], // 数据源
            current: 1,
            total: 0,
            pageSize: 100,
            pageSizeOptions: [20, 30],
            isOnlyView: false,
            rangeValue: false,
            id: '',
            name: '',   // 活动名称
            stype: 1,   // 样式
            rare: 1,   // 频率限制
            couponUrlType: '',
            couponUrl: '',   // 活动路径
            couponName: '',
            couponId: '',   // 
            meth: 1,    // 触发条件
            pos: 1,     // 位置
            time: ['',''],
            startTime: "",
            endTime: "",
            shopId: "44704708",
            visible: false,
            showUpload: false,
            imgPosition: {
                left: "270px",
                top: "440px"
            },
            urlData: [],
            editUrl: false,
            imgUrl: '',
            http: "http://"
        };
    }
    componentDidMount(){
        let editData = sessionStorage.getItem('editData');
        if(editData){
            editData = JSON.parse(editData);
            console.log(editData)
            this.setState({
                id: editData.id,
                shopId: editData.shopId,
                name: editData.name,
                stype: editData.stype,
                imgUrl: editData.picture,
                pos: editData.pos,
                couponUrlType: editData.couponId ? 1 : 2,
                couponId: editData.couponId,
                couponName: editData.couponName,
                couponUrl: editData.couponUrl.split("://")[1],
                http: editData.couponUrl.split("://")[0]+"://",
                meth: editData.meth,
                rare: editData.rare,
                startTime: editData.startTime,
                endTime: editData.endTime,
                time: [editData.startTime, editData.endTime],
                rangeValue: true
            });
            if(editData.pos === 1){
                this.setState({
                    imgPosition: {
                        left: "270px",
                        top: "440px"
                    }
                })
            }else if(editData.pos === 2){
                this.setState({
                    imgPosition: {
                        left: this.state.stype ===3 ? "40px" : "20px",
                        top: "440px"
                    }
                })
            }else if(editData.pos === 3){
                this.setState({
                    imgPosition: {
                        left: "270px",
                        top: "100px"
                    }
                })
            }else if(editData.pos === 4){
                this.setState({
                    imgPosition: {
                        left: this.state.stype ===3 ? "40px" : "20px",
                        top: "100px"
                    }
                })
            }
            //{"id":43,"shopId":44704708,"name":"77",
            // "startTime":"2019-12-21T04:47:52.000+0000","endTime":"2019-12-29T04:47:52.000+0000",
            // "status":1,"stype":1,"picture":null,"pos":1,"couponId":null,"couponName":null,
            // "couponUrl":"433243","meth":1,"rare":1,"sec":null,"frequency":null,"clickRate":null}
        }
    }

    // 提交
    submit = () => {
        let params = {
            endTime: this.state.endTime,
            meth: this.state.meth,
            name: this.state.name,
            pos: this.state.pos,
            rare: this.state.rare,
            shopId: this.state.shopId,
            startTime: this.state.startTime
        }
        if(!params.name){
            Notify.error('请输入活动名称!');
            return
        }
        if(this.state.stype === 3){
            if(this.state.imgUrl){
                params.picture = this.state.imgUrl
            }else{
                Notify.error('自定义模式需要上传图片，请上传图片！');
                return
            }
        }else{
            params.stype = this.state.stype
        }
        if(this.state.couponUrlType === 1){
            if(this.state.couponId){
                params.couponId = this.state.couponId
            }else{
                Notify.error('没有可用的优惠券，请重新选择活动路径！');
                return
            }
        }else{
            if(this.state.couponUrl){
                params.couponUrl = this.state.http + this.state.couponUrl
            }else{
                Notify.error('请输入活动路径的链接地址！');
                return
            }
        }
        if(!params.startTime || !params.endTime){
            Notify.error('请选择投放时间!');
            return
        }
        if(this.state.rangeValue){
            params.id = this.state.id
            postJson(API.updateActive, params).then( res => {
                this.props.history.go(-1)
            })
        }else{
            postJson(API.insertActive, params).then( res => {
                this.props.history.go(-1)
            })
        }
    };

    // 取消
    cancelClick = () => {
        this.props.history.go(-1)
    }

    // 活动名称
    model = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    couponUrlModel = e => {
        this.setState({
            couponUrl: e.target.value
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
    changePos = (e) => {
        if (e.target.value === 1) {
            this.setState({
                pos: e.target.value,
                imgPosition: {
                    left: "270px",
                    top: "440px"
                }
            })
        } else if (e.target.value === 2) {
            this.setState({
                pos: e.target.value,
                imgPosition: {
                    left: this.state.stype ===3 ? "40px" : "20px",
                    top: "440px"
                }
            })
        } else if (e.target.value === 3) {
            this.setState({
                pos: e.target.value,
                imgPosition: {
                    left: "270px",
                    top: "100px"
                }
            })
        } else if (e.target.value === 4) {
            this.setState({
                pos: e.target.value,
                imgPosition: {
                    left: this.state.stype ===3 ? "40px" : "20px",
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
    changeRare = (e) => {
        this.setState({
            rare: e.target.value
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
        console.log(data)
        const { dispatch } = this.props;
        const formData = new FormData();
        formData.append('multipartFile', data[0].file);
        formData.append('shopId', 44704708);
        post(API.reqUpload, formData).then(res => {
            this.setState({
                imgUrl: data[0].src
            })
        })
    }

    handleActiveChange = (e) => {
        this.setState({
            couponUrlType: e.target.value
        });
        if(e.target.value === 1){
            get(API.search, { shopId: this.state.shopId }).then(res => {
                this.setState({
                    urlData: res.data,
                    total: res.data.length,
                    visible: true,
                    editUrl: false
                })
            })
        }else{
            this.setState({
                visible: true,
                editUrl: true
            })
        }
    }

    showCoupon = () => {
        if(this.state.couponUrlType === 1){
            get(API.search, { shopId: this.state.shopId }).then(res => {
                this.setState({
                    urlData: res.data,
                    total: res.data.length,
                    visible: true,
                    editUrl: false
                })
            })
        }else{
            this.setState({
                visible: true,
                editUrl: true
            })
        }
    }

    checkUrl = (name, e) => {
        this.setState({
            couponId: e.target.value,
            visible: false,
            couponName: name
        })
    }

    closeDialog = (e) => {
        this.setState({
            couponUrl: '',
            visible: false
        })
    }

    closeDialogQd = (e) => {
        this.setState({
            visible: false
        })
    }

    closeDialogCancel = (e) => {
        this.setState({
            couponUrl: '',
            visible: false
        })
    }

    onChangeRange = (e) => {
        let arr = this.state.time
        if(e[0]){
            arr[0] = e[0]
            this.setState({
                startTime: e[0],
                time: arr
            })
        }
        if(e[1]){
            arr[1] = e[1]
            this.setState({
                endTime: e[1],
                time: arr
            })
        }
    }

    changeHttp = (e) => {
        this.setState({
            http: e.target.value
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
                                {(this.state.stype === 1 || this.state.stype === 2) &&
                                    <div 
                                        style={this.state.imgPosition} 
                                        className='small_red_pk_icon'>
                                        {this.state.stype === 1 && <Lottie options={{ animationData: lottie_redpack }} />}
                                        {this.state.stype === 2 && <Lottie options={{ animationData: lottie_box }} />}
                                    </div>
                                }
                                {this.state.stype === 3 && this.state.imgUrl && 
                                    <img style={this.state.imgPosition} className='small_red_pk_icon_zidiyi' src={this.state.imgUrl} alt="" />
                                }
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
                                    >
                                    <img className={this.state.imgUrl ? 'show' : 'hide'} style={{width:'100%',height:'100%'}} src={this.state.imgUrl} />
                                    <span className={this.state.imgUrl ? 'hide' : 'show'}>+</span>
                                    </Upload>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>展示位置：</label>
                                    <RadioGroup onChange={this.changePos} value={this.state.pos}>
                                        <Radio value={1}>右下</Radio>
                                        <Radio value={2}>左下</Radio>
                                        <Radio value={3}>右上</Radio>
                                        <Radio value={4}>左上</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-item">
                                    <label><i>*</i>活动路径：</label>
                                    <Select placeholder="请选择活动路径" value={this.state.couponUrlType} onChange={this.handleActiveChange}>
                                        <Option value={1}>优惠券</Option>
                                        <Option value={2}>自定义地址</Option>
                                    </Select>
                                </div>
                                <div className="coupon" onClick={this.showCoupon}>{this.state.couponUrl ? this.state.http+this.state.couponUrl : this.state.couponName}</div>
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
                                    <RadioGroup onChange={this.changeRare} value={this.state.rare}>
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
                        onClose={() => this.closeDialog(false)}
                        title="请选择优惠券"
                        style={{width: "800px"}}
                    >
                        <div className="formWrap" className={this.state.editUrl?'show':'hide'}>
                            <div id="http" className="form-item">
                                <Select value={this.state.http} onChange={this.changeHttp}>
                                    <Option value="http://">http://</Option>
                                    <Option value="https://">https://</Option>
                                </Select>
                                <Input value={this.state.couponUrl} onInput={this.couponUrlModel} placeholder="请输入活动路径" />
                            </div>
                            <div className="form-item" style={{textAlign: "right",borderTop: '1px solid #ccc'}}>
                                <Button type="primary" onClick={this.closeDialogQd}>确定</Button>
                                <Button onClick={this.closeDialogCancel}>取消</Button>
                            </div>
                        </div>
                        <Table
                            className={this.state.editUrl?'hide':'show'}
                            columns={
                                [
                                    {
                                        title: '',
                                        width: '5%',
                                        name: 'id',
                                        textAlign: 'center',
                                        bodyRender: data => <Radio value={data.couponId} onChange={this.checkUrl.bind(this,data.couponName)}></Radio>
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
                                        width: '15%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{moment(data.startTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                    },
                                    {
                                        title: '结束时间',
                                        name: 'endTime',
                                        width: '15%',
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