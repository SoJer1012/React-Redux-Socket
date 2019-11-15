/*
* 个人主界面路由组件
* */

import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

import './index.less'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{


    logout = () => {
        Modal.alert('退出', '确定退出登陆吗?', [
            {text: '取消'},
            {
                text: '确定',
                onPress: ()=> {
                    // 干掉cookie中userId
                    Cookies.remove('userId')
                    // 干掉redux管理user
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {username, info, head, company, post, salary} = this.props.user
        return (
            <div style={{marginBottom:50, marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/${head}.jpg`)} style={{width: 50}} alt="head"/>}
                    title={username}
                    message={company}
                />
                {/*<ImagePicker*/}
                    {/*selectable={false}*/}
                    {/*multiple={false}*/}
                    {/*length={1}*/}
                    {/*disableDelete={false}*/}
                    {/*files={[{url: require(`../../assets/images/${head}.jpg`),id: 2415}]}*/}
                    {/*style={{width: 60,height: 60}}*/}
                    {/*onImageClick={(index, fs) => alert(index)}*/}
                {/*/>*/}
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)
