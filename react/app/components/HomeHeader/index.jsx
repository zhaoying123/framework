import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link, hashHistory} from 'react-router'
import SearchInput from '../SearchInput'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="home-header clear-fix">
	            <Link to="/city">
	                <div className="home-header-left float-left">
	                   <span>{this.props.cityName}</span>
	                   <i className="icon-angle-down"></i>
	               </div>
               </Link>
               <div className="home-header-right float-right">
                   <Link to="/login"><i className="icon-user"></i></Link>
               </div>
               <div className="home-header-middle">
               	   <i className="icon-search"></i>
               	   <SearchInput value='' enterHandle={this.enterHandle.bind(this)}/>
               </div>
            </div>
        )
    }
    enterHandle(value) {
    		hashHistory.push('/search/all/'+encodeURIComponent(value))
    }
}

export default HomeHeader
