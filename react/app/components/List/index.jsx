import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import './style.less'

class ListWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        		<div className="list-wrapper">
        			{this.props.data.map((item,index) =>
        				<div className="item-wrapper clear-fix" key={index}>
	        				<Link to={'detail/'+item.id}>
	        					<div className="item-left float-left">
		        					<img src={item.img} />
		        				</div>
		        				<div className="item-right">
		        					<div className="item-right-title clear-fix">
		        						<span className="float-left">{item.title}</span>
		        						<span className="distance float-right">{item.distance}</span>
		        					</div>
		        					<div className="subTitle">{item.subTitle}</div>
		        					<div className="item-right-price clear-fix">
		        						<span className="price float-left">¥{item.price}</span>
		        						<span className="mumber float-right">已售{item.mumber}</span>
		        					</div>
		        				</div>
	        				</Link>
        				</div>
        			)}
        		</div>
        )
    }
}

export default ListWrapper
