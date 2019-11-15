/*
* 注册路由组件
* */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from "antd-mobile"
import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component{

    state = {
        username: '',    //用户名
        password: '',   //密码
        password2: '',      //确认密码
        type: 'boss',           //用户类型   boss/tech

    }
    register = () => {
        this.props.register(this.state)
    }

    handleChange = (name, val) => {
        //更新状态
        this.setState({
            [name]: val
        })
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const type = this.state.type
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
                        <InputItem placeholder='请确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'tech'} onClick={() => this.handleChange('type', 'tech')}>大牛</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'boss'} onClick={() => this.handleChange('type', 'boss')}>公司</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        {msg ? <div className='error-msg'>{msg}</div> : null }
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)