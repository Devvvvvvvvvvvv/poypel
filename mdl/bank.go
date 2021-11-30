package mdl

import "math/rand"

type Bank struct {
	Name     string
	Products []BankProduct
}

type BankProduct struct {
	Name  string
	Type  string
	Photo string
}

func GenerateBanks() []Bank {
	return []Bank{
		{"Bank of America", []BankProduct{
			{"Bank of America Cash Rewards Visa Credit Card", "Credit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjY2MzBmYmItMDFiOC00ZTZlLWJmMGUtNWRhMjhhYzM5ZjRm/image__7.png"},
		}},
		{"JPMORGAN CHASE", []BankProduct{
			{"Chase Debit Card", "Debit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjU4Mjg1NzYtODY0Yy00MTg1LTliZTAtMTA2OWMwNzQ5ZDU4/image__7.png"},
			{"Chase Credit Card", "Credit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/NjU4Mjg1NzYtODY0Yy00MTg1LTliZTAtMTA2OWMwNzQ5ZDU4/image__7.png"},
		}},
		{"TD BANK", []BankProduct{
			{"TD Bank Visa Debit Card", "Debit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/OTY0ZmMxODItNDY3OS00MDUyLWJmNzAtMzFkMzQwZWQxMGQ3/image__7.png"},
			{"TD Bank Visa Credit Card", "Credit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/OTY0ZmMxODItNDY3OS00MDUyLWJmNzAtMzFkMzQwZWQxMGQ3/image__7.png"},
		}},
		{"U.S. BANK", []BankProduct{
			{"American Express", "Credit", "https://i.imgur.com/DfmYN0q.png"},
			{"American Express", "Debit", "https://i.imgur.com/DfmYN0q.png"},
		}},
		{"EMV BANK", []BankProduct{
			{"Debit EMV Bank", "Debit", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/MDQyYWE0MzYtN2FlOS00ODMxLWE4NzctMGQ5YWQyY2M5OTcx/image__7.png"},
		}},
		{"CITIBANK", []BankProduct{
			{"Citibank Visa Signature Card", "Credit", "https://i.imgur.com/DUHTnvY.png"},
		}},
		{"VISA", []BankProduct{
			{"Visa", "Prepaid", "https://pics.paypal.com//00/s/OTY5WDE1MzZYUE5H/p/ODI3NzMyNTYtODZmOS00NjhhLWJmNTctMDk1ZWUzM2Q5Mzll/image__7.png"},
		}},
	}
}

func RandomBank() Bank {
	banks := GenerateBanks()
	bankInd := rand.Intn(len(banks))
	return banks[bankInd]
}
