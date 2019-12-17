# expressForMyVue
## 1. 为myVue项目创建的node服务
-  启动, 命令行 `nodemon index.js`


## 2. 安装 sequelize 和 sequelize-cli，
- 使用 `npx sequelize-cli init` 初始化
- 创建model模型 `npx sequelize-cli model:generate --name User --attributes name:string`
- 创建表 `npx sequelize-cli db:migrate --env=development` evn后面不跟参数则默认开发环境， 还有测试环境（test），生产环境（production）
