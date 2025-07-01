package v1

import (
	"Resume_back/models"
	"Resume_back/services"
	"Resume_back/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserAPI struct {
	userService *services.UserService
}

func NewUserAPI() *UserAPI {
	return &UserAPI{
		userService: services.NewUserService(),
	}
}

// Register 用户注册
// @Summary 用户注册
// @Description 用户注册接口
// @Tags 用户认证
// @Accept json
// @Produce json
// @Param user body models.UserRequest true "用户注册信息"
// @Success 200 {object} utils.Response
// @Router /api/v1/auth/register [post]
func (ua *UserAPI) Register(c *gin.Context) {
	var req models.UserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请求参数错误: "+err.Error())
		return
	}

	user, err := ua.userService.Register(&req)
	if err != nil {
		utils.Error(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessWithMessage(c, "注册成功", user)
}

// Login 用户登录
// @Summary 用户登录
// @Description 用户登录接口
// @Tags 用户认证
// @Accept json
// @Produce json
// @Param login body models.LoginRequest true "登录信息"
// @Success 200 {object} utils.Response
// @Router /api/v1/auth/login [post]
func (ua *UserAPI) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请求参数错误: "+err.Error())
		return
	}

	result, err := ua.userService.Login(&req)
	if err != nil {
		utils.Unauthorized(c, err.Error())
		return
	}

	utils.SuccessWithMessage(c, "登录成功", result)
}
