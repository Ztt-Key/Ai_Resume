# Resume AI - 智能简历制作平台

## 📋 项目概述

Resume AI 是一个基于人工智能的智能简历制作和优化平台，旨在帮助用户快速创建专业的简历并通过AI技术进行优化。该项目采用前后端分离的架构设计，提供完整的用户认证、简历管理和AI优化功能。

## 🏗️ 项目架构

本项目采用微服务架构，分为前端和后端两个独立的服务：

```
Resume_Ai/
├── resume_front/          # 前端应用 (Taro + React)
└── resume_back/           # 后端服务 (Go + Gin)
```

## 🚀 技术栈

### 后端技术栈
- **框架**: Go 1.24.3 + Gin Web Framework
- **认证**: JWT (JSON Web Token)
- **数据库**: PostgreSQL (可选)
- **中间件**: CORS、日志记录、JWT认证
- **架构**: 分层架构 (Controller + Service + Model)

### 前端技术栈
- **框架**: Taro 4.1.3 + React 18
- **样式**: Sass/SCSS
- **构建工具**: Vite + Babel
- **代码规范**: ESLint + Stylelint + Husky
- **多端支持**: 微信小程序、H5、支付宝小程序等

## 📁 项目结构

### 后端结构 (resume_back/)
```
resume_back/
├── api/                    # API版本管理
│   └── v1/                # API v1版本
├── config/                # 配置管理
├── controllers/           # 控制器层 (HTTP请求处理)
├── middleware/            # 中间件
│   ├── auth.go           # JWT认证中间件
│   ├── cors.go           # 跨域处理
│   └── logger.go         # 日志中间件
├── models/                # 数据模型定义
├── routes/                # 路由配置
├── services/              # 业务逻辑层
├── utils/                 # 工具类
│   ├── jwt.go            # JWT工具
│   └── response.go       # 统一响应格式
├── docs/                  # API文档
├── logs/                  # 日志文件
└── main.go               # 程序入口
```

### 前端结构 (resume_front/)
```
resume_front/
├── config/                # 构建配置
├── src/
│   ├── pages/            # 页面组件
│   ├── app.js            # 应用入口
│   ├── app.config.js     # 应用配置
│   └── app.scss          # 全局样式
├── package.json          # 项目依赖
└── project.config.json   # 项目配置
```

## 🔧 功能特性

### 已实现功能
- ✅ **用户认证系统**: 注册、登录、JWT认证
- ✅ **RESTful API**: 标准的REST API设计
- ✅ **跨域支持**: CORS中间件处理
- ✅ **分层架构**: Controller-Service-Model分层设计
- ✅ **统一响应**: 标准化的API响应格式
- ✅ **日志记录**: 结构化日志中间件
- ✅ **多端适配**: 支持小程序、H5等多个平台

### 待实现功能
- 🔄 **数据库集成**: PostgreSQL数据持久化
- 🔄 **简历模板**: 多种专业简历模板
- 🔄 **AI优化**: 智能简历内容优化
- 🔄 **文件导出**: PDF/Word格式导出
- 🔄 **用户管理**: 完整的用户信息管理

## 🛠️ 开发环境配置

### 后端环境配置

1. **环境要求**
   ```bash
   Go 1.24.3+
   PostgreSQL (可选)
   ```

2. **安装依赖**
   ```bash
   cd resume_back
   go mod tidy
   ```

3. **环境变量配置**
   ```bash
   # 服务器配置
   SERVER_PORT=8080
   GIN_MODE=debug
   
   # 数据库配置
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=password
   DB_NAME=resume_db
   DB_SSLMODE=disable
   
   # JWT配置
   JWT_SECRET=your-secret-key
   ```

4. **启动服务**
   ```bash
   go run main.go
   ```

### 前端环境配置

1. **环境要求**
   ```bash
   Node.js 16+
   pnpm (推荐) 或 npm
   ```

2. **安装依赖**
   ```bash
   cd resume_front
   pnpm install
   ```

3. **开发运行**
   ```bash
   # 微信小程序
   pnpm dev:weapp
   
   # H5页面
   pnpm dev:h5
   
   # 支付宝小程序
   pnpm dev:alipay
   ```

4. **生产构建**
   ```bash
   # 微信小程序
   pnpm build:weapp
   
   # H5页面
   pnpm build:h5
   ```

## 📡 API 接口

### 公开接口
- `GET /ping` - 服务健康检查
- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/login` - 用户登录

### 需要认证的接口
- `GET /api/v1/user/profile` - 获取用户信息
- `PUT /api/v1/user/profile` - 更新用户信息

### 响应格式
```json
{
  "code": 200,
  "message": "成功",
  "data": {}
}
```

## 🔒 安全特性

- **JWT认证**: 无状态的用户认证机制
- **密码加密**: 用户密码安全存储
- **CORS保护**: 跨域请求安全控制
- **输入验证**: 严格的请求参数验证

## 📊 项目状态

- **开发阶段**: 早期开发阶段
- **版本**: v1.0.0
- **许可证**: 待定
- **维护状态**: 积极开发中

## 🚀 部署说明

### 后端部署

1. **编译应用**
   ```bash
   cd resume_back
   go build -o resume_back main.go
   ```

2. **运行服务**
   ```bash
   ./resume_back
   ```

3. **Docker部署** (可选)
   ```dockerfile
   FROM golang:1.24-alpine AS builder
   WORKDIR /app
   COPY . .
   RUN go build -o resume_back main.go
   
   FROM alpine:latest
   WORKDIR /root/
   COPY --from=builder /app/resume_back .
   EXPOSE 8080
   CMD ["./resume_back"]
   ```

### 前端部署

1. **构建应用**
   ```bash
   cd resume_front
   pnpm build:h5
   ```

2. **部署到Web服务器**
   - 将 `dist/` 目录下的文件部署到Web服务器
   - 配置反向代理到后端API

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📞 联系信息

如有问题或建议，请通过以下方式联系：

- 项目仓库: [GitHub](https://github.com/your-username/Resume_Ai)
- 问题反馈: [Issues](https://github.com/your-username/Resume_Ai/issues)

## 📄 许可证

此项目采用 [MIT License](LICENSE) 许可证。

---

**注意**: 本项目目前处于开发阶段，部分功能仍在完善中。欢迎贡献代码和提出建议！ 