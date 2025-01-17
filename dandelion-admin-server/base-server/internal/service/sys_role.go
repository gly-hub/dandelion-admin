package service

import (
	"context"
	"dandelion-admin-server/base-server/internal/logic"
	"dandelion-admin-server/proto/base"
)

func (a *RpcApi) CreateRole(ctx context.Context, req *base.CreateRoleReq, resp *base.CreateRoleResp) (err error) {
	id, err := logic.NewRole().CreateRole(req)
	resp.CommonResp = a.ErrorFormat(err)
	resp.Id = id
	return
}

func (a *RpcApi) UpdateRole(ctx context.Context, req *base.UpdateRoleReq, resp *base.UpdateRoleResp) (err error) {
	err = logic.NewRole().UpdateRole(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) DeleteRole(ctx context.Context, req *base.DeleteRoleReq, resp *base.DeleteRoleResp) (err error) {
	err = logic.NewRole().DeleteRole(req.Id)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) GetRoleList(ctx context.Context, req *base.GetRoleListReq, resp *base.GetRoleListResp) (err error) {
	// 参数校验
	if req.Page == 0 {
		req.Page = 1
	}
	if req.PageSize == 0 {
		req.PageSize = 10
	}

	list, total, err := logic.NewRole().GetRoleList(req)
	resp.CommonResp = a.ErrorFormat(err)
	resp.List = list
	resp.Total = total
	return
}

func (a *RpcApi) AssignUsers(ctx context.Context, req *base.AssignUsersReq, resp *base.AssignUsersResp) (err error) {
	err = logic.NewRole().AssignUsers(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}
