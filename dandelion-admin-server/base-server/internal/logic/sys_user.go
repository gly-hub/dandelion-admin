package logic

import (
	"dandelion-admin-server/base-server/internal/dao"
	"dandelion-admin-server/base-server/internal/enum"
	"dandelion-admin-server/base-server/internal/model"
	"dandelion-admin-server/base-server/tools/encrypt"
	"dandelion-admin-server/proto/base"
	"time"

	"gorm.io/gorm"
)

type ISysUser interface {
	CreateUser(req *base.CreateSysUserReq) error
	UpdateUser(req *base.UpdateSysUserReq) error
	DeleteUser(id int32) error
	GetUserList(req *base.GetSysUserListReq) (list []*base.SysUserInfo, total int64, err error)
}

type SysUser struct{}

func NewSysUser() ISysUser {
	return &SysUser{}
}

func (s *SysUser) CreateUser(req *base.CreateSysUserReq) error {
	// 参数校验
	if req.UserName == "" || req.Password == "" {
		return enum.ParamsError
	}

	// 检查用户名是否已存在
	_, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
		UserName: req.UserName,
	})
	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}
	if err == nil {
		return enum.UserNameExists
	}

	// 创建用户
	user := &model.SysUser{
		UserName:  req.UserName,
		Password:  encrypt.MD5(req.Password),
		NickName:  req.NickName,
		Avatar:    req.Avatar,
		Phone:     req.Phone,
		Status:    req.Status,
		CreatedAt: time.Now().Unix(),
		UpdatedAt: time.Now().Unix(),
	}

	return dao.NewSysUser().CreateUser(user)
}

func (s *SysUser) UpdateUser(req *base.UpdateSysUserReq) error {
	// 参数校验
	if req.Id == 0 {
		return enum.ParamsError
	}

	// 检查用户是否存在
	user, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
		UserId: req.Id,
	})
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return enum.SysUserNotFound
		}
		return err
	}

	// 更新用户信息
	user.NickName = req.NickName
	user.Avatar = req.Avatar
	user.Phone = req.Phone
	user.Status = req.Status
	user.UpdatedAt = time.Now().Unix()

	return dao.NewSysUser().UpdateUser(user)
}

func (s *SysUser) DeleteUser(id int32) error {
	// 参数校验
	if id == 0 {
		return enum.ParamsError
	}

	// 检查用户是否存在
	_, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
		UserId: id,
	})
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return enum.SysUserNotFound
		}
		return err
	}

	return dao.NewSysUser().DeleteUser(id)
}

func (s *SysUser) GetUserList(req *base.GetSysUserListReq) (list []*base.SysUserInfo, total int64, err error) {
	// 构建查询条件
	filter := model.UserFilter{
		UserName: req.UserName,
		Phone:    req.Phone,
		Status:   req.Status,
	}

	// 获取用户列表
	userList, total, err := dao.NewSysUser().GetUserList(filter, req.Page, req.PageSize)
	if err != nil {
		return
	}

	// 转换为proto结构
	for _, user := range userList {
		list = append(list, &base.SysUserInfo{
			Id:        user.Id,
			UserName:  user.UserName,
			NickName:  user.NickName,
			Avatar:    user.Avatar,
			Phone:     user.Phone,
			Status:    user.Status,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		})
	}

	return
}
