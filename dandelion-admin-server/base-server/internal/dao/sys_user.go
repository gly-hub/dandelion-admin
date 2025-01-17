package dao

import (
	"dandelion-admin-server/base-server/internal/model"

	"github.com/team-dandelion/go-dandelion/application"
)

type ISysUser interface {
	GetUserInfo(filter model.UserFilter) (user *model.SysUser, err error)
	CreateUser(user *model.SysUser) error
	UpdateUser(user *model.SysUser) error
	DeleteUser(id int32) error
	GetUserList(filter model.UserFilter, page, pageSize int32) (list []model.SysUser, total int64, err error)
}

func NewSysUser() ISysUser {
	return &SysUserDao{}
}

type SysUserDao struct {
	application.DB
	application.Redis
	BaseDao
}

func (s *SysUserDao) GetUserInfo(filter model.UserFilter) (user *model.SysUser, err error) {
	tx := s.GetDB().Model(&model.SysUser{})

	if filter.UserId > 0 {
		tx = tx.Where("id = ?", filter.UserId)
	}

	if filter.UserName != "" {
		tx = tx.Where("user_name = ?", filter.UserName)
	}

	if err := tx.First(&user).Error; err != nil {
		return nil, err
	}

	return
}

func (s *SysUserDao) CreateUser(user *model.SysUser) error {
	return s.GetDB().Create(user).Error
}

func (s *SysUserDao) UpdateUser(user *model.SysUser) error {
	return s.GetDB().Model(&model.SysUser{}).Where("id = ?", user.Id).Updates(map[string]interface{}{
		"nick_name": user.NickName,
		"avatar":    user.Avatar,
		"phone":     user.Phone,
		"status":    user.Status,
	}).Error
}

func (s *SysUserDao) DeleteUser(id int32) error {
	return s.GetDB().Delete(&model.SysUser{}, id).Error
}

func (s *SysUserDao) GetUserList(filter model.UserFilter, page, pageSize int32) (list []model.SysUser, total int64, err error) {
	tx := s.GetDB().Model(&model.SysUser{})

	if filter.UserName != "" {
		tx = tx.Where("user_name LIKE ?", "%"+filter.UserName+"%")
	}

	if filter.Phone != "" {
		tx = tx.Where("phone LIKE ?", "%"+filter.Phone+"%")
	}

	if filter.Status > 0 {
		tx = tx.Where("status = ?", filter.Status)
	}

	if err = tx.Count(&total).Error; err != nil {
		return
	}

	err = s.SetOffsetDefault(tx, page, pageSize).Find(&list).Error
	return
}
