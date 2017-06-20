import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderListWrapper from '../../../components/OrderList'
import {getOrderList, postComment} from '../../../fetch/user/user'
import './style.less'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		data: []
        }
    }
    render() {
        return (
            <div className="orderlist-wrapper">
            		<div className="title">您的订单</div>
            		<OrderListWrapper data={this.state.data} submitComment={this.submitComment.bind(this)} comment={this.props.comment} commentActions={this.props.commentActions}/>
            </div>
        )
    }
    componentDidMount() {
    		const result = getOrderList(this.props.username)
    		this.resultHandle(result)

    }
    resultHandle(result) {
    		result.then(data => {
    			return data.json()
    		}).then(json => {
    			this.setState({
    				data:json
    			})
    			console.log(json)
    		})
    }
    submitComment(id,value,callback) {
    		const result = postComment(id, value)
    		result.then(res => {
    			return res.json()
    		}).then(json => {
    			if(json.errno === 0){
    				callback()
    				this.props.commentActions.update({
					id: id
				})
//		    		console.log(this.props.comment)
    				
    			}
    		})
    }
}

export default OrderList