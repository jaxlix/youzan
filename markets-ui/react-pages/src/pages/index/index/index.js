import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Table, Switch, Sweetalert } from 'zent';
import API from '@/services/api'
import { get, postJson } from '@/http/http';
import './index.css';
import 'zent/css/index.css';
import moment from 'moment';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasets: [], // 数据源
            current: 1,
            total: 0,
            pageSize: 10,
            pageSizeOptions: [20, 30],
            status: 1,
            index: ''
        };
    }

    componentDidMount() {
        get(API.currentUser, {}).then(res => {

        });
        this.getData(this.state.current)
    }

    getData(current) {
        let params = {
            shopId: 44704708,
            pageNo: current,
            pageNum: this.state.pageSize
        }
        get(API.queryReadPacks, params).then(res => {
            this.setState({
                datasets: res.data,
                total: res.count
            })
        })
    }

    // 修改状态
    handleChangeLarge = (index) => {
        console.log(index)
        let data = [...this.state.datasets]
        let params = {
            id: data[index].id,
            status: data[index].status === 1 ? 0 : 1
        }
        postJson(API.updateActive, params).then( res =>{
            if(res.success){
                data[index].status = res.data.status
                this.setState({
                    datasets: data
                })
            }
        })
    }

    onChange = (data) => {
        this.setState({
            current: data.current
        });
        this.getData(data.current)
    }

    // 编辑
    bianji = (data) => {
        console.log(data)
        sessionStorage.setItem("editData", JSON.stringify(data))
        this.props.history.push('/add')
    }

    // 删除
    del = (data,index) => {
        console.log(data)
        console.log(index)
        Sweetalert.confirm({
            confirmType: 'danger',
            confirmText: '删除',
            cancelText: '取消',
            content: '确认删除吗？',
            title: '请确认',
            parentComponent: this,
            onConfirm: () => {
                get(API.deleteActive, {id: data.id}).then( res => {
                    if(res.success){
                        let data = [...this.state.datasets]
                        data.splice(index, 1)
                        this.setState({
                            datasets: data
                        })
                    }
                })
            }
        });
    }

    add = () => {
        sessionStorage.setItem("editData", "")
        this.props.history.push("/add")
    }

    render() {
        return (
            <div className="index">
                <div className="App-content">
                    <div className="header_wrap">
                        <img className="left_img" src={require('../assets/icon_small_red.png')} alt="" />
                        <p>动态红包</p>
                        <p>大促活动必备，提升店铺转化。可配置多种展现样式和活动形式，在特定场景下悬浮动态红包，有效提升流量转化，销量加加加!</p>
                        <span>查看案例</span>
                        <div className="right_wrap">
                            <img className="right_img" src={require('../assets/img_right.png')} alt="" />
                        </div>
                    </div>
                    <Card style={{ width: "100%" }} title="活动列表">
                        <div className="App-btns">
                            <Button type="primary" onClick={this.add.bind(this)}>创建</Button>
                        </div>
                        <Table
                            columns={
                                [
                                    {
                                        title: '活动名称',
                                        name: 'name',
                                        width: '30%',
                                    },
                                    {
                                        title: '生效时间',
                                        name: 'startTime',
                                        width: '30%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{moment(data.startTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                    },
                                    {
                                        title: '点击率',
                                        name: 'clickRate',
                                        width: '10%',
                                        textAlign: 'center',
                                        bodyRender: data => <span>{(data.clickRate*100).toFixed(2)}%</span>,
                                    },
                                    {
                                        title: '状态',
                                        name: 'status',
                                        width: '10%',
                                        textAlign: 'center',
                                        bodyRender: (data,i) => 
                                            <Switch
                                                size="small"
                                                checked={this.state.datasets[i.row].status === 1}
                                                onChange={this.handleChangeLarge.bind(this,i.row)}
                                            />
                                    },
                                    {
                                        title: '操作',
                                        textAlign: 'center',
                                        bodyRender: (data, i) => {
                                            return <div className="caozuo"><span onClick={this.bianji.bind(this,data)}>编辑</span>|<span onClick={this.del.bind(this,data,i.row)}>删除</span></div>;
                                        }
                                    }
                                ]
                            }
                            datasets={this.state.datasets}
                            rowKey="id"
                            onChange={this.onChange.bind(this)}
                            pageInfo={this.state}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}

export default Index;