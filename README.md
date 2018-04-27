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
