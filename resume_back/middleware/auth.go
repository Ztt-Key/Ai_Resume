package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// JWTAuth JWT认证中间件
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "缺少授权令牌",
			})
			c.Abort()
			return
		}

		// 移除 "Bearer " 前缀
		if strings.HasPrefix(token, "Bearer ") {
			token = token[7:]
		}

		// 这里应该验证JWT令牌
		// TODO: 实现JWT令牌验证逻辑

		c.Next()
	}
}
