# expressForMyVue
## 1. 为myVue项目创建的node服务
-  启动, 命令行 `nodemon index.js`


## 2. 安装 sequelize 和 sequelize-cli，
- 1. 创建一个数据库 User
- 2. 使用 `npx sequelize-cli init` 初始化项目的数据库配置信息
- 3. 创建model模型 `npx sequelize-cli model:generate --name User --attributes name:string, password: string`
- 4. 持久化模型对象的数据表 `npx sequelize-cli db:migrate --env=development` evn后面不跟参数则默认开发环境， 还有测试环境（test），生产环境（production）

## 3. 项目的发布和运维
- 1. 安装 pm2， `npm install pm2 -g`
- 2. 当前项目初始化 `pm2 init`
- 3. 启动项目 `pm2 start ecosystem.config.js` 
- 4. 查看日志 `pm2 log`
- 5. 重启 `pm2 restart`
