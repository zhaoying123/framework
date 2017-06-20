import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        		<div style={{padding:'6px 0',textAlign:'center'}} ref="wrapper">
        			{
        				this.props.isLoadingMore
        				?<span>加载中...</span>
        				:this.props.totalPage<this.props.page
        				?<span>没有更多数据了</span>
        				:<span onClick={this.props.loadMoreData.bind(this)}>上拉加载</span>
        			}
        		</div>
        )
    }
    componentDidMount() {
    		const wrapper = this.refs.wrapper
    		let timeoutId
    		window.addEventListener('scroll', () => {
    			if(this.props.totalPage<this.props.page){
    				return
    			}
    			if(this.props.isLoadingMore){
    				return
    			}
    			if(timeoutId){
    				clearTimeout(timeoutId)
    			}
    			timeoutId = setTimeout(() => {
    				const top = wrapper.getBoundingClientRect().top
    				const windowHeight = window.screen.height
    				if(top && top < windowHeight){
    					// 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
    					this.props.loadMoreData()
    				}
    			},50)
    		})
    }
}

export default LoadMore
