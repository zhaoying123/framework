<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">¥{{totalPrice}}</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="payClass" @click.stop.prevent="pay">
			<!--<div class="content-right" :class="{'enough':totalPrice>=minPrice}">-->
				<span class="pay">{{payDesc}}</span>
			</div>
			<div class="ball-wrapper">
				<div class="ball" v-for="ball in balls" v-show="ball.show" transition="drop">
					<div class="inner inner-hook"></div>
				</div>
			</div>
		</div>
		<div class="shopcart-list" v-show="listShow" transition="fold">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" v-el:list-content>
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>¥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<v-cartcontrol :food="food"></v-cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="list-mask" v-show="listShow" transition="fade"></div>
</template>

<script>
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
	import BScroll from 'better-scroll';
	export default {
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectFoods: {
				type: Array,
				default () {
					return [];
//					return [{
//						price: 2,
//						count: 4
//					}];
				}
			}
		},
		components: {
			'v-cartcontrol': cartcontrol
		},
		data () {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: [],
				fold: true
			};
		},
		methods: {
			drop (el) {
//				console.log(el);
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return; // 找到之后退出drop函数
					}
				}
			},
			toggleList () {
				if (this.totalCount) {
					this.fold = !this.fold; // fold 的改变会触发 listShow 的重新计算。因为 fold 是定义在 data 属性上的
				}
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			pay () {
				if (this.totalPrice >= this.minPrice) {
					window.alert('zhifu');
				}
			}
		},
		transitions: {
			drop: {
				// 小技巧：如果你只想设置组件过渡进入的效果而不想有组件过渡离开的效果，这时你就可以用钩子函数，只设置beforeEnter、enter、afterEnter这几个钩子函数就可以了。
				// 进入之前
				beforeEnter (el) {
					let count = this.balls.length;
					while (count--) {
						let ball = this.balls[count];
						if (ball.show) {
							let rect = ball.el.getBoundingClientRect();
							console.log(rect);
							// 偏移
							let x = rect.left - 38; // 38为小球left
							let y = -(window.innerHeight - rect.top - 22); // 22为小球bottom
							el.style.display = '';
							// 外侧元素做纵向变化
							el.style.webKitTransform = 'translate3d(0,' + y + 'px,0)';
							el.style.transform = 'translate3d(0,' + y + 'px,0)';
							// 内侧元素做横向变化
							let inner = el.getElementsByClassName('inner-hook')[0];
							inner.style.webKitTransform = 'translate3d(' + x + 'px,0,0)';
							inner.style.transform = 'translate3d(' + x + 'px,0,0)';
						}
					}
				},
				// 设置过渡进入完成时的组件状态 进入动画刚开始
				enter (el) {
					/* eslint-disable no-unused-vars */
					// 触发浏览器重绘 强制重绘可以保证 dom 位置渲染正确后再执行之后的动画
					let rf = el.offsetHeight;
					this.$nextTick(() => {
						el.style.webKitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webKitTransform = 'translate3d(0,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';
					});
				},
				// 设置过渡进入完成之后的组件状态 进入动画结束
				afterEnter (el) {
					let ball = this.dropBalls.shift();
					if (ball) {
						ball.show = false;
						el.style.display = 'none';
					}
				}
			}
		},
		computed: {
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc () {
				if (this.totalPrice === 0) {
//					return '¥' + this.minPrice + '元起送';
					return `¥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
//					return '还差' + (this.minPrice - this.totalPrice) + '元起送';
					return `还差${this.minPrice - this.totalPrice}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass () {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true;
					return;
				}
				let show = !this.fold;
//				return show;
				// 初始化滚动
				if (show) {
					this.$nextTick(() => {
						if (!this.shopcartScroll) {
							this.shopcartScroll = new BScroll(this.$els.listContent, {
								click: true
							});
						} else {
							this.shopcartScroll.refresh();
						}
					});
				}
				return show;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/css/icon.css";
.shopcart
	position: fixed
	z-index: 99
	bottom: 0
	left: 0
	width: 100%
	height: 48px
	.content
		display: flex
		background: #141d27
		color: rgba(255, 255, 255, .4)
		.content-left
			flex: 1
			font-size: 0
			.logo-wrapper
				display: inline-block
				position: relative
				top: -10px
				width: 56px
				height: 56px
				padding: 6px
				margin: 0 18px
				background: #141d27
				border-radius: 50%
				box-sizing: border-box
				.logo
					width: 100%
					height: 100%
					background: rgba(255, 255, 255, .4)
					border-radius: 50%
					text-align: center
					&.highlight
						background: rgb(0, 160, 220)
					.icon-shopping_cart
						line-height: 44px
						font-size: 24px
						&.highlight
							color: #fff
				.num
					position: absolute
					top: 0
					right: 0
					width: 24px
					height: 16px
					line-height: 16px
					background: rgb(240,20,20)
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
					border-radius: 8px
					color: #fff
					font-size: 9px
					text-align: center
			.price
				display: inline-block
				vertical-align: top
				margin-top: 12px
				padding-right: 12px
				font-size: 16px
				font-weight: 700
				line-height: 24px
				color: rgba(255, 255, 255, .4)
				border-right: 1px solid rgba(255, 255, 255, .1)
				&.highlight
					color: #fff
			.desc
				display: inline-block
				vertical-align: top
				margin: 12px 0 0 12px
				font-size: 12px
				line-height: 24px
		.content-right
			flex: 0 0 105px
			text-align: center
			&.not-enough
				background: #2b333b
			&.enough
				background: #00b43c
				color: #fff
			.pay
				font-size: 12px
				font-weight: 700
				line-height: 48px
		.ball-wrapper
			.ball
				position: fixed
				left: 38px
				bottom: 22px
				z-index: 200
				&.drop-transition
					transition: all .4s cubic-bezier(.46,-.41,.83,.67) /*y轴抛物线运动*/
					.inner
						width: 16px
						height: 16px
						border-radius: 50%
						background: rgb(0,160,220)
						transition: all .4s linear /*x轴线性运动*/
	.shopcart-list
		position: absolute
		left: 0
		top: 0
		z-index: -1
		width: 100%
		&.fold-transition
			transition: all .5s
			transform: translate3d(0, -100%, 0)
		&.fold-enter, &.fold-leave
			transform: translate3d(0, 0, 0)
		.list-header
			height: 40px
			padding: 0 18px
			line-height: 40px
			background: #f3f5f7
			border-bottom: 1px solid rgba(7,17,27,.1)
			.title
				float: left
				font-size: 14px
				color: rgb(7,17,27)
			.empty
				float: right
				font-size: 12px
				color: rgb(0,160,220)
		.list-content
			padding: 0 12px
			max-height: 217px
			background: #fff
			overflow: hidden
			.food
				position: relative
				padding: 12px 0;
				line-height: 24px
				border-bottom: 1px solid rgba(7,17,27,.1)
				.name
					font-size: 14px
					color: rgb(7,17,27)
				.price
					position: absolute
					right: 90px
					bottom: 12px
					font-size: 14px
					font-weight: 700
					color: rgb(240,20,20)
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 12px
.list-mask
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100%
	z-index: 1
	transition: all .5s
	backdrop-filter: blur(10px)
	&.fade-transition
		opacity: 1
		background: rgba(7,17,27,.6)
	&.fade-enter, &.fade-leave
		opacity: 0
</style>