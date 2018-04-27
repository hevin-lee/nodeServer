# nodeServer
最近开始学习搭建node服务器

1：目前在windows下操作，安装(nodejs、pm2）

2：新建hello.js文件
``` javascript
  var http = require('http');
  http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello World\n'); 
  }).listen(1337, "127.0.0.1"); 
  console.log('Server running at http://127.0.0.1:1337/'); 
``` 
3：全局安装pm2 npm install pm2 -g

4：pm2启动试试看吧  pm2 start helloworld.js --name 'helloworld'

以上只是简单入门，下面我们继续，通过express搭建服务

#执行 npm init，然后安装npm install express –-save

引入express的代码，命名为app.js 

``` javascript
var express = require('express');
var app = express();
var path = require('path');

// 负载均衡 集群
var cluster = require('cluster');
var os = require('os');
var numCPUs = os.cpus().length;



var config = {
    port: '9002',
    hostName: '127.0.0.1',
}


app.use(express.static(path.join(__dirname, 'wwwroot')));
 

var server = app.listen(config.port, function() {
    var host = server.address().address;
    console.log(`服务器已运行，端口：${config.port}`);
});
``` 

pm2管理，命令pm2 start app.js server服务会不间断地一直保持运行，安心喝咖啡吧

为了更好监控，我们设置在服务器重启时自动自动pm2

在pm2 start 运行后，再执行 pm2 save，这将在~/.pm2目录下生成一个dump.pm2文件，里面描述了当前PM2上运行着的所有应用。

然后执行命令：pm2 startup [platform]  

注意有必要添加可选参数platform以明确告知pm2当前的系统环境。这样，下次当服务器重启时，PM2会自动运行之前保存的应用。

大概过程就这样结束了

下面是几个不错的命令：
pm2 scale <app name> <n>         对集群进行扩展 如：pm2 scale app +3 增加3个线程
pm2 start app.js -i 2      2个cpu运行
