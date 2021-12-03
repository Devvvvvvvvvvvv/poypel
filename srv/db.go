package srv

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	err = db.AutoMigrate()
	if err != nil {
		panic(err)
	}
	return db.Session(&gorm.Session{FullSaveAssociations: true}).Debug()
}
