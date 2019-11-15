/*
* 大牛主界面路由组件
* */

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import DataList from '../../components/dataList/dataList'

class Tech extends Component{

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (
            <DataList userList={this.props.userList} />
        )
    }
}
export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Tech)
