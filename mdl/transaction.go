package mdl

import (
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"math/rand"
	"time"
)

type Transaction struct {
	Type        TransactionType
	Name        string
	Session     string
	Amount      float32
	Date        time.Time
	Product     *Product
}

type TransactionType int

const (
	COMPLETED TransactionType = iota
	BANK
	HOLD_SHIP
	HOLD_NOT_SHIP
)

func GenerateTransactions(sid string) []Transaction {

	var transactions []Transaction

	// Random days count for activity period
	minDate := time.Now().Add(-time.Duration(randomdata.Number(15, 60) * 24 * 60 * 60 * 1000 * 1000))

	date := minDate
	products := GenerateProducts()

	var transactionsSum float32

	for date.Before(time.Now()) {
		productInd := rand.Intn(len(products))
		transactionType := COMPLETED
		if transactionsSum != 0 {
			transactionType = TransactionType(rand.Intn(2))
			if transactionsSum > 2000 {
				transactionType = BANK
			}
		}
		transactionAmount := products[productInd].Price
		if transactionType == BANK {
			transactionAmount = transactionsSum
			transactionsSum = 0
		} else {
			transactionsSum += transactionAmount
		}
		transactions = append(transactions, Transaction{
			Type:        transactionType,
			Name:        GenerateTransactionName(transactionType),
			Session:     sid,
			Amount:      transactionAmount,
			Date:        date,
			Product:     &products[productInd],
		})

		// Random hours count between transactions
		date = date.Add(time.Duration(randomdata.Number(5, 24) * 60 * 60 * 1000 * 1000))

	}
	var transactionReversed []Transaction
	for i := len(transactions)-1; i >= 0; i-- {
		transactionReversed = append(transactionReversed, transactions[i])
	}
	return transactionReversed
}

func GenerateTransactionName(transactionType TransactionType) string {
	banks := GenerateBanks()
	bankInd := rand.Intn(len(banks))
	transactionName := ""
	if transactionType == BANK {
		transactionName = banks[bankInd].Name
	} else {
		transactionName = "eBay - " + randomdata.FullName(randomdata.RandomGender)
	}
	return transactionName
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

func (t Transaction) IsPositive() bool {
	if t.Type == BANK {
		return false
	}
	return true
}

func (t Transaction) DateString() string {
	return t.Date.Format("2 Jan")
}

func (t Transaction) AmountString() string {
	return fmt.Sprintf("%.2f", t.Amount)
}
