package utils

import (
	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// Success 成功响应
func Success(c *gin.Context, data interface{}) {
	c.JSON(200, Response{
		Code:    200,
		Message: "成功",
		Data:    data,
	})
}

// SuccessWithMessage 带自定义消息的成功响应
func SuccessWithMessage(c *gin.Context, message string, data interface{}) {
	c.JSON(200, Response{
		Code:    200,
		Message: message,
		Data:    data,
	})
}

// Error 错误响应
func Error(c *gin.Context, code int, message string) {
	c.JSON(code, Response{
		Code:    code,
		Message: message,
	})
}

// BadRequest 400错误响应
func BadRequest(c *gin.Context, message string) {
	Error(c, 400, message)
}

// Unauthorized 401错误响应
func Unauthorized(c *gin.Context, message string) {
	Error(c, 401, message)
}

// Forbidden 403错误响应
func Forbidden(c *gin.Context, message string) {
	Error(c, 403, message)
}

// NotFound 404错误响应
func NotFound(c *gin.Context, message string) {
	Error(c, 404, message)
}

// InternalServerError 500错误响应
func InternalServerError(c *gin.Context, message string) {
	Error(c, 500, message)
}
