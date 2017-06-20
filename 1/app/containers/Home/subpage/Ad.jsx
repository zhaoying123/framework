import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { get } from '../../../fetch/get'

import './Ad.less'

class Ad extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render() {
		return(
			<div className='ad-wrapper'>
            		<h1 className="ad-title">超值特惠</h1>
            		<div className="content-wrapper">
	            		<div className="img-wrapper clear-fix">
		            		{this.state.data.map((item,index) =>
		            			<a className="img-item" key={index} href={item.link} >
		            				<img src={item.img} />
		            			</a>
		            		)}
		            	</div>
            		</div>
            </div>
		)
	}
	componentDidMount() {
		get('/api/homead').then((res) => {
			return res.json()
		}).then((json) => {
			console.log(json)
			this.setState({
				data: json
			})
		})
	}
}

export default Ad