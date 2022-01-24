package srv

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func GetDB() *gorm.DB {
	if db == nil {
		db = connectDB()
	}
	return db
}

func connectDB() *gorm.DB {
	db, err := gorm.Open(postgres.Open("host=127.0.0.1 user=poypel password=poypel123 dbname=poypel"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.Session(&gorm.Session{FullSaveAssociations: true}).Debug()
	return db
}
