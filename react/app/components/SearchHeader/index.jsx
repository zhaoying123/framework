import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchInput from '../SearchInput'
import {hashHistory, Link} from 'react-router'
import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        		<div className="search-header">
            		<Link to='/'><i className="icon-chevron-left float-left"></i></Link>
            		<div className="input-wrapper">
            			<i className="icon-search"></i>
        				<SearchInput value={this.props.keyword||''} enterHandle={this.enterHandle.bind(this)}/>
        			</div>
        		</div>
        )
    }
    enterHandle(value) {
    		hashHistory.push('search/all/'+encodeURIComponent(value))
    }
}

export default SearchHeader
