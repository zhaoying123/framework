import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import './style.less'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		username: '',
        		code: ''
        }
    }
    render() {
        return (
        		<div className="login-wrapper">
        			<div className="phone">
        				<i className="icon icon-phone"></i>
	            		<input type="text" placeholder="请输入手机号" onChange={this.changeNameHandle.bind(this)} />
        			</div>
        			<div className="phone">
        				<i className="icon icon-key"></i>
	            		<input type="text" placeholder="请输入验证码" onChange={this.changeCodeHandle.bind(this)} />
        				<div className="code" onClick={this.getCode.bind(this)}>获取验证码</div>
        			</div>
	            <button onClick={this.clickHandle.bind(this)}>登录</button>
            </div>
        )
    }
    changeNameHandle(e) {
    		this.setState({
    			username: e.target.value
    		})
    }
    changeCodeHandle(e) {
    		this.setState({
    			code: e.target.value
    		})
    }
    clickHandle() {
    		const username = this.state.username
    		const code = this.state.code
    		if(username&&code){
    			if(code === '12345'){
    				this.props.loginHandle(username)
    			}else{
    				alert('验证码错误')
    			}
    		}
    }
    getCode() {
    		alert('验证码为12345')
    }
}

export default Login
