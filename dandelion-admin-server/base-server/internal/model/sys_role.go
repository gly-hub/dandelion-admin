package model

import "dandelion-admin-server/base-server/boot"

func init() {
	boot.Register(&SysRole{}, &SysRoleMenu{}, &SysUserRole{})
}

// 角色表
type SysRole struct {
	Id          int32  `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"size:50;not null;comment:角色名称"`
	Description string `gorm:"size:200;comment:角色描述"`
	Status      int32  `gorm:"default:1;comment:状态 1-启用 2-禁用"`
	CreatedAt   int64  `gorm:"comment:创建时间"`
	UpdatedAt   int64  `gorm:"comment:更新时间"`
}

func (s *SysRole) TableName() string {
	return "sys_role"
}

func (s *SysRole) TableComment() string {
	return "角色表"
}

// 角色-菜单关联表
type SysRoleMenu struct {
	Id     int32 `gorm:"primaryKey;autoIncrement"`
	RoleId int32 `gorm:"not null;comment:角色ID"`
	MenuId int32 `gorm:"not null;comment:菜单ID"`
}

func (s *SysRoleMenu) TableName() string {
	return "sys_role_menu"
}

func (s *SysRoleMenu) TableComment() string {
	return "角色-菜单关联表"
}

// 用户-角色关联表
type SysUserRole struct {
	Id     int32 `gorm:"primaryKey;autoIncrement"`
	UserId int32 `gorm:"not null;comment:用户ID"`
	RoleId int32 `gorm:"not null;comment:角色ID"`
}

func (s *SysUserRole) TableName() string {
	return "sys_user_role"
}

func (s *SysUserRole) TableComment() string {
	return "用户-角色关联表"
}

// 角色查询过滤条件
type RoleFilter struct {
	RoleId int32  // 角色ID
	Name   string // 角色名称
	Status int32  // 状态
}
