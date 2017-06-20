import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import Header from '../../components/Header'
import LoginWrapper from '../../components/Login'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		checking: true
        }
    }
    render() {
        return (
        		<div>
	            <Header title='登录'/>
	            {this.state.checking?'':<LoginWrapper loginHandle={this.loginHandle.bind(this)}/>}
            </div>
        )
    }
    componentDidMount() {
    		this.doCheck()
    }
    doCheck() {
    		const userinfo = this.props.userinfo
    		if(userinfo.username) {
    			// 已登录
    			this.goUserPage()
    		} else {
    			this.setState({
    				checking: false
    			})
    		}
    }
    loginHandle(username) {
    		const actions = this.props.userInfoActions
    		let userinfo = this.props.userinfo
    		userinfo.username = username
    		actions.update(userinfo)
    		
    		const router = this.props.params.router
    		if(router){
    			hashHistory.push(router)
    		}else{
    			this.goUserPage()
    		}
    }
    goUserPage() {
    		hashHistory.push('/User')
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
