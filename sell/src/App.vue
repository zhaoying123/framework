<template>
  <div>
  	<v-header :seller="seller"></v-header>
  	<div class="tab border-1px">
  		<div class="tab-item">
  			<a v-link="{path:'/goods'}">商品</a>
  		</div>
  		<div class="tab-item">
  			<a v-link="{path:'/ratings'}">评论</a>
  		</div>
  		<div class="tab-item">
  			<a v-link="{path:'/seller'}">商家</a>
  		</div>
  	</div>
  	<!--路由外链-->
  	<router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script>
	import {urlParse} from './common/js/util.js';
	import header from 'components/header/header.vue';

	export default {
		data () {
			return {
				seller: {
					id: (() => {
						let queryParam = urlParse();
						console.log(queryParam);
						return queryParam.id;
					})()
				}
			};
		},
		created () {
			this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
				response = response.body;
				if (response.erron === 0) {
//					this.seller = response.data;
//					console.log(this.seller.id); // undefined
					this.seller = Object.assign({}, this.seller, response.data);
					console.log(this.seller.id); // 123
				}
			});
		},
		components: {
			'v-header': header
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	/*@import "./common/css/mixin.styl"*/
	
	.tab
		display: flex
		width: 100%
		height: 40px
		line-height: 40px
		border-bottom: 1px solid rgba(7, 17, 27, .1)
		/*border-1px(rgba(7, 17, 27, .1))*/
		.tab-item
			flex: 1
			text-align: center
			& > a
				display: block
				font-size: 14px
				color: rgb(77, 85, 93)
				&.active
					color: #f01414
</style>
