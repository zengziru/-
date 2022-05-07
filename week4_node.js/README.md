# 实现自定义应用层协议

通过使用node client.js 命令来执行、

协议头只包含两个部分：开始符号和数据体的长度，使用pack函数将数据打包在模块内部，然后再将unpack解包。其中解包有三种对应的情况：头不合法，数据包不完整、成功完整解包。

执行结果如下：

![image-20220507220152512](http://zengziru-submit.oss-cn-beijing.aliyuncs.com/img/image-20220507220152512.png)