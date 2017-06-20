<template>
	<div class="food" v-show="showFood" transition="move" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" />
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">¥{{food.price}}</span>
					<span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<v-cartcontrol :food="food"></v-cartcontrol>
				</div>
				<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
			</div>
			<v-split></v-split>
			<div class="info">
				<div class="title">商品信息</div>
				<p class="text" v-show="food.info">{{food.info}}</p>
			</div>
			<v-split></v-split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<v-ratingselect :select-type="selectType" :only-content='onlyContent' :desc="desc" :ratings="food.ratings"></v-ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings&&food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img width="12" height="12" :src="rating.avatar" class="avatar" />
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								<span>{{rating.text}}</span>
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
	import Vue from 'vue';
	import split from 'components/split/split.vue';
	import ratingselect from 'components/ratingselect/ratingselect.vue';
	import {formatDate} from '../../common/js/date.js';
	const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		components: {
			'v-cartcontrol': cartcontrol,
			'v-split': split,
			'v-ratingselect': ratingselect
		},
		data () {
			return {
				showFood: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			};
		},
		methods: {
			show () {
				this.showFood = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.foodScroll) {
						this.foodScroll = new BScroll(this.$els.food, {
							click: true
						});
					} else {
						this.foodScroll.refresh();
					}
				});
			},
			hide () {
				this.showFood = false;
			},
			addFirst (event) {
				if (event._constructed) {
					this.$dispatch('cart.add', event.target);
					Vue.set(this.food, 'count', 1);
				}
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		events: {
			'ratingtype.select' (type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.foodScroll.refresh();
				});
			},
			'content.toggle' (onlyContent) {
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.foodScroll.refresh();
				});
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/css/icon.css";
.food
	position: fixed
	left: 0
	top: 0
	bottom: 48px
	z-index: 30
	width: 100%
	background: #fff
	&.move-transition
		transition: all .2s linear
		transform: translate3d(0,0,0)
	&.move-enter, &.move-leave
		transform: translate3d(100%,0,0)
	.image-header
		position: relative
		width: 100%
		height: 0
		padding-top: 100%
		img
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
		.back
			position: absolute
			top: 10px
			left: 0
			.icon-arrow_lift
				display: block
				padding: 10px
				font-size: 12px
				color: #fff
	.content
		position: relative
		padding: 18px
		.title
			font-size: 14px
			font-weight: 700
			line-height: 14px
			color: rgb(7,17,27)
		.detail
			margin: 8px 0 18px
			font-size: 0
			height: 10px
			line-height: 10px
			color: rgb(147,153,159)
			.sell-count, .rating
				font-size: 10px
			.sell-count
				margin-right: 12px
		.price
			line-height: 14px
			.now
				font-size: 14px
				font-weight: 700
				line-height: 24px
				color: rgb(240,20,20)
			.old
				font-size: 10px
				line-height: 24px
				color: rgb(147,153,159)
				text-decoration: line-through
		.cartcontrol-wrapper, .buy
			position: absolute
			right: 18px
			bottom: 18px
		.cartcontrol-wrapper
			position: absolute
		.buy
			padding: 6px
			font-size: 10px
			color: #fff
			line-height: 12px
			background: rgb(0,160,220)
			border-radius: 12px
			&.fade-transition
				transition: all .2s
				opacity: 1
			&.fade-enter, &.fade-leave
				opacity: 0
				z-index: -1
	.info
		padding: 18px
		.title
			font-size: 14px
			line-height: 14px
			margin-bottom: 6px
			color: rgb(7,17,27)
		.text
			font-size: 12px
			font-weight: 200
			line-height: 24px
			color: rgb(147,153,159)
	.rating
		padding-top: 18px
		padding-bottom: 18px
		.title
			font-size: 14px
			line-height: 14px
			margin-left: 18px
			color: rgb(7,17,27)
		.rating-wrapper
			padding: 0 18px
			.rating-item
				padding: 16px 0
				border-bottom: 1px solid rgba(7,17,27,.1)
				.time, .user
					margin-bottom: 6px
					font-size: 10px
					line-height: 12px
					color: rgb(147,153,159)
				.user
					float: right
					.name
						margin-right: 6px
				.text
					font-size: 12px
					line-height: 16px
					height: 16px
					color: rgb(7,17,27)
					.icon-thumb_up, .icon-thumb_down
						line-height: 24px
					.icon-thumb_up
						color: rgb(0,160,220)
					.icon-thumb_down
						color: rgb(147,153,159)
			.no-rating
				padding: 16px 0
				font-size: 12px
				color: rgb(147,153,159)
</style>