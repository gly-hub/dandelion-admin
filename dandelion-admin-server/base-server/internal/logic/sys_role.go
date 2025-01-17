package logic

import (
	"dandelion-admin-server/base-server/internal/dao"
	"dandelion-admin-server/base-server/internal/enum"
	"dandelion-admin-server/base-server/internal/model"
	"dandelion-admin-server/proto/base"
	"time"

	"github.com/team-dandelion/go-dandelion/logger"
	"gorm.io/gorm"
)

type IRole interface {
	CreateRole(req *base.CreateRoleReq) (int32, error)
	UpdateRole(req *base.UpdateRoleReq) error
	DeleteRole(id int32) error
	GetRoleList(req *base.GetRoleListReq) (list []*base.RoleInfo, total int64, err error)
	AssignUsers(req *base.AssignUsersReq) error
}

type Role struct{}

func NewRole() IRole {
	return &Role{}
}

// CreateRole 创建角色
func (r *Role) CreateRole(req *base.CreateRoleReq) (int32, error) {
	// 参数校验
	if req.Name == "" {
		return 0, enum.ParamsError
	}

	// 检查角色名是否存在
	exists, err := dao.NewSysRole().CheckNameExists(req.Name, 0)
	if err != nil {
		return 0, err
	}
	if exists {
		return 0, enum.RoleNameExists
	}

	// 检查菜单是否存在
	if len(req.MenuIds) > 0 {
		for _, menuId := range req.MenuIds {
			menu, err := dao.NewSysMenu().GetMenuById(uint(menuId))
			if err != nil {
				if err == gorm.ErrRecordNotFound {
					return 0, enum.RoleMenuNotFound
				}
				return 0, err
			}
			if menu == nil {
				return 0, enum.RoleMenuNotFound
			}
		}
	}

	// 创建角色
	role := &model.SysRole{
		Name:        req.Name,
		Description: req.Description,
		Status:      req.Status,
		CreatedAt:   time.Now().Unix(),
		UpdatedAt:   time.Now().Unix(),
	}

	// 创建角色并关联菜单
	err = dao.NewSysRole().CreateRole(role, req.MenuIds)
	if err != nil {
		return 0, err
	}

	return role.Id, nil
}

// UpdateRole 更新角色
func (r *Role) UpdateRole(req *base.UpdateRoleReq) error {
	// 参数校验
	if req.Id == 0 || req.Name == "" {
		return enum.ParamsError
	}

	// 检查角色是否存在
	role, err := dao.NewSysRole().GetRoleById(req.Id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return enum.RoleNotFound
		}
		return err
	}

	// 检查角色名是否存在
	exists, err := dao.NewSysRole().CheckNameExists(req.Name, req.Id)
	if err != nil {
		return err
	}
	if exists {
		return enum.RoleNameExists
	}

	// 检查菜单是否存在
	if len(req.MenuIds) > 0 {
		for _, menuId := range req.MenuIds {
			menu, err := dao.NewSysMenu().GetMenuById(uint(menuId))
			if err != nil {
				if err == gorm.ErrRecordNotFound {
					return enum.RoleMenuNotFound
				}
				return err
			}
			if menu == nil {
				return enum.RoleMenuNotFound
			}
		}
	}

	// 更新角色信息
	role.Name = req.Name
	role.Description = req.Description
	role.Status = req.Status
	role.UpdatedAt = time.Now().Unix()

	// 更新角色并关联菜单
	return dao.NewSysRole().UpdateRole(role, req.MenuIds)
}

// DeleteRole 删除角色
func (r *Role) DeleteRole(id int32) error {
	// 参数校验
	if id == 0 {
		return enum.ParamsError
	}

	// 检查角色是否存在
	_, err := dao.NewSysRole().GetRoleById(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return enum.RoleNotFound
		}
		return err
	}

	// 检查是否有用户使用该角色
	userIds, err := dao.NewSysRole().GetUserRoleIds(id)
	if err != nil {
		return err
	}
	if len(userIds) > 0 {
		return enum.RoleHasUsers
	}

	// 删除角色
	return dao.NewSysRole().DeleteRole(id)
}

// GetRoleList 获取角色列表
func (r *Role) GetRoleList(req *base.GetRoleListReq) (list []*base.RoleInfo, total int64, err error) {
	// 构建查询条件
	filter := model.RoleFilter{
		Name:   req.Name,
		Status: req.Status,
	}

	// 获取角色列表
	roles, total, err := dao.NewSysRole().GetRoleList(filter, req.Page, req.PageSize)
	if err != nil {
		return nil, 0, err
	}

	// 转换为proto结构
	list = make([]*base.RoleInfo, 0, len(roles))
	for _, role := range roles {
		// 获取角色关联的菜单ID
		menuIds, err := dao.NewSysRole().GetRoleMenuIds(role.Id)
		if err != nil {
			return nil, 0, err
		}

		// 获取角色关联的用户ID
		userIds, err := dao.NewSysRole().GetUserRoleIds(role.Id)
		if err != nil {
			return nil, 0, err
		}
		logger.Debug("userIds", userIds)
		list = append(list, &base.RoleInfo{
			Id:          role.Id,
			Name:        role.Name,
			Description: role.Description,
			Status:      role.Status,
			CreatedAt:   role.CreatedAt,
			UpdatedAt:   role.UpdatedAt,
			MenuIds:     menuIds,
			UserIds:     userIds,
		})
	}

	return list, total, nil
}

// AssignUsers 分配用户
func (r *Role) AssignUsers(req *base.AssignUsersReq) error {
	// 参数校验
	if req.RoleId == 0 {
		return enum.ParamsError
	}

	// 检查角色是否存在
	_, err := dao.NewSysRole().GetRoleById(req.RoleId)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return enum.RoleNotFound
		}
		return err
	}

	// 检查用户是否存在
	if len(req.UserIds) > 0 {
		for _, userId := range req.UserIds {
			user, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
				UserId: userId,
			})
			if err != nil {
				if err == gorm.ErrRecordNotFound {
					return enum.RoleUserNotFound
				}
				return err
			}
			if user == nil {
				return enum.RoleUserNotFound
			}
		}
	}

	// 分配用户
	return dao.NewSysRole().AssignUsers(req.RoleId, req.UserIds)
}
