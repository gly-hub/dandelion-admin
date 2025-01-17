package enum

type Error struct {
	Code int32
	Msg  string
}

func (e *Error) Error() string {
	return e.Msg
}

var (
	Success = &Error{Code: 0, Msg: "success"}
	Failed  = &Error{Code: -1, Msg: "failed"}

	// 系统错误 (500xx)
	SystemError = &Error{Code: 50000, Msg: "系统错误"}
	ParamsError = &Error{Code: 50001, Msg: "参数错误"}
	DBError     = &Error{Code: 50002, Msg: "数据库错误"}

	// 认证错误 (501xx)
	NotLogin     = &Error{Code: 50100, Msg: "未登录"}
	NoPermission = &Error{Code: 50101, Msg: "无权限"}

	// 用户相关错误 (502xx)
	SysUserNotFound = &Error{Code: 50200, Msg: "用户不存在"}
	PasswordError   = &Error{Code: 50201, Msg: "密码错误"}
	UserNameExists  = &Error{Code: 50202, Msg: "用户名已存在"}

	// 菜单相关错误 (503xx)
	MenuNotFound           = &Error{Code: 50300, Msg: "菜单不存在"}
	ParentMenuNotFound     = &Error{Code: 50301, Msg: "父级菜单不存在"}
	ParentMenuTypeError    = &Error{Code: 50302, Msg: "父级菜单类型错误"}
	MenuCircularDependency = &Error{Code: 50303, Msg: "菜单不能形成循环依赖"}
	MenuHasChildren        = &Error{Code: 50304, Msg: "菜单存在子菜单，不能删除"}

	// 角色管理错误码
	RoleNameExists   = &Error{Code: 20301, Msg: "角色名称已存在"}
	RoleNotFound     = &Error{Code: 20302, Msg: "角色不存在"}
	RoleHasUsers     = &Error{Code: 20303, Msg: "角色下存在用户，无法删除"}
	RoleMenuNotFound = &Error{Code: 20304, Msg: "菜单不存在"}
	RoleUserNotFound = &Error{Code: 20305, Msg: "用户不存在"}
)
