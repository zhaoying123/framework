<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decrease" transition="move"></div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-increase icon-add_circle" @click.stop.prevent="increase"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created () {
//			console.log(this.food);
		},
		methods: {
			increase (event) {
				if (event._constructed) {
//					console.log('1');
					if (!this.food.count) {
//						this.food.count = 1;
//						当需要观测到这个对象的变化，且目标对象没有该属性的时候，需要使用 Vue.set
						Vue.set(this.food, 'count', 1);
					} else {
						this.food.count++;
					}
					// 派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 true。附加参数都会传给监听器回调。
					this.$dispatch('cart.add', event.target);
				}
			},
			decrease (event) {
				if (event._constructed) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/css/icon.css";
.cartcontrol
	height: 24px
	font-size: 0
	.cart-decrease, .cart-increase
		display: inline-block
		font-size: 24px
	.cart-decrease
		color: rgb(0, 160, 220)
		&.move-transition
			opacity: 1
			transform: translate3D(0, 0, 0) rotate(360deg)
			transition: all .4s linear
		&.move-enter, &.move-leave
			opacity: 0
			transform: translate3D(24px, 0, 0)  rotate(0deg)
	.cart-count
		display: inline-block
		width: 24px
		line-height: 24px
		vertical-align: top
		text-align: center
		font-size: 10px
		color: rgb(147, 153, 159)
	.cart-increase
		color: rgb(0, 160, 220)
</style>