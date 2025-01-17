package logic

import (
	"dandelion-admin-server/base-server/internal/dao"
	"dandelion-admin-server/base-server/internal/enum"
	"dandelion-admin-server/base-server/internal/model"
	"dandelion-admin-server/base-server/tools/encrypt"
	"dandelion-admin-server/proto/base"

	"sort"

	"github.com/gly-hub/dandelion-plugs/jwt"
	"gorm.io/gorm"
)

type IAuth interface {
	Login(params *base.LoginParams) (token string, err error)
	GetUserMenu() (list []*base.MenuTreeNode, err error)
	GetUserInfo(userId int32) (userInfo *base.UserInfo, err error)
}

type Auth struct{}

func NewAuth() IAuth {
	return &Auth{}
}

func (a *Auth) Login(params *base.LoginParams) (token string, err error) {
	if params == nil || params.UserName == "" || params.Password == "" {
		err = enum.ParamsError
		return
	}

	user, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
		UserName: params.UserName,
	})

	if err != nil && err != gorm.ErrRecordNotFound {
		return
	}

	if err == gorm.ErrRecordNotFound {
		err = enum.SysUserNotFound
		return
	}

	if user.Password != encrypt.MD5(params.Password) {
		err = enum.PasswordError
		return
	}

	// 生成token
	token, err = jwt.Token(&model.UserMeta{
		UserId: user.Id,
		Name:   user.NickName,
	})

	return
}

func (a *Auth) GetUserMenu() (list []*base.MenuTreeNode, err error) {
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
		// 只返回目录和菜单类型，不返回按钮
		if menu.Type > 2 {
			continue
		}
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

func (a *Auth) GetUserInfo(userId int32) (userInfo *base.UserInfo, err error) {
	user, err := dao.NewSysUser().GetUserInfo(model.UserFilter{
		UserId: userId,
	})
	if err != nil {
		return
	}

	userInfo = &base.UserInfo{
		Id:       user.Id,
		UserName: user.UserName,
		NickName: user.NickName,
		Avatar:   user.Avatar,
		Phone:    user.Phone,
		Status:   int32(user.Status),
	}
	return
}
