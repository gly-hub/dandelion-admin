package service

import (
	"context"
	"dandelion-admin-server/base-server/internal/logic"
	"dandelion-admin-server/proto/base"
	"fmt"
)

func (a *RpcApi) Login(ctx context.Context, req *base.LoginParams, resp *base.LoginResp) (err error) {
	fmt.Println("Login")
	token, err := logic.NewAuth().Login(req)
	resp.CommonResp = a.ErrorFormat(err)
	resp.Token = token
	return
}

func (a *RpcApi) GetUserMenu(ctx context.Context, req *base.GetUserMenuReq, resp *base.GetUserMenuResp) (err error) {
	list, err := logic.NewAuth().GetUserMenu()
	resp.CommonResp = a.ErrorFormat(err)
	resp.List = list
	return
}

func (a *RpcApi) GetUserInfo(ctx context.Context, req *base.GetUserInfoReq, resp *base.GetUserInfoResp) (err error) {
	userInfo, err := logic.NewAuth().GetUserInfo(1)
	resp.CommonResp = a.ErrorFormat(err)
	resp.UserInfo = userInfo
	return
}
