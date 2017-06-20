import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="buy-wrapper">
                	{this.props.isStore
                		?<div className="btn store" onClick={this.clickstore.bind(this)}>已收藏</div>
                		:<div className="btn" onClick={this.clickstore.bind(this)}>收藏</div>}
                <div className="btn" onClick={this.clickbuy.bind(this)}>购买</div>
            </div>
        )
    }
    clickstore() {
    		this.props.storeHandle()
    }
    clickbuy() {
    		this.props.buyHandle()
    }
}

export default BuyAndStore
