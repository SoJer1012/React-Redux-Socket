/*
* 消息主界面路由组件
* */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component{
    state = {
        content: '',
        isShow: false // 是否显示表情列表
    }

    // 在第一次render()之前回调
    componentWillMount () {
        // 初始化表情列表数据
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)

    }

    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }


    handleSend = () => {
        // 收集数据
        // eslint-disable-next-line
        const from = this.props.user._id
        // eslint-disable-next-line
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        // 发送消息
        if(content) {
            this.props.sendMsg({ from, to, content})
        }
        //清楚输入数据
        this.setState({
            content: '',
            isShow: false
        })
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }


    render() {

        const {user} = this.props
        const {users, chatMsgs} = this.props.chat

        const meId = user._id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userId
        const chatId = [meId,targetId].sort().join('_')

        // 对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        // 得到头像图片
        const targetHead = users[targetId].head
        const targetHeadNode = targetHead ? require(`../../assets/images/${targetHead}.jpg`):null
        const meHead = users[meId].head
        const meHeadNode = meHead ? require(`../../assets/images/${meHead}.jpg`) : null

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    className='sticky-header'
                    onLeftClick={()=> this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop:50, marginBottom: 50}}>

                    {
                        msgs.map(msg => {
                            if(meId === msg.to) {
                                return <Item
                                    key={msg._id}
                                    className='chat-other'
                                    thumb={targetHeadNode}
                                >
                                    {msg.content}
                                </Item>
                            }else{
                                return <Item
                                    key={msg._id}
                                    className='chat-me'
                                    extra={<img alt={meHead} src={meHeadNode}/>}
                                >
                                    {msg.content}
                                </Item>
                            }
                        })
                    }

                </List>

                <div className='am-tab-bar' style={{background: '#fff'}}>
                    <InputItem
                        value={this.state.content}
                        onChange={ val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        placeholder="请输入"
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight:5}} >😊</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)