import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {getSearchData} from '../../../fetch/search/search'
import ListWrapper from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

const initialState = {
	hasMore: true,
	isLoadingMore: false,
	page: 2,
	totalPage: 0,
	data: []
}

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    		this.state = initialState
    }
    render() {
        return (
        		<div>
            		<ListWrapper data={this.state.data}/>
            		<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreData={this.loadMoreData.bind(this)} totalPage={this.state.totalPage} page={this.state.page}/>
        		</div>
        )
    }
    componentDidMount() {
    		const cityName = this.props.userinfo.cityName
    		const keyword = this.props.keyword || ''
        const category = this.props.category
    		const result = getSearchData(1,cityName,category,keyword)
    		this.resultHandle(result)
    		console.log('当前城市为'+cityName)
    }
    componentDidUpdate(prevProps, prevState) {
    		// 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
        // componentDidUpdate（） 这个生命周期的作用是当props或state更新之后，使用它更新DOM节点。
        // 如果使用不当，则查询页面会不停的调用查询的方法，不停的执行刷新操作。
        const keyword = this.props.keyword
        const category = this.props.category
        // 搜索条件完全相等时，忽略。重要！！！
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return
        }
        // 重置 state
        this.setState(initialState)
        // 重新加载数据
        const cityName = this.props.userinfo.cityName
        const keyword1 = this.props.keyword || ''
        const category1 = this.props.category
        const result = getSearchData(1, cityName, category1, keyword1)
        this.resultHandle(result)

    		console.log('重新查找')
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
        const result = getSearchData(cityName, page)
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

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)