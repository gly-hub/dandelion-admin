package baseserver

import (
	"dandelion-admin-server/proto/base"

	routing "github.com/gly-hub/fasthttp-routing"
	"github.com/team-dandelion/go-dandelion/tools/rpccall"
)

// CreateRole
// @tags 角色管理
// @summary 创建角色
// @description 创建系统角色
// @router /api/sys_role/create [post]
// @param req body base.CreateRoleReq true "json入参"
// @success 200 {object} base.CreateRoleResp "返回值"
func (c *Controller) CreateRole(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.CreateRoleReq{}, c.BaseServer.CreateRole)
}

// UpdateRole
// @tags 角色管理
// @summary 更新角色
// @description 更新系统角色
// @router /api/sys_role/update [put]
// @param req body base.UpdateRoleReq true "json入参"
// @success 200 {object} base.UpdateRoleResp "返回值"
func (c *Controller) UpdateRole(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.UpdateRoleReq{}, c.BaseServer.UpdateRole)
}

// DeleteRole
// @tags 角色管理
// @summary 删除角色
// @description 删除系统角色
// @router /api/sys_role/delete [delete]
// @param req body base.DeleteRoleReq true "json入参"
// @success 200 {object} base.DeleteRoleResp "返回值"
func (c *Controller) DeleteRole(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.DeleteRoleReq{}, c.BaseServer.DeleteRole)
}

// GetRoleList
// @tags 角色管理
// @summary 获取角色列表
// @description 获取系统角色列表
// @router /api/sys_role/search [post]
// @param req body base.GetRoleListReq true "json入参"
// @success 200 {object} base.GetRoleListResp "返回值"
func (c *Controller) GetRoleList(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.GetRoleListReq{}, c.BaseServer.GetRoleList)
}

// AssignUsers
// @tags 角色管理
// @summary 分配用户
// @description 为角色分配用户
// @router /api/sys_role/assign_users [post]
// @param req body base.AssignUsersReq true "json入参"
// @success 200 {object} base.AssignUsersResp "返回值"
func (c *Controller) AssignUsers(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.AssignUsersReq{}, c.BaseServer.AssignUsers)
}
