# Dandelion Admin Server

基于 [go-dandelion](https://github.com/team-dandelion/go-dandelion) 微服务框架开发的后台管理系统服务端。

## 项目构建构成

1. 创建项目目录以及初始化mod
```shell
mkdir dandelion-admin-server && cd dandelion-admin-server && go mod init dandelion-admin-server
```
2. 创建base-server和gateway服务
```shell
(base) ➜  dandelion-admin-server go-dandelion-cli server                        
Type of service you want to create, enter a number（1-rpc 2-http）:1
Current road strength: /Users/mac/my-project/dandelion-admin/dandelion-admin-server
RPC Server Name:base-server
Whether to use the default initial configuration?（y/n）:y
stat /Users/mac/my-project/dandelion-admin/dandelion-admin-server/base-server/static/base-server.txt: no such file or directory
(base) ➜  dandelion-admin-server go-dandelion-cli server                               
Type of service you want to create, enter a number（1-rpc 2-http）:2
Current road strength: /Users/mac/my-project/dandelion-admin/dandelion-admin-server
HTTP Server Name:gateway
Whether to use the default initial configuration?（y/n）:y
stat /Users/mac/my-project/dandelion-admin/dandelion-admin-server/gateway/static/gateway.txt: no such file or directory
(base) ➜  dandelion-admin-server 
```

3. 创建proto目录，定义通信协议
```shell
mkdir proto && mkdir proto/base
```

4. 生成proto对应的Go代码
```shell
cd proto
./gen.sh  # 自动遍历所有proto文件并生成对应的Go代码
```

## 服务说明

### base-server

基础 RPC 服务，主要功能：
- 用户认证与授权
- 角色权限管理
- 菜单管理
- 系统配置
- 其他基础业务逻辑

### gateway

HTTP 网关服务，主要功能：
- 提供 RESTful API
- 请求转发
- 统一认证
- 接口鉴权
- 限流控制
- 链路追踪

### proto

Protocol Buffers 协议定义目录：
- 定义服务间通信接口
- 统一数据结构
- 版本管理

## 技术栈

- 微服务框架：go-dandelion
- RPC 框架：rpcx
- HTTP 框架：fasthttp
- 数据库：MySQL
- 缓存：Redis
- 链路追踪：Jaeger
- API 文档：Swagger

## 开发环境要求

- Go 1.16+
- MySQL 5.7+
- Redis 6.0+
- Protocol Buffers 3 

## 业务编写

基于登录接口的实现，我来解释下业务代码涉及的文件结构：
1.proto 定义层 (proto/base/):
 + authorize.proto: 定义登录接口的请求参数和响应结构
 + server.proto: 定义 RPC 服务接口
2. 网关层 (gateway/):
 + internal/route/base_server.go: 注册 HTTP 路由
 + internal/service/base-server/authorize_controller.go: HTTP 控制器，处理请求并转发到 RPC 服务
3. 业务服务层 (base-server/):
 + internal/service/authorize.go: RPC 服务实现
 + internal/logic/authorize.go: 具体业务逻辑实现
 + internal/model/sys_user.go: 数据模型定义
 + internal/dao/: 数据访问层（从搜索结果看应该有 sys_user.go）
编写新业务时的流程：
1. 在 proto/base/ 中定义服务接口和数据结构
2. 在 base-server/internal/model/ 中定义数据模型
3. 在 base-server/internal/dao/ 中实现数据访问方法
4. 在 base-server/internal/logic/ 中实现具体业务逻辑
5. 在 base-server/internal/service/ 中实现 RPC 服务接口
6. 在 gateway/internal/route/ 中注册 HTTP 路由
7. 在 gateway/internal/service/base-server/ 中实现 HTTP 控制器
