import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getCommentData} from '../../../fetch/detail/detail'
import Star from '../../../components/Star'
import LoadMore from '../../../components/LoadMore'
import './comment.less'
class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        		isLoadingMore: false,
        		page: 1,
        		totalPage: 0,
        		data: []
        }
    }
    render() {
        return (
            <div className="comment-wrapper">
                <h1 className="title">用户点评</h1>
                <ul>
                {this.state.data.map((item, index) => 
                		<li key={index}>
                			<div><i className="icon-user"></i><span>{item.username}</span></div>
                			<div><Star star={item.star}/></div>
                			<div>{item.comment}</div>
                		</li>
                )}
                </ul>
                <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreData={this.loadMoreData.bind(this)} totalPage={this.state.totalPage} page={this.state.page}/>
            </div>
        )
    }
    componentDidMount() {
    		const result = getCommentData(1, this.props.id)
    		this.resultHandle(result)
    }
    loadMoreData() {
    		this.setState({
    			isLoadingMore: true
    		})
    		const page = this.state.page
    		const id = this.props.id
    		const result = getCommentData(page, id)
    		this.resultHandle(result)
    }
    resultHandle(result) {
	    	result.then(res => {
	    		return res.json()
	    	}).then(json => {
	    		const totalPage = json.totalPage
	    		const data = json.data
	    		const page = this.state.page
	    		this.setState({
	    			totalPage: totalPage,
	    			page: page + 1,
    				isLoadingMore: false,
    				data: this.state.data.concat(data)
    			})
	    	})
    }
}

export default Comment
