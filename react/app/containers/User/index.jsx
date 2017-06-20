import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import OrderList from './subpage/OrderList'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentActionsFromFile from '../../actions/comment'

import './style.less'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="user-wrapper">
                <Header title="用户主页" backRouter='/home'/>
                <div className="user-info">
	                <div>
		                <i className="icon icon-user"></i>
		                <span>{this.props.userinfo.username}</span>
	                </div>
	                <div>
		                <i className="icon icon-map-marker"></i>
		                <span>{this.props.userinfo.cityName}</span>
	                </div>
                </div>
                <div style={{height:'15px'}}></div>
                <OrderList username={this.props.userinfo.username} comment={this.props.comment} commentActions={this.props.commentActions}/>
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        comment: state.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
    		commentActions: bindActionCreators(commentActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)