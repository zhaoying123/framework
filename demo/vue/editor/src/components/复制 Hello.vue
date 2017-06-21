<template>
  <div class="hello">
    <div id='editor'></div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
export default {
  name: 'hello',
// props: ['uploadUrl'], // 从父组件继承数据
// data () {
//  return {
//    content: ''
//  }
// },
  mounted () {
    this.createEditor() // 页面加载完调用函数
  },
  methods: {
    createEditor () {
//    const self = this // 保存 Vue 实例的 this 指向
      const editor = new WangEditor('editor') // 创建 Editor 实例
//    editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'] // editor 实例的配置
//    editor.config.uploadImgUrl = this.uploadUrl // editor 实例图片地址上传的配置
//    editor.onchange = function () { // editor 实例发生变化的时候，调用 formatContent函数，将输入的数据赋值给content
//      self.formatContent(this.$txt.html())
//    }
      editor.create()
    }
//  formatContent (content) {
//    // handle
//    // ...
//    this.content = content // 赋值给 content
//    this.outputContent() // 调用 outputContent函数，数据更新到 input 值
//  },
//  outputContent () {
//    this.$emit('input', this.content)
//  }
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
