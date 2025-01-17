package route

import (
	baseserver "dandelion-admin-server/gateway/internal/service/base-server"

	routing "github.com/gly-hub/fasthttp-routing"
)

func initBaseServerRoute(baseRouter *routing.RouteGroup) {
	baseServerController := baseserver.NewController()
	{
		baseRouter.Post("/login", baseServerController.Login)
		baseRouter.Get("/user/menu", baseServerController.GetUserMenu)
		baseRouter.Get("/user/info", baseServerController.GetUserInfo)

		// 系统菜单管理
		sysMenuRouter := baseRouter.Group("/sys_menu")
		{
			sysMenuRouter.Get("/search", baseServerController.GetMenuTree)
			sysMenuRouter.Post("/create", baseServerController.CreateMenu)
			sysMenuRouter.Put("/update", baseServerController.UpdateMenu)
			sysMenuRouter.Delete("/delete", baseServerController.DeleteMenu)
			sysMenuRouter.Put("/sort", baseServerController.SortMenu)
		}

		// 系统用户管理
		sysUserRouter := baseRouter.Group("/sys_user")
		{
			sysUserRouter.Post("/search", baseServerController.GetSysUserList)
			sysUserRouter.Post("/create", baseServerController.CreateSysUser)
			sysUserRouter.Put("/update", baseServerController.UpdateSysUser)
			sysUserRouter.Delete("/delete", baseServerController.DeleteSysUser)
		}

		// 角色管理
		sysRoleRouter := baseRouter.Group("/sys_role")
		{
			sysRoleRouter.Post("/create", baseServerController.CreateRole)
			sysRoleRouter.Put("/update", baseServerController.UpdateRole)
			sysRoleRouter.Delete("/delete", baseServerController.DeleteRole)
			sysRoleRouter.Post("/search", baseServerController.GetRoleList)
			sysRoleRouter.Post("/assign_users", baseServerController.AssignUsers)
		}
	}
}
