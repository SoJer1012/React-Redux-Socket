/*
* 消息主界面路由组件
* */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userId) {
    // 找出每个聊天的lastMsg，并用一个对象容器来保存
    // {chat_id, lastMsg}
    console.log(chatMsgs)
    console.log(userId)
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        if(msg.to === userId && !msg.read) {
            msg.unReadCount = 1
        }else{
            msg.unReadCount = 0
        }

        //得到msg的聊天标识
        const chatId = msg.chat_id
        // 获取以保存的当前组件的lastMsg
        let lastMsg = lastMsgObjs[chatId]
        //没有
        if(!lastMsg) {
            lastMsgObjs[chatId] = msg
        }else{  // 有
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })

    
    // 得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs)
    // 对数组进行排序  create_time
    lastMsgs.sort(function(m1, m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}


class Message extends Component{

    render() {

        const {user} = this.props
        const {users, chatMsgs} = this.props.chat

        //对chatMsgs按照chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs, user._id)

        
        return (
            <List style={{marginBottom: 50,marginTop:50}}>
                {
                    lastMsgs.map( msg=> {
                        const targetUserId = msg.to === user._id ? msg.from : msg.to
                        const targetUser = users[targetUserId]
                       

                        return (
                            <Item
                                key = {msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={targetUser.head ? require(`../../assets/images/${targetUser.head}.jpg`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {targetUser.username}
                                <span style={{fontSize:12,color:'#707070',marginLeft:10}}>{targetUser.company}</span>
                                <Brief>{msg.content}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)
