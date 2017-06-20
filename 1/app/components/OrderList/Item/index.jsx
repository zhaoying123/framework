import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		commentState: 0 // 0-未评价 1-评价中 2-已评价
        }
    }
    render() {
        return (
            <div className="orderlist-item clear-fix">
            		<div className="img-wrapper float-left">
					<img src={this.props.data.img} />
				</div>
				<div className="info">
					<div><span className="title">商户:</span>{this.props.data.title}</div>
					<div><span className="title">数量:</span>{this.props.data.count}</div>
					<div><span className="title">价格:</span>¥{this.props.data.price}</div>
				</div>
				{
					this.state.commentState === 0
					? <div className="evaluate" onClick={this.showComment.bind(this)}>评价</div>
					: this.state.commentState === 1
					? ''
					: <div className="evaluate unevaluate">已评价</div>
				}
				{
					this.state.commentState === 1
					? <div className="comment-text">
						  <textarea ref="commentText"></textarea>
						  <button className="btn btn-confirm float-right" onClick={this.submitComment.bind(this)}>提交</button>
						  <button className="btn btn-cancel float-right" onClick={this.hideComment.bind(this)}>取消</button>
					  </div>
					: ''
				}
            </div>
        )
    }
    componentDidMount() {
    		this.setState({
    			commentState: this.props.data.commentState
    		})
    				console.log(this.props.data)
    				console.log(this.props.comment)
    		
    		this.props.comment.map((item, index) => {
    			if(item.id === this.props.data.id){
//  				console.log(item.id,this.props.data.id)
    				
    				this.setState({
		    			commentState: 2
		    		})
    			}
    		})
    }
    showComment() {
    		this.setState({
    			commentState: 1
    		})
    }
    hideComment() {
    		this.setState({
    			commentState: 0
    		})
    }
    submitComment() {
    		var text = this.refs.commentText.value.trim()
    		if(!text)return
    		var id = this.props.data.id
    		this.props.submitComment(id,text,this.successCallback.bind(this))
    }
    successCallback(){
    		alert('提交成功')
		this.hideComment();
		this.setState({
			commentState: 2
   		})
		
	}
}

export default Item
