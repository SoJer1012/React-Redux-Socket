/*
* action 模块
* 同步、异步
* */
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api/index'

/*
* 单例对象
* 1、创建对象之前：判断对象是否已经存在，只有不存在才去创建
* 2、创建对象之后：保存对象
* */

function initIO(dispatch, userId) {
    //创建对象之前：判断对象是否已经存在，只有不存在才去创建
    if(!io.socket){
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:5000')  //创建对象之后：保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            if(userId === chatMsg.from || userId === chatMsg.to){
                dispatch(receiveMsg(chatMsg))
            }
        })
    }
}

// 异步获取消息列表数据
async function getMsgList(dispatch,userId) {
    initIO(dispatch, userId)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code === 0) {
        const {users, chatMsgs} = result.data
        // 分发同步action
        dispatch(receiveMsgList({users, chatMsgs}))
    }
}

// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispath => {
        console.log('客户端向服务器发送的消息',{from, to, content} )
        io.socket.emit('sendMsg', {from, to, content})
    }
}


// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// 接收用户信息的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs}})

// 接收一个消息的同步action
const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})

export const register = (user) => {
    const { username, password, password2, type, } = user
    // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
    if(!username) {
        return errorMsg('用户名不能为空!')
    } else if(password!==password2) {
        return errorMsg('2次密码要一致!')
    }
    // 发送注册的异步ajax请求
    return async dispatch => {
        // 发送注册的异步ajax请求
        const response = await reqRegister({username, password, type})
        const result = response.data
        if(result.code === 0) {  //成功
            getMsgList(dispatch, result.data._id)
            // 分发登录成功的action
            dispatch(authSuccess(result.data))
        }else {     // 失败
            // 分发错误信息的action
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = (user) => {
    const { username, password } = user
    // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
    if(!username) {
        return errorMsg('用户名不能为空!')
    } else if(!password) {
        return errorMsg('密码不能为空!')
    }
    // 发送登录的异步ajax请求
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0) {  //成功
            getMsgList(dispatch, result.data._id)
            // 分发登录成功的action
            dispatch(authSuccess(result.data))
        }else {     // 失败
            // 分发错误信息的action
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code === 0) { //更新成功：data
            dispatch(receiveUser(result.data))
        }else{      // 更新失败: msg
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0) { //成功
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        }else{      // 失败
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
