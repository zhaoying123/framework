<template>
  <div class="hello">
  	<p>{{text}}</p>
    <div id="editor"></div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor';
export default {
  name: 'hello',
  props: ['url','text'],
  data () {
    return {
      content: ''
    }
  },
  mounted () {
  	this.createEditor();
  },
  methods: {
  	createEditor () {
  		var self = this;
  		var editor = new wangEditor('editor');
  		editor.create();
  		editor.onchange = function(){
			self.content = editor.$txt.html() + '<p>'+ self.url +'</p>';
			self._postContent();
  		};
  	},
  	_postContent () {
		this.$emit('postContent', this.content);
  	}
  }
}
</script>

<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
