import React, { Component } from 'react';
import { Button, Card, Table } from 'zent';
import API from '@/services/api'
import { post, get } from '@/http/http';
import './App.css';
import 'zent/css/index.css';

const columns = [
  {
    title: '活动名称',
    name: 'name',
    width: '30%',
  },
  {
    title: '生效时间',
    name: 'startTime',
    width: '30%',
  },
  {
    title: '点击率',
    name: 'clickRate',
    width: '10%',
    textAlign: 'center',
    isMoney: true,
  },
  {
    title: '状态',
    name: 'status',
    width: '10%',
    textAlign: 'center',
  },
  {
    title: '操作',
    bodyRender: data => {
      return <div><a href="javascript:void(0)">编辑</a>|<a href="javascript:void(0)">删除</a></div>;
    }
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [], // 数据源
      current: 1,
      total: 100,
      pageSize: 100,
      pageSizeOptions: [20, 30],
    };
  }

  componentDidMount(){
    let params = {
      shopId: 44704708,
      pageNo: this.state.current,
      pageNum: this.state.pageSize
    }
    get(API.queryReadPacks, params).then( res => {
      console.log(res)
      this.setState({
        datasets: res.data
      })
    })
  }

  onChange(data) {
    console.log(data);
    this.setState({
      current: data.current,
      pageSize: data.pageSize,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          header
        </header>
        <div className="App-content">
          <Card style={{ width: "100%" }} title="活动列表">
            <div className="App-btns">
              <Button type="primary">创建</Button>
            </div>
            <Table
              columns={columns}
              datasets={this.state.datasets}
              rowKey="id"
              onChange={this.onChange.bind(this)}
              pageInfo={this.state}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
