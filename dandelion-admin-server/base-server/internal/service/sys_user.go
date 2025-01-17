package service

import (
	"context"
	"dandelion-admin-server/base-server/internal/logic"
	"dandelion-admin-server/proto/base"
)

func (a *RpcApi) CreateSysUser(ctx context.Context, req *base.CreateSysUserReq, resp *base.CreateSysUserResp) (err error) {
	err = logic.NewSysUser().CreateUser(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) UpdateSysUser(ctx context.Context, req *base.UpdateSysUserReq, resp *base.UpdateSysUserResp) (err error) {
	err = logic.NewSysUser().UpdateUser(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) DeleteSysUser(ctx context.Context, req *base.DeleteSysUserReq, resp *base.DeleteSysUserResp) (err error) {
	err = logic.NewSysUser().DeleteUser(req.Id)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) GetSysUserList(ctx context.Context, req *base.GetSysUserListReq, resp *base.GetSysUserListResp) (err error) {
	list, total, err := logic.NewSysUser().GetUserList(req)
	resp.CommonResp = a.ErrorFormat(err)
	resp.List = list
	resp.Total = total
	return
}
