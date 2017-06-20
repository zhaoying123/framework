import {get} from '../get'
import {post} from '../post'

export function getOrderList(username) {
	const result = get('/api/orderlist/'+username)
	return result
}

export function postComment(id, comment) {
	const result = post('/api/submitComment', {
		id: id,
		commnent: comment
	})
	return result
}
