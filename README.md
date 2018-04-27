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

##keymetrics实时监控

地址：https://app.keymetrics.io/#/register

pm2官方也结合pm2管理提供了一套可视化在线监控平台





大概过程就这样结束了
下面是几个不错的命令：
``` javascript
$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4 #后台运行pm2，启动4个app.js # 也可以把'max' 参数传递给 start # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               #  显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3      # 启动3个进程
$ pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
$ pm2 stop serverone       # 停止 serverone 进程
$ pm2 start app.json        # 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件
你也可以执行用其他语言编写的app  ( fork 模式):
$ pm2 start my-bash-script.sh    -x --interpreter bash
$ pm2 start my-python-script.py -x --interpreter python
```
