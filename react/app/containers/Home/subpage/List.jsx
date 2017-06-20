import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import ListWrapper from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

const initState = {
	hasMore: true,
	isLoadingMore: false,
	page: 2,
	totalPage: 0,
	data: []
}

class List extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = initState
	}
	render() {
		return(
			<div>
	            <h1 style={{padding: '10px 20px',fontSize: '16px',color: '#666'}}>猜你喜欢</h1>
	            <ListWrapper data={this.state.data}/>
	        		<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreData={this.loadMoreData.bind(this)} totalPage={this.state.totalPage} page={this.state.page}/>
	        	</div>

		)
	}
	componentDidMount() {
		const cityName = this.props.cityName;
		const result = getListData(cityName,1)
		this.resultHandle(result)
		console.log('当前城市为'+cityName)
	}
	resultHandle(result) {
		result.then(res => {
			return res.json()
		}).then((json) => {
			const hasMore = json.hasMore
			const totalPage = json.totalPage
			const data = json.data
			this.setState({
				hasMore: hasMore,
				totalPage: totalPage,
				data: this.state.data.concat(data)
			})
		})
	}
	loadMoreData() {
		this.setState({
			isLoadingMore: true
		})
		
		const cityName = this.props.cityName
        const page = this.state.page
        console.log('当前页为第'+page+'页')
        const result = getListData(cityName, page)
        this.resultHandle(result)
        this.setState({
            page: page + 1,
            isLoadingMore: false
        },function(){
			console.log('1.下一页为第'+this.state.page+'页')
        })
		console.log('2.下一页为第'+this.state.page+'页')
		// 未监听页面滑动前，点击加载更多时 setState 为异步
		// https://segmentfault.com/a/1190000007454080
	}
	
}

export default List