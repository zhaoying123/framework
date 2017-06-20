# 前言
初学vue和react,尝试一些小demo。另分别找到一个实战项目，跟着教程做下来，深入学习。
## vue  
项目简介：外卖App商家模块(商品／评论／商家)  

技术架构：vue + vue-router + vue-resource  

实现功能：商品的选购 购物车中商品的删改
![image](https://github.com/zhaoying123/framework/blob/master/vue/screenshots/screenshot1.gif)   
![image](https://github.com/zhaoying123/framework/blob/master/vue/screenshots/screenshot2.gif)   
## react  
项目简介：(首页／城市页／详情页／登录页／个人中心)  

实现功能：收藏，购买，评论  

技术架构：react + react-router + react-redux + mock  


虚拟DOM  
并不是真实的DOM节点，而是存在于内存之中的一种数据结构。  

设计思想：虚拟DOM是用来找出怎么以最小的代价来更新DOM，保证最小化的DOM操作，使得执行效率得到保证  

步骤一：用JS对象模拟DOM树
步骤二：比较两棵虚拟DOM树的差异
步骤三：把差异应用到真正的DOM树上
