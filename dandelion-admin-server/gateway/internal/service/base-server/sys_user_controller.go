package baseserver

import (
	"dandelion-admin-server/proto/base"

	routing "github.com/gly-hub/fasthttp-routing"
	"github.com/team-dandelion/go-dandelion/tools/rpccall"
)

// GetSysUserList
// @tags 系统用户管理
// @summary 获取用户列表
// @description 获取系统用户列表
// @router /api/sys_user/search [post]
// @param req body base.GetSysUserListReq true "json入参"
// @success 200 {object} base.GetSysUserListResp "返回值"
func (c *Controller) GetSysUserList(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.GetSysUserListReq{}, c.BaseServer.GetSysUserList)
}

// CreateSysUser
// @tags 系统用户管理
// @summary 创建用户
// @description 创建系统用户
// @router /api/sys_user/create [post]
// @param req body base.CreateSysUserReq true "json入参"
// @success 200 {object} base.CreateSysUserResp "返回值"
func (c *Controller) CreateSysUser(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.CreateSysUserReq{}, c.BaseServer.CreateSysUser)
}

// UpdateSysUser
// @tags 系统用户管理
// @summary 更新用户
// @description 更新系统用户
// @router /api/sys_user/update [put]
// @param req body base.UpdateSysUserReq true "json入参"
// @success 200 {object} base.UpdateSysUserResp "返回值"
func (c *Controller) UpdateSysUser(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.UpdateSysUserReq{}, c.BaseServer.UpdateSysUser)
}

// DeleteSysUser
// @tags 系统用户管理
// @summary 删除用户
// @description 删除系统用户
// @router /api/sys_user/delete [delete]
// @param req body base.DeleteSysUserReq true "json入参"
// @success 200 {object} base.DeleteSysUserResp "返回值"
func (c *Controller) DeleteSysUser(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.DeleteSysUserReq{}, c.BaseServer.DeleteSysUser)
}
