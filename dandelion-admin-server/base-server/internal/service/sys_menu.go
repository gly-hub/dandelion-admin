package service

import (
	"context"
	"dandelion-admin-server/base-server/internal/logic"
	"dandelion-admin-server/proto/base"
)

func (a *RpcApi) GetMenuTree(ctx context.Context, req *base.GetMenuTreeReq, resp *base.GetMenuTreeResp) (err error) {
	list, err := logic.NewMenu().GetMenuTree()
	resp.CommonResp = a.ErrorFormat(err)
	resp.List = list
	return
}

func (a *RpcApi) CreateMenu(ctx context.Context, req *base.CreateMenuReq, resp *base.CreateMenuResp) (err error) {
	id, err := logic.NewMenu().CreateMenu(req)
	resp.CommonResp = a.ErrorFormat(err)
	resp.Id = id
	return
}

func (a *RpcApi) UpdateMenu(ctx context.Context, req *base.UpdateMenuReq, resp *base.UpdateMenuResp) (err error) {
	err = logic.NewMenu().UpdateMenu(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) DeleteMenu(ctx context.Context, req *base.DeleteMenuReq, resp *base.DeleteMenuResp) (err error) {
	err = logic.NewMenu().DeleteMenu(req.Id)
	resp.CommonResp = a.ErrorFormat(err)
	return
}

func (a *RpcApi) SortMenu(ctx context.Context, req *base.SortMenuReq, resp *base.SortMenuResp) (err error) {
	err = logic.NewMenu().SortMenu(req)
	resp.CommonResp = a.ErrorFormat(err)
	return
}
