package dao

import "gorm.io/gorm"

type BaseDao struct {
}

func (d *BaseDao) SetOffsetDefault(tx *gorm.DB, page, limit int32) *gorm.DB {
	if page <= 0 {
		page = 1
	}

	if limit <= 0 {
		limit = 20
	}

	return tx.Offset((int(page) - 1) * int(limit)).Limit(int(limit))
}
