package mdl

import (
	"encoding/json"
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"github.com/leekchan/accounting"
	"github.com/lithammer/shortuuid/v3"
	"io/ioutil"
	"math/rand"
	"net/http"
	"poypel/srv"
	"strconv"
	"strings"
	"time"
)

type Transaction struct {
	ID             string          `gorm:"primaryKey" schema:"id"`
	AmOrder        string          `schema:"am_order"`
	Type           TransactionType `schema:"type"`
	Name           string          `schema:"name"`
	Session        string          `gorm:"foreignKey:UserRefer" schema:"session"`
	Amount         float32         `schema:"amount"`
	AmountDelivery float32         `schema:"amount_delivery"`
	AmountTax      float32         `schema:"amount_tax'`
	DeliveryDate   time.Time       `schema:"delivery_date"`
	Date           time.Time       `schema:"date"`
	ProductId      int             `schema:"product_id"`
	Rate           string          `gorm:"rate"`
}

type TransactionType int

type ApiPrice struct {
	Base     string
	Currency string
	Amount   string
}

type ApiResp struct {
	Data ApiPrice
}

const (
	COMPLETED TransactionType = iota
	BANK
	HOLD_SHIP
	HOLD_NOT_SHIP
	COIN_OUT
)

func GenerateTransactions(account *Session, dateFrom *time.Time, coinDate *time.Time) []Transaction {

	transactions := []Transaction{}

	// Random days count for activity period
	minDate := account.DateStart

	date := minDate
	if dateFrom != nil {
		date = *dateFrom
	}

	var transactionsSum float32
	var transactionAmount float32
	var coinBalance float32
	coinOutDate := account.DateStart
	if coinDate != nil {
		coinOutDate = *coinDate
	}
	rate := ""

	for date.Before(account.DateEnd) {
		productId := account.Products[rand.Intn(len(account.Products))] // pick random product
		transactionType := COMPLETED                                    // set first transaction COMPLETED (by product)
		if transactionsSum != 0 {                                       // if there some balance on account
			// get random type of transaction between COMPLETED (by product) or BANK (withdraw)
			transactionType = TransactionType(rand.Intn(2))
			if transactionsSum > 2000 { // if balance > 2000 USD
				transactionType = BANK // transaction type immediately set to BANK (withdraw)
			}
		}
		product := GetProduct(productId)
		transactionAmount = product.Price
		if transactionType == BANK {
			transactionAmount = transactionsSum
			transactionsSum = 0 // if transaction type is BANK, balance to zero
			rate, _ = GetRate(date)
		} else {
			transactionsSum = transactionsSum + transactionAmount
		}
		transactions = append(transactions, Transaction{
			ID:             shortuuid.New(),
			AmOrder:        GenerateAmOrder(),
			Type:           transactionType,
			Name:           GenerateTransactionName(transactionType, account),
			Session:        account.ID,
			Amount:         transactionAmount,
			AmountDelivery: float32(randomdata.Decimal(5, 8, 2)),
			AmountTax:      0.0636 * transactionAmount,
			Date:           date,
			DeliveryDate:   date.Add(time.Duration(randomdata.Number(3, 4)*24) * time.Hour),
			ProductId:      product.ID,
			Rate:           rate,
		})
		fmt.Println(transactionAmount)

		if transactionType == BANK {
			rateF, _ := strconv.ParseFloat(rate, 32)
			rateF32 := float32(rateF)
			coinBalance += transactionAmount / rateF32
		}

		if date.After(coinOutDate.Add(time.Duration(30*24) * time.Hour)) {
			outk := randomdata.Decimal(2000, 11000)
			outkF32 := float32(outk)
			rateF, _ := strconv.ParseFloat(rate, 32)
			rateF32 := float32(rateF)
			if coinBalance > outkF32/rateF32 {
				transactions = append(transactions, Transaction{
					ID:        shortuuid.New(),
					AmOrder:   GenerateAmOrder(),
					Type:      COIN_OUT,
					Name:      GenerateTransactionName(COIN_OUT, account),
					Session:   account.ID,
					Amount:    (coinBalance - outkF32/rateF32) * rateF32,
					Date:      date.Add(time.Duration(2) * time.Hour),
					ProductId: product.ID,
					Rate:      rate,
				})
				coinBalance -= coinBalance - outkF32/rateF32
				coinOutDate = date.Add(time.Duration(30*24) * time.Hour)
			}
		}

		// Random hours count between transactions
		date = date.Add(time.Duration(randomdata.Number(account.HoursMin, account.HoursMax)) * time.Hour)
	}

	// Hold chance of few last transactions
	transactions = RandomizeHolds(transactions)

	account.Balance = transactionsSum
	account.CoinBalance = coinBalance

	// Reverse transactions
	return ReverseTransaction(transactions)
}

func UpdateTransactions(transactions []Transaction, account *Session) []Transaction {
	transactions = ReverseTransaction(transactions)
	newTransactions := []Transaction{}
	ln := len(transactions) - 1
	var transactionsSum float32
	var coinBalance float32
	coinOutDate := account.DateStart
	for _, t := range transactions {
		if t.Date.Unix() >= account.DateStart.Unix() && t.Date.Unix() <= account.DateEnd.Unix() {
			if t.Type == BANK {
				t.Name = account.Bank
				transactionsSum = 0
				rateF, _ := strconv.ParseFloat(t.Rate, 32)
				rateF32 := float32(rateF)
				coinBalance += t.Amount / rateF32
			} else {
				transactionsSum += t.Amount
			}
			if t.Type == HOLD_SHIP || t.Type == HOLD_NOT_SHIP {
				t.Type = COMPLETED
			}
			if t.Type == COIN_OUT {
				coinOutDate = t.Date
				rateF, _ := strconv.ParseFloat(t.Rate, 32)
				rateF32 := float32(rateF)
				coinBalance -= t.Amount / rateF32
			}
			newTransactions = append(newTransactions, t)
		}
	}
	maxHours := int64(account.HoursMax * 60 * 60)
	if ln > -1 && account.DateEnd.Unix()-transactions[ln].Date.Unix() > maxHours {
		minDate := transactions[ln].Date
		date := minDate

		return GenerateTransactions(account, &date, &coinOutDate)
	}

	account.Balance = transactionsSum
	account.CoinBalance = coinBalance

	// Reverse transactions
	return ReverseTransaction(newTransactions)
}

func GenerateTransactionName(transactionType TransactionType, account *Session) string {
	transactionName := ""
	if transactionType == BANK || transactionType == COIN_OUT {
		transactionName = account.Bank
	} else {
		transactionName = FirstNames[randomdata.Number(0, len(FirstNames)-1)] + " " + LastNames[randomdata.Number(0, len(LastNames)-1)]
	}
	return transactionName
}

func GenerateAmOrder() string {
	return fmt.Sprintf("%d-%d%d-%d%d",
		randomdata.Number(113, 190),
		randomdata.Number(100, 999),
		randomdata.Number(100, 999),
		randomdata.Number(1000, 9999),
		randomdata.Number(100, 999))
}

func GetTransactions(session *Session, params Params) []Transaction {
	if params.Action == "generate" {
		return GenerateTransactions(session, nil, nil)
	}
	var transactions []Transaction
	srv.GetDB().Order("date desc").Find(&transactions, "session = ?", session.ID)
	if len(session.Transactions) > 0 {
		return session.Transactions
	}
	if len(transactions) > 0 {
		return transactions
	}
	return GenerateTransactions(session, nil, nil)
}

func ReverseTransaction(transactions []Transaction) []Transaction {
	var transactionReversed []Transaction
	for i := len(transactions) - 1; i >= 0; i-- {
		transactionReversed = append(transactionReversed, transactions[i])
	}
	return transactionReversed
}

func RandomizeHolds(transactions []Transaction) []Transaction {
	ln := len(transactions) - 1
	if ln < 2 {
		return transactions
	}
	for i := ln; i > ln-2; i-- {
		if transactions[i].Type == BANK {
			return transactions
		}
		transactions[i].RandomizeHold()
	}
	return transactions
}

func (t *Transaction) RandomizeHold() {
	if t.Type == COMPLETED {
		if randomdata.Boolean() {
			if randomdata.Boolean() {
				t.Type = HOLD_NOT_SHIP
			} else {
				t.Type = HOLD_SHIP
			}
		}
	}
}

func (t Transaction) TypeString() string {
	switch t.Type {
	case COMPLETED, HOLD_SHIP, HOLD_NOT_SHIP:
		return "Payment Received"
	case BANK:
		return "Instant transfer to Bank"
	default:
		return ""
	}
}

func (t Transaction) IsBank() bool {
	if t.Type == BANK {
		return true
	}
	return false
}

func (t Transaction) IsPositive() bool {
	if t.Type == BANK {
		return false
	}
	return true
}

func (t Transaction) IsDone() bool {
	if t.Type == BANK || t.Type == COMPLETED {
		return true
	}
	return false
}

func (t Transaction) IsComplete() bool {
	if t.Type == COMPLETED {
		return true
	}
	return false
}

func (t Transaction) IsPending() bool {
	if t.Type == HOLD_SHIP || t.Type == HOLD_NOT_SHIP {
		return true
	}
	return false
}

func (t Transaction) DateString() string {
	return t.Date.Format("2 Jan")
}

func (t Transaction) AmountString() string {
	ac := accounting.Accounting{Symbol: "$", Precision: 2}
	return ac.FormatMoney(t.Amount)
}

func (t Transaction) AmountTotalString() string {
	ac := accounting.Accounting{Symbol: "$", Precision: 2}
	tax := 0.0636 * t.Amount
	shipping := randomdata.Decimal(5, 8)
	return ac.FormatMoney(t.Amount + tax + float32(shipping))
}

func (t Transaction) AmountInBTC() string {
	ac := accounting.Accounting{Symbol: "BTC", Precision: 8, Format: "%v %s"}
	return ac.FormatMoney(t.Amount / 42_000)
}

func (t Transaction) Product() *Product {
	return GetProduct(t.ProductId)
}

func (t Transaction) ReturnCloseDate() time.Time {
	return t.Date.Add(24 * 43 * time.Hour)
}

func (t Transaction) MaxDeliveryDate() time.Time {
	return t.DeliveryDate.Add(24 * time.Hour)
}

func (t Transaction) ShippedDate() time.Time {
	return t.Date.Add(24 * time.Hour)
}

func (t Transaction) FirstName() string {
	return strings.Split(t.Name, " ")[0]
}

func (t Transaction) DateBucket() string {
	dateBucket := t.Date.Format("Jan 2006")
	weekDay := -time.Now().Weekday()
	if weekDay == 0 {
		weekDay = -7
	}
	thisWeek := time.Now().Add(-time.Duration((time.Now().Weekday()) * 24 * 60 * 60 * 1000 * 1000 * 1000))
	lastWeek := time.Now().Add(-time.Duration((time.Now().Weekday() + 7) * 24 * 60 * 60 * 1000 * 1000 * 1000))
	if t.Date.After(lastWeek) {
		dateBucket = "Last week"
		if t.Date.After(thisWeek) {
			dateBucket = "This week"
		}
	}
	return dateBucket
}

func GetRate(date time.Time) (string, error) {
	r := Rate{}
	srv.GetDB().First(&r, "date = ?", date.Format("2006-01-02"))
	if r.Rate != "" {
		return r.Rate, nil
	}
	if time.Now().Before(date) {
		date = time.Now()
	}
	if date.Before(time.Now().Add(time.Duration(-30*24) * time.Hour)) {
		date = time.Now().Add(time.Duration(-30*24) * time.Hour)
	}
	resp, err := http.Get("https://api.coinbase.com/v2/prices/BTC-USD/spot?date=" + date.Format("2006-01-02"))
	if err != nil {
		return "", err
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	var rate ApiResp
	err = json.Unmarshal(body, &rate)
	if err != nil {
		return "", err
	}
	r = Rate{
		Date: date.Format("2006-01-02"),
		Rate: rate.Data.Amount,
	}
	srv.GetDB().Create(r)
	if rate.Data.Amount == "" {
		return "42442.12", nil
	}
	return rate.Data.Amount, nil
}
