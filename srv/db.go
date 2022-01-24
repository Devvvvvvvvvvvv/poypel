package srv

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDB() *gorm.DB {
	db, err := gorm.Open(postgres.Open("host=127.0.0.1 user=poypel password=poypel123 dbname=poypel"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	err = db.AutoMigrate()
	if err != nil {
		panic(err)
	}
	return db.Session(&gorm.Session{FullSaveAssociations: true}).Debug()
}
