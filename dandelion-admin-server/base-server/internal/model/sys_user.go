package model

import (
	"dandelion-admin-server/base-server/boot"
	"fmt"
)

func init() {
	boot.Register(&SysUser{})
}

type SysUser struct {
	Id        int32  `gorm:"type:int;primaryKey;autoIncrement"`
	UserName  string `gorm:"type:varchar(255);not null;comment:用户名;unique"`
	Password  string `gorm:"type:varchar(255);not null;comment:密码"`
	NickName  string `gorm:"type:varchar(255);not null;comment:昵称"`
	Avatar    string `gorm:"type:varchar(255);not null;comment:头像"`
	Phone     string `gorm:"type:varchar(255);not null;comment:手机号"`
	Status    int32  `gorm:"type:int;not null;comment:状态"`
	CreatedAt int64  `gorm:"type:bigint;not null;comment:创建时间"`
	UpdatedAt int64  `gorm:"type:bigint;not null;comment:更新时间"`
}

func (s *SysUser) TableName() string {
	return "sys_user"
}

func (s *SysUser) TableComment() string {
	return "系统用户表"
}

type UserMeta struct {
	UserId int32
	Name   string
}

func (u *UserMeta) Unique() string {
	return fmt.Sprintf("DandelionAdmin:SysUserToken:%d", u.UserId)
}

type UserFilter struct {
	UserName string
	UserId   int32
	Phone    string
	Status   int32
}
