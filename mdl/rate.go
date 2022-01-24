package mdl

type Rate struct {
	Date string `gorm:"primaryKey"`
	Rate string `gorm:"rate"`
}
