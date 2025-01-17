package dao

import (
	"dandelion-admin-server/base-server/internal/model"

	"github.com/team-dandelion/go-dandelion/application"
	"gorm.io/gorm"
)

type SysRoleDao struct {
	application.DB
	BaseDao
}

func NewSysRole() *SysRoleDao {
	return &SysRoleDao{}
}

// CreateRole 创建角色
func (d *SysRoleDao) CreateRole(role *model.SysRole, menuIds []int32) error {
	return d.GetDB().Transaction(func(tx *gorm.DB) error {
		// 创建角色
		if err := tx.Create(role).Error; err != nil {
			return err
		}

		// 创建角色-菜单关联
		if len(menuIds) > 0 {
			roleMenus := make([]*model.SysRoleMenu, 0, len(menuIds))
			for _, menuId := range menuIds {
				roleMenus = append(roleMenus, &model.SysRoleMenu{
					RoleId: role.Id,
					MenuId: menuId,
				})
			}
			return tx.Create(&roleMenus).Error
		}
		return nil
	})
}

// UpdateRole 更新角色
func (d *SysRoleDao) UpdateRole(role *model.SysRole, menuIds []int32) error {
	return d.GetDB().Transaction(func(tx *gorm.DB) error {
		// 更新角色信息
		if err := tx.Updates(role).Error; err != nil {
			return err
		}

		// 删除原有的角色-菜单关联
		if err := tx.Where("role_id = ?", role.Id).Delete(&model.SysRoleMenu{}).Error; err != nil {
			return err
		}

		// 创建新的角色-菜单关联
		if len(menuIds) > 0 {
			roleMenus := make([]*model.SysRoleMenu, 0, len(menuIds))
			for _, menuId := range menuIds {
				roleMenus = append(roleMenus, &model.SysRoleMenu{
					RoleId: role.Id,
					MenuId: menuId,
				})
			}
			return tx.Create(&roleMenus).Error
		}
		return nil
	})
}

// DeleteRole 删除角色
func (d *SysRoleDao) DeleteRole(id int32) error {
	return d.GetDB().Transaction(func(tx *gorm.DB) error {
		// 删除角色
		if err := tx.Delete(&model.SysRole{}, id).Error; err != nil {
			return err
		}

		// 删除角色-菜单关联
		if err := tx.Where("role_id = ?", id).Delete(&model.SysRoleMenu{}).Error; err != nil {
			return err
		}

		// 删除用户-角色关联
		return tx.Where("role_id = ?", id).Delete(&model.SysUserRole{}).Error
	})
}

// GetRoleById 根据ID获取角色信息
func (d *SysRoleDao) GetRoleById(id int32) (*model.SysRole, error) {
	var role model.SysRole
	err := d.GetDB().Where("id = ?", id).First(&role).Error
	if err != nil {
		return nil, err
	}
	return &role, nil
}

// GetRoleList 获取角色列表
func (d *SysRoleDao) GetRoleList(filter model.RoleFilter, page, pageSize int32) ([]*model.SysRole, int64, error) {
	var (
		roles []*model.SysRole
		total int64
		db    = d.GetDB().Model(&model.SysRole{})
	)

	// 构建查询条件
	if filter.RoleId > 0 {
		db = db.Where("id = ?", filter.RoleId)
	}
	if filter.Name != "" {
		db = db.Where("name LIKE ?", "%"+filter.Name+"%")
	}
	if filter.Status > 0 {
		db = db.Where("status = ?", filter.Status)
	}

	// 查询总数
	if err := db.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// 分页查询
	if err := d.SetOffsetDefault(db, page, pageSize).Find(&roles).Error; err != nil {
		return nil, 0, err
	}

	return roles, total, nil
}

// AssignUsers 分配用户
func (d *SysRoleDao) AssignUsers(roleId int32, userIds []int32) error {
	return d.GetDB().Transaction(func(tx *gorm.DB) error {
		// 删除原有的用户-角色关联
		if err := tx.Where("role_id = ?", roleId).Delete(&model.SysUserRole{}).Error; err != nil {
			return err
		}

		// 创建新的用户-角色关联
		if len(userIds) > 0 {
			userRoles := make([]*model.SysUserRole, 0, len(userIds))
			for _, userId := range userIds {
				userRoles = append(userRoles, &model.SysUserRole{
					RoleId: roleId,
					UserId: userId,
				})
			}
			return tx.Create(&userRoles).Error
		}
		return nil
	})
}

// GetRoleMenuIds 获取角色关联的菜单ID列表
func (d *SysRoleDao) GetRoleMenuIds(roleId int32) ([]int32, error) {
	var menuIds []int32
	err := d.GetDB().Model(&model.SysRoleMenu{}).Where("role_id = ?", roleId).Pluck("menu_id", &menuIds).Error
	return menuIds, err
}

// GetUserRoleIds 获取角色ID关联的用户列表
func (d *SysRoleDao) GetUserRoleIds(userId int32) ([]int32, error) {
	var roleIds []int32
	err := d.GetDB().Model(&model.SysUserRole{}).Where("role_id = ?", userId).Pluck("user_id", &roleIds).Error
	return roleIds, err
}

// CheckNameExists 检查角色名是否存在
func (d *SysRoleDao) CheckNameExists(name string, excludeId int32) (bool, error) {
	var count int64
	db := d.GetDB().Model(&model.SysRole{}).Where("name = ?", name)
	if excludeId > 0 {
		db = db.Where("id != ?", excludeId)
	}
	if err := db.Count(&count).Error; err != nil {
		return false, err
	}
	return count > 0, nil
}
