package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct{}

func NewUserController() *UserController {
	return &UserController{}
}

func (uc *UserController) Test(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "测试接口",
		"status":  "success",
	})
}

// Register 用户注册
func (uc *UserController) Register(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "用户注册接口",
		"status":  "success",
	})
}

// Login 用户登录
func (uc *UserController) Login(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "用户登录接口",
		"status":  "success",
	})
}

// GetProfile 获取用户信息
func (uc *UserController) GetProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "获取用户信息接口",
		"status":  "success",
	})
}

// UpdateProfile 更新用户信息
func (uc *UserController) UpdateProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "更新用户信息接口",
		"status":  "success",
	})
}
