import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    		this.state = {
    			value: ''
    		}
    }
    render() {
        return (
        		<input type="text" className="searchinput" placeholder="请输入关键字" value={this.state.value} onChange={this.changeHandle.bind(this)} onKeyUp={this.enterHandle.bind(this)}/>
        )
    }
    componentDidMount() {
    		this.setState({
    			value: this.props.value || ''
    		})
    }
    changeHandle(e) {
    		this.setState({
    			value: e.target.value
    		})
    }
    enterHandle(e){
    		if(e.keyCode === 13){
    			this.props.enterHandle(encodeURIComponent(this.state.value))
    		}
    }
}

export default SearchInput
