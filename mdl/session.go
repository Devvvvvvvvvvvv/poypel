package mdl

import (
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"github.com/google/uuid"
	"github.com/gorilla/schema"
	"github.com/gorilla/sessions"
	"net/http"
	"reflect"
	"time"
)

var (
	key     = []byte("super-secret-key-123")
	store   = sessions.NewCookieStore(key)
	decoder = schema.NewDecoder()
)

type Session struct {
	ID        string    `schema:"account_id"`
	Name      string    `schema:"account_name"`
	Bank      string    `schema:"account_bank"`
	HoursMin  int       `schema:"account_hours_min"`
	HoursMax  int       `schema:"account_hours_max"`
	DateStart time.Time `schema:"account_date_start"`
}

func StartSession(w http.ResponseWriter, r *http.Request) map[string]interface{} {

	err := r.ParseForm()
	if err != nil {
		fmt.Println(err)
	}

	var sessionParams Session
	decoder.RegisterConverter(time.Time{}, timeConverter)
	err = decoder.Decode(&sessionParams, r.Form)
	if err != nil {
		fmt.Println(err)
	}

	session, err := store.Get(r, "sid")
	if err != nil {
		fmt.Println(err)
	}
	sessionId := uuid.New().String()
	if session.Values["Id"] != nil {
		sessionId = session.Values["Id"].(string)
	} else {
		session.Values["Id"] = sessionId
		err = session.Save(r, w)
		if err != nil {
			fmt.Println(err)
		}
	}
	if sessionParams.ID == "" {
		sessionParams.ID = sessionId
	}
	if sessionParams.Name == "" {
		sessionParams.Name = randomdata.FullName(randomdata.RandomGender)
	}
	if sessionParams.Bank == "" {
		sessionParams.Bank = RandomBank().Name
	}
	if sessionParams.HoursMin == 0 {
		sessionParams.HoursMin = 5
	}
	if sessionParams.HoursMax == 0 {
		sessionParams.HoursMax = 24
	}
	if sessionParams.DateStart.Second() == 0 {
		sessionParams.DateStart = time.Now().Add(-time.Hour * 24 * 60)
	}
	data := map[string]interface{}{}
	data["Transactions"] = GenerateTransactions(sessionParams)
	data["Products"] = GenerateProducts()
	data["Banks"] = GenerateBanks()
	data["Account"] = sessionParams
	return data
}

var timeConverter = func(value string) reflect.Value {
	if v, err := time.Parse("2006-01-02T15:04", value); err == nil {
		return reflect.ValueOf(v)
	}
	return reflect.Value{}
}
