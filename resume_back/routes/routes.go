package routes

import (
	"Resume_back/controllers"
	"Resume_back/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// 应用中间件
	r.Use(middleware.Logger())
	r.Use(middleware.CORS())
	r.Use(gin.Recovery())

	// 健康检查
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// API版本分组
	v1 := r.Group("/api/v1")
	{
		setupUserRoutes(v1)
	}
}

func setupUserRoutes(v1 *gin.RouterGroup) {
	userController := controllers.NewUserController()

	// 公开路由（不需要认证）
	public := v1.Group("/auth")
	{
		public.POST("/register", userController.Register)
		public.POST("/login", userController.Login)
	}

	// 需要认证的路由
	protected := v1.Group("/users")
	protected.Use(middleware.JWTAuth())
	{
		protected.GET("/profile", userController.GetProfile)
		protected.PUT("/profile", userController.UpdateProfile)
	}
}
