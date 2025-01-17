package boot

import (
	"fmt"
	"github.com/gly-hub/dandelion-plugs/redislock"
	"github.com/team-dandelion/go-dandelion/application"
	"github.com/team-dandelion/go-dandelion/logger"
)

type DatabaseModel interface {
	TableName() string
	TableComment() string
}

var models = make([]DatabaseModel, 0)

func Register(model ...DatabaseModel) {
	if len(model) == 0 {
		return
	}
	models = append(models, model...)
}

// DbAutoMigrate 异步
func DbAutoMigrate() {
	task := func() {
		migrate()
	}
	go task()
	return
}

func migrate() bool {
	dbIns := (&application.DB{}).GetDB()
	if dbIns == nil {
		return false
	}
	dbIns = dbIns.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")
	redisLock, err := redislock.NewDistributeLockRedis(fmt.Sprintf("go_dandelion_db_migrate"), 600, "1")
	if err != nil {
		logger.Error(err, "Migrate Model Error")
		return false
	}
	defer func() {
		_ = redisLock.Unlock()
	}()

	for _, model := range models {
		//if dbIns.Migrator().HasTable(model) {
		//	continue
		//}
		err = dbIns.Migrator().AutoMigrate(model)
		dbIns.Exec(fmt.Sprintf("ALTER TABLE %s COMMENT '%s'", model.TableName(), model.TableComment()))
		if err != nil {
			logger.Error(err, "Migrate Model Error")
		}
	}
	return true
}
