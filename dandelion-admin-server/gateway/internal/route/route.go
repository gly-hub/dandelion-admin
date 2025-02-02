package route

import (
	"github.com/team-dandelion/go-dandelion/application"
	"github.com/team-dandelion/go-dandelion/config"
	"github.com/team-dandelion/go-dandelion/server/http/middleware"
	routingSwagger "github.com/team-dandelion/go-dandelion/swagger"
)

func InitRoute() {
	baseRouter := application.HttpServer().Router()
	if config.GetEnv() != "production" {
		// 注册swagger
		baseRouter.Get("/swagger/*", routingSwagger.WrapHandler)
		middleware.LogIgnoreResult(".*?/swagger/.*?") // 忽略swagger响应值
	}

	// 可在该处注册相关子集路由 TODO
	initBaseServerRoute(baseRouter)
}
