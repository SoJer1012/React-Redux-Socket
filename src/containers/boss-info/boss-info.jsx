/*
* boss完善页路由组件
* */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {NavBar, InputItem, TextareaItem, Button, WingBlank} from 'antd-mobile'
import HeadSelect from '../../components/head-select/head-select'

import { updateUser } from '../../redux/actions'

class BossInfo extends Component{

    state = {
        head: '',
        post: '',         // 职位
        info: '',           // 个人或公司简介
        company: '',        // 公司
        salary: ''          // 薪资
    }

    setHead = (head) => {
        this.setState({
            head
        })
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        const { head, type } = this.props.user
        if(head){
            const path = type==='tech'? '/tech': '/boss'
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>公司信息完善</NavBar>
                <WingBlank>
                    <HeadSelect setHead={this.setHead}/>
                    <InputItem
                        placeholder='请输入招聘职位'
                        onChange={val => {
                            this.handleChange('post', val)}
                        }>招聘职位:</InputItem>
                    <InputItem
                        placeholder='请输入公司名称'
                        onChange={val => {
                            this.handleChange('company', val)}
                        }
                    >公司名称:</InputItem>
                    <InputItem
                        placeholder='请输入职位薪资'
                        onChange={val => {
                            this.handleChange('salary', val)}
                        }
                    >职位薪资:</InputItem>
                    <TextareaItem
                        title="职位要求:"
                        placeholder='请输入个人介绍'
                        rows={3}
                        onChange={val => {
                            this.handleChange('info', val)}
                        }
                    />
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(BossInfo)