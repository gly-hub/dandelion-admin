package boot

import (
	"github.com/gly-hub/dandelion-plugs/jwt"
	"github.com/team-dandelion/go-dandelion/application"
)

func Init() {
	// 将需要初始化的方法在该处注册
	_ = application.Plugs(jwt.Plug())
	DbAutoMigrate()
}
