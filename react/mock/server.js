var app = require('koa')();
var router = require('koa-router')();


//router.get('/', function *(next) {
//  this.body = 'hello koa !'
//});
//
//router.get('/api', function *(next) {
//  this.body = 'test data'
//});
//router.get('/api/1', function *(next) {
//  this.body = 'test data 1'
//});
//router.get('/api/2', function *(next) {
//  this.body = 'test data 2'
//});

var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next){
	console.log('首页 —— 超值特惠')
	this.body = homeAdData
})


var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function *(next){
	console.log('首页 —— 猜你喜欢')
	this.body = homeListData
})

var searchListData = require('./search/list.js')
// 搜索结果页 - 搜索结果 - 三个参数
router.get('/api/search/:page/:city/:category/:keyword', function *(next){
	console.log('搜索结果页 - 搜索结果')
    this.body = searchListData
	// 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
    console.log('关键字：' + paramsKeyword)
})
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', function *(next) {
    console.log('搜索结果页 - 搜索结果')
    this.body = searchListData
    // 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
})


var DetailData = require('./detail/info.js')
router.get('/api/detail/info/:id/', function *(next){
	const id = this.params.id
	console.log('商户详情id:'+id)
	this.body = DetailData
})

var CommentData = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id/', function *(next){
	const id = this.params.id
	const page = this.params.page
	console.log('评论id:'+id)
	console.log('评论page:'+page)
	this.body = CommentData
})

var OrderListData = require('./orderlist/orderList.js')
router.get('/api/orderlist/:username/', function *(next){
	this.body = OrderListData
	const username = this.params.username
	console.log("用户名:"+username)
})


router.post('/api/submitComment', function *(next) {
	console.log('提交评价')
	this.body = {
		errno: 0,
		msg: 'ok'
	}
})


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
