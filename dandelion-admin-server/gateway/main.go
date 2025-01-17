package main

import (
	"dandelion-admin-server/gateway/cmd"
	_ "dandelion-admin-server/gateway/docs"
)

// @title Your API Title
// @version 1.0
// @description Your API Description
// @host localhost:8080
// @BasePath /api
func main() {
	cmd.Execute()
}
