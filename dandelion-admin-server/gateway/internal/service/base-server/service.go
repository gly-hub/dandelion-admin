package baseserver

import (
	"dandelion-admin-server/proto/base"

	"github.com/team-dandelion/go-dandelion/application"
)

type Controller struct {
	BaseServer *base.BaseServerServiceOneClient
}

func NewController() *Controller {
	return &Controller{
		BaseServer: base.NewBaseServerServiceOneClient(application.GetRpcClient().
		ClientPool.Client()),
	}
}
