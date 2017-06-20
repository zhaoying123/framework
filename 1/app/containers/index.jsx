import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		initDone: false
        }
    }
    render() {
        return (
            <div>
            {
            		this.state.initDone?this.props.children:'加载中...'
            }
            </div>
        )
    }
    componentDidMount () {
    		let cityName = LocalStore.getItem(CITYNAME);
    		if (!cityName) {
    			cityName = '北京'
    		}
    		// 将城市信息存储到redux
    		this.props.userInfoActions.update({
    			cityName: cityName
    		})
    		setTimeout(() => {
    			this.setState({
    				initDone: true
    			})
    		},1000);
    }
}
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
function mapStateToProps(state) {
    return {
//  		userinfo: state.userinfo
    }
}
// mapDispatchToProps用来建立 UI 组件的参数到store.dispatch方法的映射。
// 它定义了哪些用户的操作应该当作 Action，传给 Store。
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
// React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

//export default App
