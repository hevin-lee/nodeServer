/*
 * by hevin
 */
module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'API',
            script: 'app.js',
            instances: 2,
            exec_mode: "cluster",
            log_date_format: "YYYY-MM-DD HH:mm Z", // 日志时间格式
            error_file: "/data/logs/server-prod-4001-error.log", // 错误日志路径
            out_file: "/data/logs/server-prod-4001-out.log", // 输出日志
            log_file: "/data/logs/server-prod-4001-all.log",
            combine_logs: false, // 合并日志（正式改为false）
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },

        // Second application
        {
            name: 'WEB',
            script: 'w1.js',
            instances: 1,
            exec_mode: "cluster",
        }
    ],

    /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   * （1）首次部署

　　pm2 deploy ecosystem.config.js production setup  

　　pm2 deploy ecosystem.config.js production

    （2）非首次部署

　　pm2 deploy ecosystem.config.js production // production 是ecosystem.config.js中deploy中的属性名（dev 或 production）
   */
    deploy: {
        production: {
            user: 'llh91@163.com', // 服务器用户名
            host: ['13.229.188.59'], // 服务器IP或域名
            ref: 'origin/master', // 分支
            repo: 'git@github.com:hevin-lee/nodeServer.git',
            path: '/w1', // 部署目录（文件夹）
            "ssh_options": "StrictHostKeyChecking=no",
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production', // 部署指令 （test 在正式的部署就改为 production）
            "env": {
              "NODE_ENV": "production"
            }
        },
        dev: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/development',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};