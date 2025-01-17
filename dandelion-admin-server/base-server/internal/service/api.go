package service

import (
	"context"
	"dandelion-admin-server/base-server/internal/enum"
	"dandelion-admin-server/base-server/internal/model"
	"dandelion-admin-server/proto/base"
	"errors"

	"github.com/team-dandelion/go-dandelion/server/rpcx"
	"github.com/team-dandelion/go-dandelion/tools/rpccall"
)

type RpcApi struct {
	base.BaseServerServiceImpl
}

func (*RpcApi) ErrorFormat(err error) *rpccall.CommonResp {
	var resp = &rpccall.CommonResp{}
	if err == nil {
		return resp
	}

	var sErr *enum.Error
	switch {
	case errors.As(err, &sErr):
		errors.As(err, &sErr)
		resp.Code = sErr.Code
		resp.Msg = sErr.Msg
	default:
		resp.Code = 40000
		resp.Msg = err.Error()
	}
	return resp
}

func (*RpcApi) Opt(ctx context.Context) model.CtxOption {
	return model.CtxOption{
		UserName: rpcx.Header().Value(ctx, "UserName"),
		UserId:   rpcx.Header().Int32Default(ctx, "UserId", 0),
	}
}
