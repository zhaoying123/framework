import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import {Link} from 'react-router'
import { hashHistory } from 'react-router'
import Header from '../../components/Header'
import localStore from '../../util/localStore'
import {CITYNAME} from '../../config/localStoreKey'
import './style.less'
class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="city-wrapper">
            		<Header title='选择城市' />
                <div className="current-city">{this.props.userinfo.cityName}</div>
                <div className="citylist">
                		<div className="title">热门城市</div>
                		<ul>
                			<li onClick={this.changeCity.bind(this,'北京')}>北京</li>
                			<li onClick={this.changeCity.bind(this,'上海')}>上海</li>
                			<li onClick={this.changeCity.bind(this,'杭州')}>杭州</li>
                			<li onClick={this.changeCity.bind(this,'广州')}>广州</li>
                			<li onClick={this.changeCity.bind(this,'苏州')}>苏州</li>
                			<li onClick={this.changeCity.bind(this,'深圳')}>深圳</li>
                			<li onClick={this.changeCity.bind(this,'南京')}>南京</li>
                			<li onClick={this.changeCity.bind(this,'天津')}>天津</li>
                			<li onClick={this.changeCity.bind(this,'重庆')}>重庆</li>
                			<li onClick={this.changeCity.bind(this,'厦门')}>厦门</li>
                			<li onClick={this.changeCity.bind(this,'武汉')}>武汉</li>
                			<li onClick={this.changeCity.bind(this,'西安')}>西安</li>
                		</ul>
                </div>
            </div>
        )
    }
    changeCity(cityName) {
    		// 将城市信息存储到redux
//  		const userinfo = this.props.userinfo
//  		userinfo.name = cityName
//  		this.props.userInfoActions.update(userinfo)
    		this.props.userInfoActions.update({
    			cityName: cityName
    		})
//  		localStore.setItem(CITYNAME,this.props.userinfo.cityName) //this.props.userinfo.cityName 还未修改
    		localStore.setItem(CITYNAME,cityName)
    		hashHistory.push('/')
    }
}

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
)(City)
