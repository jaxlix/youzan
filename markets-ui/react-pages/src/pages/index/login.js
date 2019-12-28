import React, { Component } from 'react';
import { Button, Input } from 'zent';
import './App.css';
import 'zent/css/index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    login = () => {
        this.props.history.push('/index')
    }

    render() {
        return (
            <div className="login">
                <div className="form-content">
                    <div className="title">用户登录</div>
                    <div className="form-item">
                        <label>用户名：</label>
                        <Input value={this.state.name} onInput={this.model} placeholder="请输入用户名" />
                    </div>
                    <div className="form-item">
                        <label>密 码：</label>
                        <Input value={this.state.name} onInput={this.model} placeholder="请输入密码" />
                    </div>
                    <div className="form-item">
                        <Button className="btn" onClick={this.login}>登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
