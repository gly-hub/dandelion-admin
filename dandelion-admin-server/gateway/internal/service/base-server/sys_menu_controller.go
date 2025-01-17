package baseserver

import (
	"dandelion-admin-server/proto/base"

	routing "github.com/gly-hub/fasthttp-routing"
	"github.com/team-dandelion/go-dandelion/tools/rpccall"
)

// GetMenuTree
// @tags 系统菜单管理
// @summary 获取菜单树
// @description 获取系统菜单树形结构
// @router /api/sys_menu/search [get]
// @param req body base.GetMenuTreeReq true "json入参"
// @success 200 {object} base.GetMenuTreeResp "返回值"
func (c *Controller) GetMenuTree(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.GetMenuTreeReq{}, c.BaseServer.GetMenuTree)
}

// CreateMenu
// @tags 系统菜单管理
// @summary 创建菜单
// @description 创建系统菜单
// @router /api/sys_menu/create [post]
// @param req body base.CreateMenuReq true "json入参"
// @success 200 {object} base.CreateMenuResp "返回值"
func (c *Controller) CreateMenu(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.CreateMenuReq{}, c.BaseServer.CreateMenu)
}

// UpdateMenu
// @tags 系统菜单管理
// @summary 更新菜单
// @description 更新系统菜单
// @router /api/sys_menu/update [put]
// @param req body base.UpdateMenuReq true "json入参"
// @success 200 {object} base.UpdateMenuResp "返回值"
func (c *Controller) UpdateMenu(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.UpdateMenuReq{}, c.BaseServer.UpdateMenu)
}

// DeleteMenu
// @tags 系统菜单管理
// @summary 删除菜单
// @description 删除系统菜单
// @router /api/sys_menu/delete [delete]
// @param req body base.DeleteMenuReq true "json入参"
// @success 200 {object} base.DeleteMenuResp "返回值"
func (c *Controller) DeleteMenu(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.DeleteMenuReq{}, c.BaseServer.DeleteMenu)
}

// SortMenu
// @tags 系统菜单管理
// @summary 菜单排序
// @description 对系统菜单进行排序
// @router /api/sys_menu/sort [put]
// @param req body base.SortMenuReq true "json入参"
// @success 200 {object} base.SortMenuResp "返回值"
func (c *Controller) SortMenu(ctx *routing.Context) error {
	return rpccall.SProtoCall(ctx, &base.SortMenuReq{}, c.BaseServer.SortMenu)
}
