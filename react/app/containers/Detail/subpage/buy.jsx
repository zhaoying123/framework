import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BuyAndStore from '../../../components/BuyAndStore'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as storeActionsFromFile from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    		this.state = {
    			isStore: false
    		}
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} storeHandle={this.storeHandle.bind(this)} buyHandle={this.buyHandle.bind(this)}/>
            </div>
        )
    }
    componentDidMount() {
    		this.checkStoreState()
    		console.log(this.props.store)
    		console.log(this.props.storeActions)
    }
    checkStoreState() {
    		const id = this.props.id
    		const store = this.props.store
    		store.some(item => {
    			if (item.id === id) {
    				this.setState({isStore: true})
    				return true
    			}
    		})
    		
    }
    storeHandle() {
    		const loginFlag = this.loginCheck()
    		if(!loginFlag){
    			return
    		}
    		const id = this.props.id
    		const storeActions = this.props.storeActions
    		if (this.state.isStore){
    			// 当前已被收藏,点击取消收藏
    			storeActions.remove({id:id})
    		} else {
			storeActions.add({id:id})    			
    		}
    		this.setState({
    			isStore: !this.state.isStore
    		})
    }
    buyHandle() {
    		const loginFlag = this.loginCheck()
    		if(!loginFlag){
    			return
    		}
    		// 购买流程省略
    		
    		hashHistory.push('/User')
    }
    loginCheck() {
    		const id = this.props.id
    		const userinfo = this.props.userinfo
    		if(!userinfo.username) {
    			hashHistory.push('/login/' + encodeURIComponent('/detail/' + id))
    			return false
    		}
    		return true
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
