/*
* 老板主界面路由组件
* */

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import DataList from '../../components/dataList/dataList'

class Boss extends Component{


    componentWillMount() {
        this.props.getUserList('tech')
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
)(Boss)