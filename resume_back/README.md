# Resume AI 后端服务

基于 Gin 框架构建的简历 AI 后端服务。

## 项目结构

```
resume_back/
├── api/                    # API版本管理
│   └── v1/                # API v1版本
│       └── user.go        # 用户相关API
├── config/                # 配置文件
│   └── config.go         # 应用配置
├── controllers/           # 控制器层
│   └── user_controller.go # 用户控制器
├── middleware/            # 中间件
│   ├── auth.go           # JWT认证中间件
│   ├── cors.go           # 跨域中间件
│   └── logger.go         # 日志中间件
├── models/                # 数据模型
│   └── user.go           # 用户模型
├── routes/                # 路由配置
│   └── routes.go         # 路由注册
├── services/              # 业务逻辑层
│   └── user_service.go   # 用户服务
├── utils/                 # 工具类
│   ├── jwt.go            # JWT工具
│   └── response.go       # 响应工具
├── docs/                  # 文档
├── logs/                  # 日志文件
├── main.go               # 程序入口
├── go.mod                # Go模块文件
├── go.sum                # 依赖校验文件
├── .env.example          # 环境变量示例
├── .gitignore           # Git忽略文件
└── README.md            # 项目说明
```

## 快速开始

### 环境要求

- Go 1.24.3+
- PostgreSQL (可选)

### 安装依赖

```bash
go mod tidy
```

### 环境配置

1. 复制环境变量示例文件：
```bash
cp .env.example .env
```

2. 修改 `.env` 文件中的配置项

### 运行服务

```bash
go run main.go
```

服务将启动在 `http://localhost:8080`

## API 接口

### 健康检查
- `GET /ping` - 服务健康检查

### 用户认证
- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/login` - 用户登录

### 用户管理（需要认证）
- `GET /api/v1/user/profile` - 获取用户信息
- `PUT /api/v1/user/profile` - 更新用户信息

## 项目特性

- ✅ 标准的 Gin 框架项目结构
- ✅ JWT 用户认证
- ✅ CORS 跨域支持
- ✅ 统一的错误处理
- ✅ 结构化日志
- ✅ 环境变量配置
- ✅ API 版本管理
- ✅ 分层架构设计

## 开发说明

### 目录说明

- `api/`: API 层，按版本组织
- `config/`: 配置管理
- `controllers/`: HTTP 请求处理
- `middleware/`: 中间件逻辑
- `models/`: 数据模型定义
- `routes/`: 路由注册和管理
- `services/`: 业务逻辑层
- `utils/`: 通用工具函数

### 代码规范

- 使用 Go 标准命名规范
- 中文注释便于理解
- 分层架构，职责明确
- 统一的错误处理和响应格式

## 部署

### 构建

```bash
go build -o resume_back main.go
```

### 运行

```bash
./resume_back
``` 