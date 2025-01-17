package dao

import (
	"dandelion-admin-server/base-server/internal/model"

	"github.com/team-dandelion/go-dandelion/application"
	"gorm.io/gorm"
)

type ISysMenu interface {
	GetMenuList() (list []model.SysMenu, err error)
	CreateMenu(menu *model.SysMenu) error
	UpdateMenu(menu *model.SysMenu) error
	DeleteMenu(id uint) error
	GetMenuById(id uint) (*model.SysMenu, error)
	BatchSortMenus(menus []*model.SysMenu) error
}

type SysMenu struct {
	application.DB
}

func NewSysMenu() ISysMenu {
	return &SysMenu{}
}

func (s *SysMenu) GetMenuList() (list []model.SysMenu, err error) {
	err = s.GetDB().Model(&model.SysMenu{}).Order("sort asc").Find(&list).Error
	return
}

func (s *SysMenu) CreateMenu(menu *model.SysMenu) error {
	return s.GetDB().Create(menu).Error
}

func (s *SysMenu) UpdateMenu(menu *model.SysMenu) error {
	return s.GetDB().Model(&model.SysMenu{}).Where("id = ?", menu.Id).Save(menu).Error
}

func (s *SysMenu) DeleteMenu(id uint) error {
	return s.GetDB().Delete(&model.SysMenu{}, id).Error
}

func (s *SysMenu) GetMenuById(id uint) (*model.SysMenu, error) {
	var menu model.SysMenu
	err := s.GetDB().First(&menu, id).Error
	return &menu, err
}

func (s *SysMenu) BatchSortMenus(menus []*model.SysMenu) error {
	return s.GetDB().Transaction(func(tx *gorm.DB) error {
		for _, menu := range menus {
			if err := tx.Model(&model.SysMenu{}).Where("id = ?", menu.Id).Updates(map[string]interface{}{
				"parent_id": menu.ParentId,
				"sort":      menu.Sort,
			}).Error; err != nil {
				return err
			}
		}
		return nil
	})
}
