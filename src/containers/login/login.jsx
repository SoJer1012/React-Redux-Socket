/*
* 登录路由组件
* */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/actions'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from "antd-mobile"
import Logo from '../../components/logo/logo'

class Login extends Component{

    state = {
        username: '',    //用户名
        password: '',   //密码

    }
    login = () => {
        this.props.login(this.state)
    }

    handleChange = (name, val) => {
        //更新状态
        this.setState({
            [name]: val
        })
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const { msg,redirectTo } = this.props.user
        if(redirectTo){  //如果有值，重定向
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>SOJER直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        {msg ? <div className='error-msg'>{msg}</div> : null }
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)