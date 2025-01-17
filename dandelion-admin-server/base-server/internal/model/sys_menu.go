package model

import "dandelion-admin-server/base-server/boot"

func init() {
	boot.Register(&SysMenu{})
}

type SysMenu struct {
	Id       uint   `gorm:"type:int;primaryKey;autoIncrement;comment:主键ID"`
	ParentId uint   `gorm:"type:int;not null;default:0;comment:父菜单ID"`
	Name     string `gorm:"type:varchar(100);not null;comment:菜单名称"`
	Path     string `gorm:"type:varchar(200);comment:菜单路径"`
	Type     int    `gorm:"type:int;not null;default:0;comment:菜单类型 0:目录 1:菜单 2:tab页 3:按钮"`
	Icon     string `gorm:"type:varchar(100);comment:菜单图标"`
	Sort     int    `gorm:"type:int;not null;default:0;comment:排序"`
	Status   int    `gorm:"type:int;not null;default:0;comment:状态 0:正常 1:禁用"`
}

func (SysMenu) TableName() string {
	return "sys_menu"
}

func (SysMenu) TableComment() string {
	return "系统菜单表"
}

type SysMenuApi struct {
	Id     uint   `gorm:"type:int;primaryKey;autoIncrement;comment:主键ID"`
	MenuId uint   `gorm:"type:int;not null;comment:菜单ID"`
	Api    string `gorm:"type:varchar(200);not null;comment:API路径"`
	Method string `gorm:"type:varchar(10);not null;comment:请求方法"`
}

func (SysMenuApi) TableName() string {
	return "sys_menu_api"
}

func (SysMenuApi) TableComment() string {
	return "系统菜单API关联表"
}
