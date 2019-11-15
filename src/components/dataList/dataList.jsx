import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import PropTypes from 'prop-types'

import './index.less'

const Header = Card.Header
const Body = Card.Body
const Footer = Card.Footer

class DateList extends Component{

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props

        return (
            <WingBlank style={{marginBottom:60, marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    title={user.post}
                                    extra={user.salary ? <span>{user.salary}</span> : null}
                                />
                                <Body>
                                    {user.company ? <span>公司: {user.company}</span> : null}
                                    <WhiteSpace/>
                                    <span>简介: {user.info}</span>
                                </Body>
                                <WhiteSpace/>
                                <Footer
                                    content={user.head ?
                                        <div className='card-footer'>
                                            <img src={require(`../../assets/images/${user.head}.jpg`)} style={{width: 20}} alt="head"/>
                                            <span>&nbsp;&nbsp;{user.username}</span>
                                            <span>·招聘专员</span>
                                        </div>
                                        : user.username
                                    }
                                />
                            </Card>
                        </div>
                    ))
                }

            </WingBlank>
        )
    }
}
export default withRouter(DateList)