import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Table, Switch, Sweetalert } from 'zent';
import API from '@/services/api'
import { get, postJson } from '@/http/http';
import './index.css';
import 'zent/css/index.css';
import moment from 'moment';


import data from './data.json';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasets: [], // 数据源
            current: 1,
            total: 100,
            pageSize: 10,
            pageSizeOptions: [20, 30],
            status: 1,
            index: ''
        };
    }

    componentDidMount() {
        get(API.currentUser, {}).then(res => {

        });
        let params = {
            shopId: 44704708,
            pageNo: this.state.current,
            pageNum: this.state.pageSize
        }
        get(API.queryReadPacks, params).then(res => {
            console.log(res)
            this.setState({
                datasets: data.data//res.data
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
        console.log(data);
        this.setState({
            current: data.current,
            pageSize: data.pageSize,
        });
    }

    // 编辑
    bianji = (data) => {
        console.log(data)
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

    render() {
        return (
            <div className="index">
                <div className="App-content">
                    <Card style={{ width: "100%" }} title="活动列表">
                        <div className="App-btns">
                            <Button type="primary"><Link to='/add'>创建</Link></Button>
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