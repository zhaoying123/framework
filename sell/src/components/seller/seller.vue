<template>
	<div class="seller" v-el:seller>
		<div class="seller-wrapper">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<v-star :size="36" :score="seller.score"></v-star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<span class="stress">{{seller.minPrice}}</span>元
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<span class="stress">{{seller.deliveryTime}}</span>分钟
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">收藏</span>
				</div>
			</div>
			<v-split></v-split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">{{seller.bulletin}}</div>
				<ul class="supports">
					<li class="support-item" v-for="item in seller.supports">
						<span class="icon" :class="classMap[seller.supports[$index].type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pics-wrapper" v-el:pics-wrapper>
					<ul class="pics-list" v-el:pics-list>
						<li class="pics-item" v-for="item in seller.pics">
							<img width="120" height="90" :src="item" />
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="infos">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="infos-item" v-for="item in seller.infos">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
	
</template>

<script>
	import star from 'components/star/star.vue';
	import split from 'components/split/split.vue';
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from '../../common/js/store.js';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
//				favorite: false
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		computed: {
			favoriteText () {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		components: {
			'v-star': star,
			'v-split': split
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		ready () {
			this._initScroll();
			this._initPics();
		},
		watch: {
			'seller' () {
				this._initScroll();
				this._initPics();
			}
		},
		methods: {
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$els.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPics () {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$els.picsList.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BScroll(this.$els.picsWrapper, {
								scrollX: true,
								eventPassthroung: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
				}
			},
			toggleFavorite (event) {
				if (event._constructed) {
					this.favorite = !this.favorite;
					saveToLocal(this.seller.id, 'favorite', this.favorite);
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/css/icon.css";
@import "../../common/css/mixin.styl";
.seller
	position: absolute
	top: 174px
	left: 0
	bottom: 0
	width: 100%
	overflow: hidden
	.overview
		position: relative
		padding: 18px
		.title
			font-size: 14px
			color: rgb(7,17,27)
			line-height: 14px
		.desc
			padding: 8px 0 18px
			border-bottom: 1px solid rgba(7,17,27,.1)
			.star
				display: inline-block
				margin-right: 8px
			.text
				margin-right: 12px
				font-size: 10px
				color: rgb(77,85,93)
				line-height: 18px
		.remark
			display: flex
			padding-top: 18px
			.block
				flex: 1
				font-size: 10px
				color: rgb(147,153,159)
				line-height: 10px
				border-right: 1px solid rgba(7,17,27,.1)
				text-align: center
				&:last-child
					border-right: none
				h2
					margin-bottom: 4px
				.stress
					font-size: 24px
					color: rgb(7,17,27)
					line-height: 24px
					font-weight: 200
		.favorite
			position: absolute
			top: 18px
			right: 18px
			.icon-favorite
				display: block
				margin-bottom: 4px
				font-size: 24px
				color: #d4d6d9
				line-height: 24px
				&.active
					color: rgb(240,20,20)
			.text
				font-size: 10px
				color: rgb(77,85,93)
				line-height: 10px
	.bulletin
		padding: 18px
		.title
			font-size: 14px
			color: rgb(7,17,27)
			line-height: 14px
		.content-wrapper
			padding: 8px 12px 16px
			font-size: 12px
			color: rgb(240,20,20)
			line-height: 24px
		.support-item
			padding: 16px 12px
			border-top: 1px solid rgba(7,17,27,.1)
			.icon
				display: inline-block
				width: 15px
				height: 15px
				margin-right: 4px
				background-size: 15px 15px
				background-repeat: no-repeat
				vertical-align: top
				&.decrease
					bg-image('decrease_4')
				&.discount
					bg-image('discount_4')
				&.guarantee
					bg-image('guarantee_4')
				&.invoice
					bg-image('invoice_4')
				&.special
					bg-image('special_4')
			.text
				font-size: 12px
				color: rgb(7,17,27)
				line-height: 16px
				vertical-align: top
	.pics
		padding: 18px
		.title
			margin-bottom: 12px
			font-size: 14px
			color: rgb(7,17,27)
			line-height: 14px
		.pics-wrapper
			width: 100%
			overflow: hidden
			white-space: nowrap
			.pics-list
				font-size: 0
				.pics-item
					display: inline-block
					margin-right: 6px
					width: 120px
					height: 90px
    	.infos
		padding: 18px
		.title
			margin-bottom: 12px
			font-size: 14px
			color: rgb(7,17,27)
			line-height: 14px
		.infos-item
			padding: 16px 12px
			border-top: 1px solid rgba(7,17,27,.1)
			font-size: 12px
			color: rgb(7,17,27)
			line-height: 16px
			font-weight: 200
</style>