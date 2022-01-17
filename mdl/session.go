package mdl

import (
	"database/sql/driver"
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"github.com/alok87/goutils/pkg/random"
	"github.com/gorilla/schema"
	"github.com/gorilla/sessions"
	"github.com/imdario/mergo"
	"github.com/leekchan/accounting"
	"github.com/lithammer/shortuuid/v3"
	"gorm.io/gorm"
	"net/http"
	"poypel/srv"
	"reflect"
	"strconv"
	"strings"
	"time"
)

var (
	key     = []byte("super-secret-key-123")
	store   = sessions.NewCookieStore(key)
	decoder = schema.NewDecoder()
)

type Session struct {
	ID           string        `gorm:"primaryKey" schema:"id"`
	Name         string        `schema:"account_name"`
	Bank         string        `schema:"account_bank"`
	Balance      float32       `schema:"balance"`
	CoinBalance  float32       `schema:"coin_balance"`
	HoursMin     int           `schema:"account_hours_min"`
	HoursMax     int           `schema:"account_hours_max"`
	DateStart    time.Time     `schema:"account_date_start"`
	DateEnd      time.Time     `schema:"account_date_end"`
	Products     ProductIds    `gorm:"type:text" schema:"account_products"`
	Transactions []Transaction `gorm:"foreignKey:session"`
	NeedApp      bool          `schema:"account_need_app"`
	Carousel     bool          `schema:"account_carousel"`
	NeedKey      bool          `schema:"account_need_key"`
	NeedPhoto    bool          `schema:"account_need_photo"`
	NeedCard     bool          `schema:"account_need_card"`
}

type Params struct {
	Action          string    `schema:"action"`
	SessionSelected string    `schema:"session_selected"`
	LoadName        string    `schema:"loadname"`
	Update          time.Time `schema:"update"`
	SaveIt          bool      `schema:"saveit"`
	ID              string    `schema:"id"`
}

type ProductIds []int

func (ProductIds) GormDataType() string {
	return "text"
}

func (s *ProductIds) Scan(src interface{}) error {
	str, ok := src.(string)
	if !ok {
		return fmt.Errorf("failed to scan product ids field - source is not a int")
	}
	ids := []int{}
	sids := strings.Split(str, ",")
	for _, v := range sids {
		id, _ := strconv.Atoi(v)
		ids = append(ids, id)
	}
	*s = ids
	return nil
}

func (s ProductIds) Value() (driver.Value, error) {
	if s == nil || len(s) == 0 {
		return nil, nil
	}
	fmt.Println(s)
	if len(s) > 0 {
		sids := []string{}
		for _, v := range s {
			sids = append(sids, strconv.Itoa(v))
		}
		return strings.Join(sids, ","), nil
	}
	return "", nil
}

func StartSession(w http.ResponseWriter, r *http.Request) map[string]interface{} {

	err, params, sessionParams := CheckParams(w, r)

	sessionId := CheckSession(w, r)
	if params.Action == "load" {
		sessionId = params.SessionSelected
	}

	if params.Action == "create" {
		session, _ := store.Get(r, "sid")
		sessionId := shortuuid.New()
		session.Values["Id"] = sessionId
		err = session.Save(r, w)
		http.Redirect(w, r, "/build", 302)
		return nil
	}

	if params.LoadName != "" {
		loadName := strings.ReplaceAll(params.LoadName, "_", " ")
		s := Session{}
		srv.GetDB().Find(&s, "name like ?", loadName)
		if s.ID != "" {
			sessionId = s.ID
		}
	}

	if params.Action == "delete" {
		srv.GetDB().Delete(&Session{}, "id = ?", params.SessionSelected)
		srv.GetDB().Delete(&Transaction{}, "session = ?", params.SessionSelected)
		sessionId = CheckSession(w, r)
	}

	storedSession := Session{
		ID: sessionId,
	}

	storedSession = storedSession.CheckDefaults()

	var dbSession Session
	srv.GetDB().First(&dbSession, "id = ?", sessionId)
	if dbSession.ID != "" {
		err = mergo.Merge(&storedSession, dbSession, mergo.WithOverwriteWithEmptyValue)
		if err != nil {
			fmt.Println(err)
		}
	}

	storedSession.Transactions = GetTransactions(&storedSession, params)

	if params.Action == "generate" {
		err = mergo.Merge(&storedSession, sessionParams, mergo.WithOverride)
		if err != nil {
			fmt.Println(err)
		}
		err = SaveSession(&storedSession)
		if err != nil {
			fmt.Println(err)
		}
		srv.GetDB().Delete(&Transaction{}, "session = ?", storedSession.ID)
	}

	if params.Update.Year() > 1 {
		storedSession.DateEnd = params.Update
		storedSession.Transactions = UpdateTransactions(storedSession.Transactions, &storedSession)
		err = SaveSession(&storedSession)
		if err != nil {
			fmt.Println(err)
		}
	}

	if params.Action == "update" {
		err = mergo.Merge(&storedSession, sessionParams, mergo.WithOverride)
		if err != nil {
			fmt.Println(err)
		}
		storedSession.Transactions = UpdateTransactions(storedSession.Transactions, &storedSession)
		err = SaveSession(&storedSession)
		if err != nil {
			fmt.Println(err)
		}
	}

	if params.Action == "save" {
		err = mergo.Merge(&storedSession, sessionParams, mergo.WithOverride)
		if err != nil {
			fmt.Println(err)
		}
		err = SaveSession(&storedSession)
		if err != nil {
			fmt.Println(err)
		}
	}

	var dbSessions []Session
	srv.GetDB().Find(&dbSessions)

	data := map[string]interface{}{}
	data["Products"] = GenerateProducts()
	data["Banks"] = GenerateBanks()
	data["Account"] = storedSession
	data["Sessions"] = dbSessions

	if params.Action == "generate" {
		http.Redirect(w, r, "/build", 302)
		return nil
	}

	return data
}

func SaveSession(session *Session) error {
	var dbSession Session
	srv.GetDB().First(&dbSession, "id = ?", session.ID)
	srv.GetDB().Delete(&Transaction{}, "session = ?", session.ID)
	var res *gorm.DB
	fmt.Println(session.Transactions)
	if dbSession.ID != "" {
		res = srv.GetDB().Save(session)
	} else {
		res = srv.GetDB().Create(session)
	}
	if res != nil && res.Error != nil {
		fmt.Println(res)
		return res.Error
	}
	return nil
}

func CheckParams(w http.ResponseWriter, r *http.Request) (error, Params, Session) {
	var sessionParams Session
	var params Params
	err := r.ParseForm()
	if err != nil {
		fmt.Println(err)
	}
	form := r.Form
	decoder.RegisterConverter(time.Time{}, timeConverter)
	err = decoder.Decode(&sessionParams, form)
	if err != nil {
		fmt.Printf("sessionParams: %v\n", err)
	}
	err = decoder.Decode(&params, form)
	if err != nil {
		fmt.Printf("params: %v\n", err)
	}
	fmt.Println(params)
	fmt.Println(sessionParams)
	return nil, params, sessionParams
}

func CheckSession(w http.ResponseWriter, r *http.Request) string {
	session, err := store.Get(r, "sid")
	if err != nil {
		fmt.Println(err)
	}
	sessionId := shortuuid.New()
	if session.Values["Id"] != nil {
		sessionId = session.Values["Id"].(string)
	} else {
		session.Values["Id"] = sessionId
		err = session.Save(r, w)
		if err != nil {
			fmt.Println(err)
		}
	}
	return sessionId
}

func (s Session) BalanceString() string {
	ac := accounting.Accounting{Symbol: "$", Precision: 2}
	return ac.FormatMoney(s.Balance)
}

func (s Session) CoinBalanceString() string {
	ac := accounting.Accounting{Symbol: "$", Precision: 2}
	return ac.FormatMoney(s.CoinBalance)
}

func (s Session) CoinBalanceInBTC() string {
	ac := accounting.Accounting{Symbol: "BTC", Precision: 8, Format: "%v %s"}
	return ac.FormatMoney(s.CoinBalance / 42_000)
}

func (s Session) GetBank() Bank {
	var bp Bank
	banks := GenerateBanks()
	if s.Bank == "" {
		return bp
	}
	for _, b := range banks {
		if b.Name == s.Bank {
			return b
		}
	}
	return bp
}

func (s Session) SayHello() string {
	if s.DateEnd.Hour() >= 12 && s.DateEnd.Hour() < 16 {
		return "Good afternoon"
	}
	if s.DateEnd.Hour() >= 16 && s.DateEnd.Hour() < 24 {
		return "Good evening"
	}
	if s.DateEnd.Hour() >= 4 && s.DateEnd.Hour() < 12 {
		return "Good morning"
	}
	return ""
}

func (s Session) CheckDefaults() Session {
	if s.ID == "" {
		s.ID = shortuuid.New()
	}
	if s.Name == "" {
		s.Name = randomdata.FullName(randomdata.RandomGender)
	}
	if s.Bank == "" {
		s.Bank = RandomBank().Name
	}
	if s.HoursMin == 0 {
		s.HoursMin = 5
	}
	if s.HoursMax == 0 {
		s.HoursMax = 24
	}
	if s.DateStart.Year() < 2021 {
		s.DateStart = time.Now().Add(-time.Hour * 24 * 60)
	}
	if s.DateEnd.Year() < 2021 {
		s.DateEnd = time.Now()
	}
	if len(s.Products) == 0 {
		s.Products = random.RangeInt(1, len(GenerateProducts()), 3)
	}
	if !s.NeedApp {
		s.NeedApp = randomdata.Boolean()
	}
	if !s.NeedPhoto {
		s.NeedPhoto = randomdata.Boolean()
	}
	if !s.NeedKey {
		s.NeedKey = randomdata.Boolean()
	}
	if !s.NeedCard {
		s.NeedCard = randomdata.Boolean()
	}
	if !s.Carousel {
		s.Carousel = randomdata.Boolean()
	}
	return s
}

func (s Session) HasPending() bool {
	for _, t := range s.Transactions {
		if t.Type == HOLD_NOT_SHIP || t.Type == HOLD_SHIP {
			return true
		}
	}
	return false
}

var timeConverter = func(value string) reflect.Value {
	if v, err := time.Parse("2006-01-02T15:04", value); err == nil {
		return reflect.ValueOf(v)
	}
	return reflect.Value{}
}
