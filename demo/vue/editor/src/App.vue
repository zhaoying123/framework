<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello :url='url' text='hello' @postContent='showContent'></hello>
    <button @click='submitText'>提交</button>
    <div id="text"></div>
  </div>
</template>


<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  data () {
  	return {
  		content: '',
  		url: '/upload/img'
  	}
  },
  components: {
    Hello
  },
  methods: {
  	submitText () {
  		var text = document.getElementById('text');
  		text.innerHTML = this.content;
  	},
  	showContent (data) {
  		this.content = data;
  	}
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
