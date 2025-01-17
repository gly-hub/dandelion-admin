package logic

import (
	"dandelion-admin-server/base-server/internal/dao"
	"dandelion-admin-server/base-server/internal/enum"
	"dandelion-admin-server/base-server/internal/model"
	"dandelion-admin-server/proto/base"
	"sort"

	"github.com/team-dandelion/go-dandelion/logger"
)

type IMenu interface {
	GetMenuTree() (list []*base.MenuTreeNode, err error)
	CreateMenu(req *base.CreateMenuReq) (id uint32, err error)
	UpdateMenu(req *base.UpdateMenuReq) error
	DeleteMenu(id uint32) error
	SortMenu(req *base.SortMenuReq) error
}

type Menu struct{}

func NewMenu() IMenu {
	return &Menu{}
}

func (m *Menu) GetMenuTree() (list []*base.MenuTreeNode, err error) {
	// 获取所有菜单
	menuList, err := dao.NewSysMenu().GetMenuList()
	if err != nil {
		return
	}

	// 转换为树状结构
	menuMap := make(map[uint]*base.MenuTreeNode)
	var rootNodes []*base.MenuTreeNode

	// 第一步：创建所有节点
	for _, menu := range menuList {
		node := &base.MenuTreeNode{
			Id:       uint32(menu.Id),
			ParentId: uint32(menu.ParentId),
			Name:     menu.Name,
			Path:     menu.Path,
			Type:     int32(menu.Type),
			Icon:     menu.Icon,
			Sort:     int32(menu.Sort),
			Status:   int32(menu.Status),
			Children: make([]*base.MenuTreeNode, 0),
		}
		menuMap[menu.Id] = node
	}

	// 第二步：构建树状结构
	for _, node := range menuMap {
		if node.ParentId == 0 {
			rootNodes = append(rootNodes, node)
		} else {
			if parent, exists := menuMap[uint(node.ParentId)]; exists {
				parent.Children = append(parent.Children, node)
			}
		}
	}

	// 第三步：对每一层的节点进行排序
	var sortMenuNodes func(nodes []*base.MenuTreeNode)
	sortMenuNodes = func(nodes []*base.MenuTreeNode) {
		sort.Slice(nodes, func(i, j int) bool {
			return nodes[i].Sort < nodes[j].Sort
		})
		// 递归排序子节点
		for _, node := range nodes {
			if len(node.Children) > 0 {
				sortMenuNodes(node.Children)
			}
		}
	}

	// 对根节点进行排序
	sortMenuNodes(rootNodes)

	list = rootNodes
	return
}

func (m *Menu) CreateMenu(req *base.CreateMenuReq) (id uint32, err error) {
	// 参数校验
	if req.Name == "" {
		err = enum.ParamsError
		return
	}

	// 如果有父级菜单，检查父级菜单是否存在
	if req.ParentId != 0 {
		parent, err := dao.NewSysMenu().GetMenuById(uint(req.ParentId))
		if err != nil {
			return 0, enum.ParentMenuNotFound
		}
		// 检查父级菜单类型
		if int32(parent.Type) >= req.Type || (int32(parent.Type) == 3 && req.Type == 3) {
			return 0, enum.ParentMenuTypeError
		}
		logger.Info("parent.Type: %d, req.Type: %d", parent.Type, req.Type)
		logger.Info("校验: %v", int32(parent.Type) <= req.Type && (parent.Type != 3 ||
			(int32(parent.Type) == 3 && req.Type != 3)))
	}

	menu := &model.SysMenu{
		ParentId: uint(req.ParentId),
		Name:     req.Name,
		Path:     req.Path,
		Type:     int(req.Type),
		Icon:     req.Icon,
		Sort:     int(req.Sort),
		Status:   int(req.Status),
	}

	err = dao.NewSysMenu().CreateMenu(menu)
	if err != nil {
		return
	}

	id = uint32(menu.Id)
	return
}

func (m *Menu) UpdateMenu(req *base.UpdateMenuReq) error {
	// 参数校验
	if req.Id == 0 || req.Name == "" {
		return enum.ParamsError
	}

	// 检查菜单是否存在
	menu, err := dao.NewSysMenu().GetMenuById(uint(req.Id))
	if err != nil {
		return enum.MenuNotFound
	}

	// 如果有父级菜单，检查父级菜单是否存在
	if req.ParentId != 0 {
		parent, err := dao.NewSysMenu().GetMenuById(uint(req.ParentId))
		if err != nil {
			return enum.ParentMenuNotFound
		}
		// 检查父级菜单类型
		if parent.Type > 1 {
			return enum.ParentMenuTypeError
		}
		// 检查是否形成循环
		if req.Id == req.ParentId {
			return enum.MenuCircularDependency
		}
	}

	menu.ParentId = uint(req.ParentId)
	menu.Name = req.Name
	menu.Path = req.Path
	menu.Type = int(req.Type)
	menu.Icon = req.Icon
	menu.Sort = int(req.Sort)
	menu.Status = int(req.Status)

	return dao.NewSysMenu().UpdateMenu(menu)
}

func (m *Menu) DeleteMenu(id uint32) error {
	// 检查菜单是否存在
	menu, err := dao.NewSysMenu().GetMenuById(uint(id))
	if err != nil {
		return enum.MenuNotFound
	}

	// 检查是否有子菜单
	menuList, err := dao.NewSysMenu().GetMenuList()
	if err != nil {
		return err
	}

	for _, m := range menuList {
		if m.ParentId == menu.Id {
			return enum.MenuHasChildren
		}
	}

	return dao.NewSysMenu().DeleteMenu(uint(id))
}

func (m *Menu) SortMenu(req *base.SortMenuReq) error {
	logger.Info("req: %v", req)
	if len(req.List) == 0 {
		return enum.ParamsError
	}

	// 获取所有需要更新的菜单
	menuMap := make(map[uint]*model.SysMenu)
	for _, item := range req.List {
		menu, err := dao.NewSysMenu().GetMenuById(uint(item.Id))
		if err != nil {
			return enum.MenuNotFound
		}
		menuMap[uint(item.Id)] = menu
	}

	// 校验父级菜单类型
	for _, item := range req.List {
		menu := menuMap[uint(item.Id)]
		if item.ParentId != uint32(menu.ParentId) {
			// 如果更改了父级菜单，需要校验父级菜单类型
			parent, err := dao.NewSysMenu().GetMenuById(uint(item.ParentId))
			if err != nil {
				return enum.ParentMenuNotFound
			}

			// 检查父级菜单类型
			if int32(parent.Type) >= int32(menu.Type) || (int32(parent.Type) == 3 && int32(menu.Type) == 3) {
				return enum.ParentMenuTypeError
			}

			// 检查是否形成循环
			if item.Id == item.ParentId {
				return enum.MenuCircularDependency
			}
		}
	}

	// 准备更新数据
	var menus []*model.SysMenu
	for _, item := range req.List {
		menu := menuMap[uint(item.Id)]
		menu.ParentId = uint(item.ParentId)
		menu.Sort = int(item.Sequence)
		menus = append(menus, menu)
	}

	// 使用dao层的事务方法批量更新
	return dao.NewSysMenu().BatchSortMenus(menus)
}
