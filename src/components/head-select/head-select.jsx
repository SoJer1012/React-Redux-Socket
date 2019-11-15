/*
* 头像选择UI组件
* */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {List, Grid} from 'antd-mobile'
import './index.less'

export default class HeadSelect extends Component{

    static propTypes = {
        setHead: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props)
        this.headList = []
        for(let i=1;i<21;i++) {
            this.headList.push({
                text: '头像' + i,
                icon: require(`../../assets/images/头像${i}.jpg`)
            })
        }
    }

    handleClick = (el) => {
        const { text,icon } = el
        this.setState({
            icon
        })
        this.props.setHead(text)
    }

    render() {
        const {icon} = this.state
        const titleHead = !icon ? '请选择头像' : (
            <div className='selectedIcon'>
                已选择头像:
                <img src={icon} alt='头像'/>
            </div>
        )
        return (
            <List renderHeader={() => titleHead}>
                <Grid data={this.headList}
                      columnNum={5}
                      onClick={this.handleClick}
                />
            </List>
        )
    }
}