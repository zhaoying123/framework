import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
    				{this.props.data.map((item, index) => 
    					<Item key={index} data={item} submitComment={this.props.submitComment.bind(this)} comment={this.props.comment}/>
    				)}
        		</div>
        )
    }
//  componentDidMount() {
//  		console.log(this.props.comment)
//  		this.props.comment.map((item, index) => {
//  			if(item.id === this.props.data.id){
//  				console.log(item.id)
//  				
////  				this.setState({
////		    			commentState: 1
////		    		})
//  			}
//  		})
//  }
}

export default OrderList
