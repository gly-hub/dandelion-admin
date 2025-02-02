// Code generated by protoc-gen-rpcx. DO NOT EDIT.
// versions:
// - protoc-gen-rpcx v0.3.0
// - protoc          v5.27.1
// source: server.proto

package base

import (
	context "context"
	client "github.com/smallnest/rpcx/client"
	protocol "github.com/smallnest/rpcx/protocol"
	server "github.com/smallnest/rpcx/server"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = context.TODO
var _ = server.NewServer
var _ = client.NewClient
var _ = protocol.NewMessage

// ================== interface skeleton ===================
type BaseServerServiceAble interface {
	// BaseServerServiceAble can be used for interface verification.

	// Login is server rpc method as defined
	Login(ctx context.Context, args *LoginParams, reply *LoginResp) (err error)

	// GetUserMenu is server rpc method as defined
	GetUserMenu(ctx context.Context, args *GetUserMenuReq, reply *GetUserMenuResp) (err error)

	// GetUserInfo is server rpc method as defined
	GetUserInfo(ctx context.Context, args *GetUserInfoReq, reply *GetUserInfoResp) (err error)

	// GetMenuTree is server rpc method as defined
	GetMenuTree(ctx context.Context, args *GetMenuTreeReq, reply *GetMenuTreeResp) (err error)

	// CreateMenu is server rpc method as defined
	CreateMenu(ctx context.Context, args *CreateMenuReq, reply *CreateMenuResp) (err error)

	// UpdateMenu is server rpc method as defined
	UpdateMenu(ctx context.Context, args *UpdateMenuReq, reply *UpdateMenuResp) (err error)

	// DeleteMenu is server rpc method as defined
	DeleteMenu(ctx context.Context, args *DeleteMenuReq, reply *DeleteMenuResp) (err error)

	// SortMenu is server rpc method as defined
	SortMenu(ctx context.Context, args *SortMenuReq, reply *SortMenuResp) (err error)

	// CreateSysUser is server rpc method as defined
	CreateSysUser(ctx context.Context, args *CreateSysUserReq, reply *CreateSysUserResp) (err error)

	// UpdateSysUser is server rpc method as defined
	UpdateSysUser(ctx context.Context, args *UpdateSysUserReq, reply *UpdateSysUserResp) (err error)

	// DeleteSysUser is server rpc method as defined
	DeleteSysUser(ctx context.Context, args *DeleteSysUserReq, reply *DeleteSysUserResp) (err error)

	// GetSysUserList is server rpc method as defined
	GetSysUserList(ctx context.Context, args *GetSysUserListReq, reply *GetSysUserListResp) (err error)

	// CreateRole is server rpc method as defined
	CreateRole(ctx context.Context, args *CreateRoleReq, reply *CreateRoleResp) (err error)

	// UpdateRole is server rpc method as defined
	UpdateRole(ctx context.Context, args *UpdateRoleReq, reply *UpdateRoleResp) (err error)

	// DeleteRole is server rpc method as defined
	DeleteRole(ctx context.Context, args *DeleteRoleReq, reply *DeleteRoleResp) (err error)

	// GetRoleList is server rpc method as defined
	GetRoleList(ctx context.Context, args *GetRoleListReq, reply *GetRoleListResp) (err error)

	// AssignUsers is server rpc method as defined
	AssignUsers(ctx context.Context, args *AssignUsersReq, reply *AssignUsersResp) (err error)
}

// ================== server skeleton ===================
type BaseServerServiceImpl struct{}

// ServeForBaseServerService starts a server only registers one service.
// You can register more services and only start one server.
// It blocks until the application exits.
func ServeForBaseServerService(addr string) error {
	s := server.NewServer()
	s.RegisterName("BaseServerService", new(BaseServerServiceImpl), "")
	return s.Serve("tcp", addr)
}

// Login is server rpc method as defined
func (s *BaseServerServiceImpl) Login(ctx context.Context, args *LoginParams, reply *LoginResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = LoginResp{}

	return nil
}

// GetUserMenu is server rpc method as defined
func (s *BaseServerServiceImpl) GetUserMenu(ctx context.Context, args *GetUserMenuReq, reply *GetUserMenuResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = GetUserMenuResp{}

	return nil
}

// GetUserInfo is server rpc method as defined
func (s *BaseServerServiceImpl) GetUserInfo(ctx context.Context, args *GetUserInfoReq, reply *GetUserInfoResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = GetUserInfoResp{}

	return nil
}

// GetMenuTree is server rpc method as defined
func (s *BaseServerServiceImpl) GetMenuTree(ctx context.Context, args *GetMenuTreeReq, reply *GetMenuTreeResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = GetMenuTreeResp{}

	return nil
}

// CreateMenu is server rpc method as defined
func (s *BaseServerServiceImpl) CreateMenu(ctx context.Context, args *CreateMenuReq, reply *CreateMenuResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = CreateMenuResp{}

	return nil
}

// UpdateMenu is server rpc method as defined
func (s *BaseServerServiceImpl) UpdateMenu(ctx context.Context, args *UpdateMenuReq, reply *UpdateMenuResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = UpdateMenuResp{}

	return nil
}

// DeleteMenu is server rpc method as defined
func (s *BaseServerServiceImpl) DeleteMenu(ctx context.Context, args *DeleteMenuReq, reply *DeleteMenuResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = DeleteMenuResp{}

	return nil
}

// SortMenu is server rpc method as defined
func (s *BaseServerServiceImpl) SortMenu(ctx context.Context, args *SortMenuReq, reply *SortMenuResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = SortMenuResp{}

	return nil
}

// CreateSysUser is server rpc method as defined
func (s *BaseServerServiceImpl) CreateSysUser(ctx context.Context, args *CreateSysUserReq, reply *CreateSysUserResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = CreateSysUserResp{}

	return nil
}

// UpdateSysUser is server rpc method as defined
func (s *BaseServerServiceImpl) UpdateSysUser(ctx context.Context, args *UpdateSysUserReq, reply *UpdateSysUserResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = UpdateSysUserResp{}

	return nil
}

// DeleteSysUser is server rpc method as defined
func (s *BaseServerServiceImpl) DeleteSysUser(ctx context.Context, args *DeleteSysUserReq, reply *DeleteSysUserResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = DeleteSysUserResp{}

	return nil
}

// GetSysUserList is server rpc method as defined
func (s *BaseServerServiceImpl) GetSysUserList(ctx context.Context, args *GetSysUserListReq, reply *GetSysUserListResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = GetSysUserListResp{}

	return nil
}

// CreateRole is server rpc method as defined
func (s *BaseServerServiceImpl) CreateRole(ctx context.Context, args *CreateRoleReq, reply *CreateRoleResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = CreateRoleResp{}

	return nil
}

// UpdateRole is server rpc method as defined
func (s *BaseServerServiceImpl) UpdateRole(ctx context.Context, args *UpdateRoleReq, reply *UpdateRoleResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = UpdateRoleResp{}

	return nil
}

// DeleteRole is server rpc method as defined
func (s *BaseServerServiceImpl) DeleteRole(ctx context.Context, args *DeleteRoleReq, reply *DeleteRoleResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = DeleteRoleResp{}

	return nil
}

// GetRoleList is server rpc method as defined
func (s *BaseServerServiceImpl) GetRoleList(ctx context.Context, args *GetRoleListReq, reply *GetRoleListResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = GetRoleListResp{}

	return nil
}

// AssignUsers is server rpc method as defined
func (s *BaseServerServiceImpl) AssignUsers(ctx context.Context, args *AssignUsersReq, reply *AssignUsersResp) (err error) {
	// TODO: add business logics

	// TODO: setting return values
	*reply = AssignUsersResp{}

	return nil
}

//================== client stub ===================
// BaseServerService is a client wrapped XClient.
type BaseServerServiceClient struct {
	xclient client.XClient
}

// NewBaseServerServiceClient wraps a XClient as BaseServerServiceClient.
// You can pass a shared XClient object created by NewXClientForBaseServerService.
func NewBaseServerServiceClient(xclient client.XClient) *BaseServerServiceClient {
	return &BaseServerServiceClient{xclient: xclient}
}

// NewXClientForBaseServerService creates a XClient.
// You can configure this client with more options such as etcd registry, serialize type, select algorithm and fail mode.
func NewXClientForBaseServerService(addr string) (client.XClient, error) {
	d, err := client.NewPeer2PeerDiscovery("tcp@"+addr, "")
	if err != nil {
		return nil, err
	}

	opt := client.DefaultOption
	opt.SerializeType = protocol.ProtoBuffer

	xclient := client.NewXClient("BaseServerService", client.Failtry, client.RoundRobin, d, opt)

	return xclient, nil
}

// Login is client rpc method as defined
func (c *BaseServerServiceClient) Login(ctx context.Context, args *LoginParams) (reply *LoginResp, err error) {
	reply = &LoginResp{}
	err = c.xclient.Call(ctx, "Login", args, reply)
	return reply, err
}

// GetUserMenu is client rpc method as defined
func (c *BaseServerServiceClient) GetUserMenu(ctx context.Context, args *GetUserMenuReq) (reply *GetUserMenuResp, err error) {
	reply = &GetUserMenuResp{}
	err = c.xclient.Call(ctx, "GetUserMenu", args, reply)
	return reply, err
}

// GetUserInfo is client rpc method as defined
func (c *BaseServerServiceClient) GetUserInfo(ctx context.Context, args *GetUserInfoReq) (reply *GetUserInfoResp, err error) {
	reply = &GetUserInfoResp{}
	err = c.xclient.Call(ctx, "GetUserInfo", args, reply)
	return reply, err
}

// GetMenuTree is client rpc method as defined
func (c *BaseServerServiceClient) GetMenuTree(ctx context.Context, args *GetMenuTreeReq) (reply *GetMenuTreeResp, err error) {
	reply = &GetMenuTreeResp{}
	err = c.xclient.Call(ctx, "GetMenuTree", args, reply)
	return reply, err
}

// CreateMenu is client rpc method as defined
func (c *BaseServerServiceClient) CreateMenu(ctx context.Context, args *CreateMenuReq) (reply *CreateMenuResp, err error) {
	reply = &CreateMenuResp{}
	err = c.xclient.Call(ctx, "CreateMenu", args, reply)
	return reply, err
}

// UpdateMenu is client rpc method as defined
func (c *BaseServerServiceClient) UpdateMenu(ctx context.Context, args *UpdateMenuReq) (reply *UpdateMenuResp, err error) {
	reply = &UpdateMenuResp{}
	err = c.xclient.Call(ctx, "UpdateMenu", args, reply)
	return reply, err
}

// DeleteMenu is client rpc method as defined
func (c *BaseServerServiceClient) DeleteMenu(ctx context.Context, args *DeleteMenuReq) (reply *DeleteMenuResp, err error) {
	reply = &DeleteMenuResp{}
	err = c.xclient.Call(ctx, "DeleteMenu", args, reply)
	return reply, err
}

// SortMenu is client rpc method as defined
func (c *BaseServerServiceClient) SortMenu(ctx context.Context, args *SortMenuReq) (reply *SortMenuResp, err error) {
	reply = &SortMenuResp{}
	err = c.xclient.Call(ctx, "SortMenu", args, reply)
	return reply, err
}

// CreateSysUser is client rpc method as defined
func (c *BaseServerServiceClient) CreateSysUser(ctx context.Context, args *CreateSysUserReq) (reply *CreateSysUserResp, err error) {
	reply = &CreateSysUserResp{}
	err = c.xclient.Call(ctx, "CreateSysUser", args, reply)
	return reply, err
}

// UpdateSysUser is client rpc method as defined
func (c *BaseServerServiceClient) UpdateSysUser(ctx context.Context, args *UpdateSysUserReq) (reply *UpdateSysUserResp, err error) {
	reply = &UpdateSysUserResp{}
	err = c.xclient.Call(ctx, "UpdateSysUser", args, reply)
	return reply, err
}

// DeleteSysUser is client rpc method as defined
func (c *BaseServerServiceClient) DeleteSysUser(ctx context.Context, args *DeleteSysUserReq) (reply *DeleteSysUserResp, err error) {
	reply = &DeleteSysUserResp{}
	err = c.xclient.Call(ctx, "DeleteSysUser", args, reply)
	return reply, err
}

// GetSysUserList is client rpc method as defined
func (c *BaseServerServiceClient) GetSysUserList(ctx context.Context, args *GetSysUserListReq) (reply *GetSysUserListResp, err error) {
	reply = &GetSysUserListResp{}
	err = c.xclient.Call(ctx, "GetSysUserList", args, reply)
	return reply, err
}

// CreateRole is client rpc method as defined
func (c *BaseServerServiceClient) CreateRole(ctx context.Context, args *CreateRoleReq) (reply *CreateRoleResp, err error) {
	reply = &CreateRoleResp{}
	err = c.xclient.Call(ctx, "CreateRole", args, reply)
	return reply, err
}

// UpdateRole is client rpc method as defined
func (c *BaseServerServiceClient) UpdateRole(ctx context.Context, args *UpdateRoleReq) (reply *UpdateRoleResp, err error) {
	reply = &UpdateRoleResp{}
	err = c.xclient.Call(ctx, "UpdateRole", args, reply)
	return reply, err
}

// DeleteRole is client rpc method as defined
func (c *BaseServerServiceClient) DeleteRole(ctx context.Context, args *DeleteRoleReq) (reply *DeleteRoleResp, err error) {
	reply = &DeleteRoleResp{}
	err = c.xclient.Call(ctx, "DeleteRole", args, reply)
	return reply, err
}

// GetRoleList is client rpc method as defined
func (c *BaseServerServiceClient) GetRoleList(ctx context.Context, args *GetRoleListReq) (reply *GetRoleListResp, err error) {
	reply = &GetRoleListResp{}
	err = c.xclient.Call(ctx, "GetRoleList", args, reply)
	return reply, err
}

// AssignUsers is client rpc method as defined
func (c *BaseServerServiceClient) AssignUsers(ctx context.Context, args *AssignUsersReq) (reply *AssignUsersResp, err error) {
	reply = &AssignUsersResp{}
	err = c.xclient.Call(ctx, "AssignUsers", args, reply)
	return reply, err
}

//================== oneclient stub ===================
// BaseServerServiceOneClient is a client wrapped oneClient.
type BaseServerServiceOneClient struct {
	serviceName string
	oneclient   *client.OneClient
}

// NewBaseServerServiceOneClient wraps a OneClient as BaseServerServiceOneClient.
// You can pass a shared OneClient object created by NewOneClientForBaseServerService.
func NewBaseServerServiceOneClient(oneclient *client.OneClient) *BaseServerServiceOneClient {
	return &BaseServerServiceOneClient{
		serviceName: "BaseServerService",
		oneclient:   oneclient,
	}
}

// ======================================================

// Login is client rpc method as defined
func (c *BaseServerServiceOneClient) Login(ctx context.Context, args *LoginParams) (reply *LoginResp, err error) {
	reply = &LoginResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "Login", args, reply)
	return reply, err
}

// GetUserMenu is client rpc method as defined
func (c *BaseServerServiceOneClient) GetUserMenu(ctx context.Context, args *GetUserMenuReq) (reply *GetUserMenuResp, err error) {
	reply = &GetUserMenuResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "GetUserMenu", args, reply)
	return reply, err
}

// GetUserInfo is client rpc method as defined
func (c *BaseServerServiceOneClient) GetUserInfo(ctx context.Context, args *GetUserInfoReq) (reply *GetUserInfoResp, err error) {
	reply = &GetUserInfoResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "GetUserInfo", args, reply)
	return reply, err
}

// GetMenuTree is client rpc method as defined
func (c *BaseServerServiceOneClient) GetMenuTree(ctx context.Context, args *GetMenuTreeReq) (reply *GetMenuTreeResp, err error) {
	reply = &GetMenuTreeResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "GetMenuTree", args, reply)
	return reply, err
}

// CreateMenu is client rpc method as defined
func (c *BaseServerServiceOneClient) CreateMenu(ctx context.Context, args *CreateMenuReq) (reply *CreateMenuResp, err error) {
	reply = &CreateMenuResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "CreateMenu", args, reply)
	return reply, err
}

// UpdateMenu is client rpc method as defined
func (c *BaseServerServiceOneClient) UpdateMenu(ctx context.Context, args *UpdateMenuReq) (reply *UpdateMenuResp, err error) {
	reply = &UpdateMenuResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "UpdateMenu", args, reply)
	return reply, err
}

// DeleteMenu is client rpc method as defined
func (c *BaseServerServiceOneClient) DeleteMenu(ctx context.Context, args *DeleteMenuReq) (reply *DeleteMenuResp, err error) {
	reply = &DeleteMenuResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "DeleteMenu", args, reply)
	return reply, err
}

// SortMenu is client rpc method as defined
func (c *BaseServerServiceOneClient) SortMenu(ctx context.Context, args *SortMenuReq) (reply *SortMenuResp, err error) {
	reply = &SortMenuResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "SortMenu", args, reply)
	return reply, err
}

// CreateSysUser is client rpc method as defined
func (c *BaseServerServiceOneClient) CreateSysUser(ctx context.Context, args *CreateSysUserReq) (reply *CreateSysUserResp, err error) {
	reply = &CreateSysUserResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "CreateSysUser", args, reply)
	return reply, err
}

// UpdateSysUser is client rpc method as defined
func (c *BaseServerServiceOneClient) UpdateSysUser(ctx context.Context, args *UpdateSysUserReq) (reply *UpdateSysUserResp, err error) {
	reply = &UpdateSysUserResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "UpdateSysUser", args, reply)
	return reply, err
}

// DeleteSysUser is client rpc method as defined
func (c *BaseServerServiceOneClient) DeleteSysUser(ctx context.Context, args *DeleteSysUserReq) (reply *DeleteSysUserResp, err error) {
	reply = &DeleteSysUserResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "DeleteSysUser", args, reply)
	return reply, err
}

// GetSysUserList is client rpc method as defined
func (c *BaseServerServiceOneClient) GetSysUserList(ctx context.Context, args *GetSysUserListReq) (reply *GetSysUserListResp, err error) {
	reply = &GetSysUserListResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "GetSysUserList", args, reply)
	return reply, err
}

// CreateRole is client rpc method as defined
func (c *BaseServerServiceOneClient) CreateRole(ctx context.Context, args *CreateRoleReq) (reply *CreateRoleResp, err error) {
	reply = &CreateRoleResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "CreateRole", args, reply)
	return reply, err
}

// UpdateRole is client rpc method as defined
func (c *BaseServerServiceOneClient) UpdateRole(ctx context.Context, args *UpdateRoleReq) (reply *UpdateRoleResp, err error) {
	reply = &UpdateRoleResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "UpdateRole", args, reply)
	return reply, err
}

// DeleteRole is client rpc method as defined
func (c *BaseServerServiceOneClient) DeleteRole(ctx context.Context, args *DeleteRoleReq) (reply *DeleteRoleResp, err error) {
	reply = &DeleteRoleResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "DeleteRole", args, reply)
	return reply, err
}

// GetRoleList is client rpc method as defined
func (c *BaseServerServiceOneClient) GetRoleList(ctx context.Context, args *GetRoleListReq) (reply *GetRoleListResp, err error) {
	reply = &GetRoleListResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "GetRoleList", args, reply)
	return reply, err
}

// AssignUsers is client rpc method as defined
func (c *BaseServerServiceOneClient) AssignUsers(ctx context.Context, args *AssignUsersReq) (reply *AssignUsersResp, err error) {
	reply = &AssignUsersResp{}
	err = c.oneclient.Call(ctx, c.serviceName, "AssignUsers", args, reply)
	return reply, err
}
