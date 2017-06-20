import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Star extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
    		let star = this.props.star
    		if(star>5){
    			star = star % 5
    		}
        return (
            <div className="star-wrapper">
                {[1,2,3,4,5].map((item,index) => {
//              		if(item<=star){
//              			return <i className="icon-star highlight"></i>
//              		}else{
//              			return <i className="icon-star"></i>
//              		}
					const highlight = item<=star ? 'highlight':''
					return <i key={index} className={"icon-star "+highlight}></i>
                })}	
            </div>
        )
    }
}

export default Star
