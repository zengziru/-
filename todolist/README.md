# Todolist-readme

## 	效果图

​		该项目实现了Todolist页面功能，页面展示图如下：

![image-20220405001712783](http://zengziru-submit.oss-cn-beijing.aliyuncs.com/img/image-20220405001712783.png)

##   	文件构成

​		该项目依托字节跳动开源工具modern.js来构建，框架采用的是React。主要由src文件夹中的component文件夹和App.css和App.jsx构成。App.css包含了所有组件的css信息，而App.jsx作为一个大的对外接口，调用了component中的Mainpage组件。

- Mainpage.jsx：定义了一系列需要context进行后续传递的变量，并且调用了两个大组件（Todoinput和TodoItem）
- Todoinput：该组件实现了输入item的功能
- TodoItem：调用check组件以及判断是否展现Footer组件
- check：该组件实现了展现我们的items的功能，并且针对footer组件中的三种展现方式（ALL，Active，Completed），设计了对应的三种展现形式。
- Footer：
  - 显示当前todolist中还有多少个未完成item
  - 三个按钮：All Active Completed，分别对应三种展示方式。All是展示所有item无论是否被checked，Active是只展示未完成item，Completed是只展示已完成item
  - Clear completed按钮：删除所有已完成item

## 	使用方法：

​		在终端中输入pnpm dev构建模型，接着点击运行，即可得到设计的页面



​		