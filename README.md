# 前言
初学vue和react,尝试一些小demo。另分别找到一个实战项目，跟着教程做下来，深入学习。  

## vue
项目简介：外卖App商家模块(商品／评论／商家)

技术架构：vue1 + vue-router + vue-resource

实现功能：商品的选购 购物车中商品的删改

运行方法：
```
npm install
npm run start
```

## react
项目简介：(首页／城市页／详情页／登录页／个人中心)

实现功能：收藏，购买，评论

技术架构：react + react-router + react-redux + koa  

运行方法：
```
npm install
npm run mock
npm run start
```

## 虚拟DOM设计思想：
虚拟DOM并不是真实的DOM节点，而是存在于内存之中的一种数据结构。 
虚拟DOM是用来找出怎么以最小的代价来更新DOM，保证最小化的DOM操作，使得执行效率得到保证  

步骤一：用JS对象模拟DOM树  
步骤二：比较两棵虚拟DOM树的差异  
步骤三：把差异应用到真正的DOM树上
  


对于demo中vue和react实现的图书列表信息的增删改查，与两个综合项目，总结内容如下：
## vue 和 react 的异同
同：
1. DOM的渲染方式使用虚拟DOM(vue1采用数据驱动视图)
2. 使用响应式和组件化的视图组件，专注于用户界面的视图层
3. 组件实例的作用域是孤立的。但可以使用 props 把数据传给子组件，在子组件的模板内直接引用父组件的数据。
4. 具有各自对应的路由框架和状态管理模式，可使用全家桶扩展为复杂应用

异：
1. DOM的渲染方式
	vue - 文件中使用 html 标签，通过指令向模版添加功能(vue2新增render函数)  
	react - 文件中使用 jsx 语法，借此在 javascript 中创建DOM

2. state
	vue中的state是可变的  
	this.message = this.message.split('').reverse().join('');

	React中的state是不可变的，需要使用API中的setState方法：  
	this.setState({ message: this.state.message.split('').reverse().join('') });

3. 子组件向父组件传参
	vue通过this.$emit( event, […args] )，触发当前实例上的事件。附加参数都会传给监听器回调。  
```
子组件：
methods: {
  	_postContent () {
		this.$emit('postContent', this.content);
  	}
}
 父组件：
<hello @postContent='showContent'></hello>
methods: {
  	showContent (data) {
  		this.content = data;
  	}
}
```
	react通过this.props.event([…args])
```
子组件：
postContent () {
	this.props.postContent(this.content);
}
 父组件：
<hello postContent={this.showContent.bind(this)}></hello>
showContent (data) {
	this.content = data;
}

```
4. 修改数组某项值
```
this.$set(this.arr,1,'11');
Vue.set(this.arr,1,'11');
this.arr.splice(1,1,'11');

this.books.forEach(function(ele, index) {
	if(_this.book.id === ele.id) {
		_this.$set(_this.books, _this.selectebook, _this.book);
	}
})
```
```					
var booksList = this.state.booksList.map((item, index) => {
	if(item.id === id){
		return item = book
	}else{
		return item
	}
})
this.setState({
	booksList: booksList
})
```