package main

import (
	"Resume_back/config"
	"Resume_back/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化配置
	config.InitConfig()

	// 设置Gin模式
	gin.SetMode(config.Cfg.Server.Mode)

	// 创建Gin实例
	r := gin.New()

	// 设置路由
	routes.SetupRoutes(r)

	// 启动服务器
	port := ":" + config.Cfg.Server.Port
	log.Printf("服务器启动在端口 %s", port)
	if err := r.Run(port); err != nil {
		log.Fatal("服务器启动失败:", err)
	}
}
