/*
* 主界面路由组件
* */

import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/boss-info'
import Boss from '../boss/boss'
import TechInfo from '../tech-info/tech-info'
import Tech from '../tech/tech'
import Message  from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import NotFound from '../../components/404/404'


import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import {NavBar} from "antd-mobile"
import NavFooter from '../../components/nav-footer/nav-footer'

class Main extends Component{

    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '简历列表',
            icon: 'tech',
            text: '大牛',
        },
        {
            path: '/tech', // 路由路径
            component: Tech,
            title: '职位列表',
            icon: 'boss',
            text: '职位',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
        const userId = Cookies.get('userId')
        const {_id} = this.props.user
        if(userId && !_id) {
            // 发送异步请求，获取user信息
            this.props.getUser()
        }
    }

    render() {

        // 读取cookie中的userId
        const userId = Cookies.get('userId')
        //如果没有，自动重定向到登录界面
        if(!userId){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果user中没有_id，返回null（不做任何显示）
        if(!user._id){
            return null
        }else{
            //如果有_id，显示对应的界面
            //如果请求的是根路径，根据user的type和head来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if(path === '/'){
                path = getRedirectTo(user.type, user.head)
                return <Redirect to={path}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)
        if(currentNav){
            if(user.type === 'boss'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> :null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/techinfo' component={TechInfo}/>
                    <Route path='/chat/:userId' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} /> :null}
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和head来计算出一个重定向的路由路径, 并自动重定向
 */