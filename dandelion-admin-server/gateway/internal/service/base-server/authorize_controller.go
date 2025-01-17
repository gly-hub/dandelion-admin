package baseserver

import (
	"dandelion-admin-server/proto/base"

	routing "github.com/gly-hub/fasthttp-routing"
	"github.com/team-dandelion/go-dandelion/tools/rpccall"
)

// Login
// @tags 系统认证
// @summary 用户登录
// @description 用户登录接口
// @router /api/login [post]
// @param req body base.LoginParams true "json入参"
// @success 200 {object} base.LoginResp "返回值"
func (c *Controller) Login(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.LoginParams{}, c.BaseServer.Login)
}

// GetUserMenu
// @tags 系统认证
// @summary 获取用户菜单
// @description 获取当前登录用户的菜单列表
// @router /api/user/menu [get]
// @param req body base.GetUserMenuReq true "json入参"
// @success 200 {object} base.GetUserMenuResp "返回值"
func (c *Controller) GetUserMenu(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.GetUserMenuReq{}, c.BaseServer.GetUserMenu)
}

// GetUserInfo
// @tags 系统认证
// @summary 获取用户信息
// @description 获取当前登录用户的信息
// @router /api/user/info [get]
// @param req body base.GetUserInfoReq true "json入参"
// @success 200 {object} base.GetUserInfoResp "返回值"
func (c *Controller) GetUserInfo(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.GetUserInfoReq{}, c.BaseServer.GetUserInfo)
}
