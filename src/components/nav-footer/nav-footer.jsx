/*
* 主界面footer组件
* */

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {TabBar} from "antd-mobile"
import PropTypes from 'prop-types'

const Item = TabBar.Item
class NavFooter extends Component{

    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let {navList} = this.props
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname
        return (
            <div>
                <TabBar>
                    {
                        navList.map((nav,index)=>(
                            <Item
                                key={index}
                                title={nav.text}
                                icon={{uri: require(`./images/${nav.icon}.png`)}}
                                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                selected={path === nav.path}
                                onPress={()=>this.props.history.replace(nav.path)}
                            />
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default withRouter(NavFooter)