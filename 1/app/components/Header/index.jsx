import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import './style.less'

class Header extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return(
        		<div className="header">
            		<i className="icon-chevron-left float-left" onClick={this.clickHandle.bind(this)}></i>
                <span>{this.props.title}</span>
            </div>
		)
	}
	clickHandle() {
		const backRouter = this.props.backRouter
		if(backRouter){
			console.log(hashHistory)
			hashHistory.push(hashHistory)
		}else{
			window.history.back()
		}
	}
}

export default Header