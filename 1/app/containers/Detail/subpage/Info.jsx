import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from '../../../fetch/detail/detail'
import Star from '../../../components/Star'
import './Info.less'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		data: []
        }
    }
    render() {
        return (
        	<div className="info">
	          <div className="info-wrapper clear-fix">
	          	 <div className="info-img float-left">
	          		<img src={this.state.data.img}/>
	          	 </div>
	          	 <div className="info-text">
	          		<div className="title">{this.state.data.title}</div>
	          		<div className="price-wrapper">
	          			<Star star={this.state.data.star}/>
	          			<span className="price">¥{this.state.data.price}</span>
	          		</div>
	          		<div className="subtitle">{this.state.data.subTitle}</div>
	          	 </div>
	          </div>
	          <div className="desc" dangerouslySetInnerHTML={{__html:this.state.data.desc}}></div>
          </div>
        )
    }
    componentDidMount() {
    		getInfoData(this.props.id).then((res) => {
    			return res.json()
    		}).then((json) => {
    			this.setState({
    				data: json
    			})
    			console.log(json)
    		})
    }
}

export default Info
