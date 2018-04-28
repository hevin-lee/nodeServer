var express = require('express');
var app = express();
var path = require('path');

// 负载均衡 集群
var cluster = require('cluster');
var os = require('os');
var numCPUs = os.cpus().length;



var config = {
    port: '8082',
    hostName: '127.0.0.1',
}


app.use('/s',express.static(path.join(__dirname, 'w1')));

// 
// 监听所有接口请求
// app.all('*', function(req, res, next) {  
//     res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//     res.header("X-Powered-By",'1.0.0')  
//     res.header("Content-Type", "application/json;charset=utf-8");  
//     next();  
// });
// 


var server = app.listen(config.port, function() {
    var host = server.address().address;
    console.log(`服务器已运行，端口：${config.port}`);
});