package mdl

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"net/http"
	"poypel/srv"
	"reflect"
	"strconv"
	"strings"
	"time"

	"github.com/Pallinder/go-randomdata"
	"github.com/alok87/goutils/pkg/random"
	"github.com/gorilla/schema"
	"github.com/gorilla/sessions"
	"github.com/leekchan/accounting"
	"github.com/lithammer/shortuuid/v3"
	"gorm.io/gorm"
)

var (
	key     = []byte("super-secret-key-123")
	store   = sessions.NewCookieStore(key)
	decoder = schema.NewDecoder()
)

type Session struct {
	ID           string        `gorm:"primaryKey" schema:"id"`
	SessionName  string        `schema:"account_session_name"`
	Name         string        `schema:"account_name"`
	Bank         string        `schema:"account_bank"`
	BankAccount  string        `schema:"account_bank_account"`
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
	CoinDark     bool          `schema:"account_coin_dark"`
}

type Params struct {
	Action          string `schema:"action"`
	SessionSelected string `schema:"session_selected"`
	LoadName        string `schema:"loadname"`
	Update          string `schema:"update"`
	SaveIt          bool   `schema:"saveit"`
	ID              string `schema:"id"`
	OID             string `schema:"oid"`
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

	_, params, _ := CheckParams(w, r)

	sessionId := CheckSession(w, r)

	storedSession := Session{}

	loadName := ""
	if params.LoadName != "" {
		loadName = strings.ReplaceAll(params.LoadName, "_", " ")
		srv.GetDB().Find(&storedSession, "session_name like ?", loadName)
	} else {
		srv.GetDB().Find(&storedSession, "id = ?", sessionId)
	}

	if storedSession.ID == "" {
		sessionId = NewSession(w, r)
		storedSession = Session{
			ID:          sessionId,
			SessionName: loadName,
		}
	}

	ChangeSession(storedSession.ID, w, r)

	storedSession = storedSession.CheckDefaults()
	storedSession.Transactions = GetTransactions(&storedSession, params)
	if params.Update != "" {
		dateUpdate, err := time.Parse("2006-01-02 15:04:05", params.Update)
		if err != nil {
			fmt.Println(err)
		}
		storedSession.DateEnd = dateUpdate
		storedSession.Transactions = UpdateTransactions(storedSession.Transactions, &storedSession)
	}
	err := SaveSession(&storedSession)
	if err != nil {
		fmt.Println(err)
	}

	/*if params.Action == "load" {
		sessionId = params.SessionSelected
	}

	if params.Action == "create" {
		session, _ := store.Get(r, "sid")
		sessionId := shortuuid.New()
		session.Values["Id"] = sessionId
		_ = session.Save(r, w)
		http.Redirect(w, r, "/build", 302)
		return nil
	}

	if params.Action == "delete" {
		srv.GetDB().Delete(&Session{}, "id = ?", params.SessionSelected)
		srv.GetDB().Delete(&Transaction{}, "session = ?", params.SessionSelected)
		sessionId = CheckSession(w, r)
	}

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
	*/

	var dbSessions []Session
	srv.GetDB().Find(&dbSessions)

	data := map[string]interface{}{}
	data["Products"] = GenerateProducts()
	data["Banks"] = GenerateBanks()
	data["Account"] = storedSession
	data["Sessions"] = dbSessions

	return data
}

func SaveSession(session *Session) error {
	var dbSession Session
	srv.GetDB().First(&dbSession, "id = ?", session.ID)
	srv.GetDB().Delete(&Transaction{}, "session = ?", session.ID)
	var res *gorm.DB
	if dbSession.ID != "" {
		res = srv.GetDB().Save(session)
	} else {
		res = srv.GetDB().Create(session)
	}
	if res != nil && res.Error != nil {
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

func NewSession(w http.ResponseWriter, r *http.Request) string {
	session, err := store.Get(r, "sid")
	if err != nil {
		fmt.Println(err)
	}
	sessionId := shortuuid.New()
	session.Values["Id"] = sessionId
	err = session.Save(r, w)
	if err != nil {
		fmt.Println(err)
	}
	return sessionId
}

func ChangeSession(sessionId string, w http.ResponseWriter, r *http.Request) string {
	session, err := store.Get(r, "sid")
	if err != nil {
		fmt.Println(err)
	}
	session.Values["Id"] = sessionId
	err = session.Save(r, w)
	if err != nil {
		fmt.Println(err)
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

func (s Session) ToJson() string {
	out, _ := json.Marshal(s)
	return string(out)
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

func (s Session) FirstName() string {
	return strings.Split(s.Name, " ")[0]
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
	if s.DateEnd.Hour() >= 0 && s.DateEnd.Hour() < 4 {
		return "Good night"
	}
	return ""
}

func (s Session) CheckDefaults() Session {
	if s.ID == "" {
		s.ID = shortuuid.New()
	}
	if s.SessionName == "" {
		s.SessionName = randomdata.FullName(randomdata.Male)
	}
	if s.Name == "" {
		s.Name = FirstNames[randomdata.Number(0, len(FirstNames)-1)] + " " + LastNames[randomdata.Number(0, len(LastNames)-1)]
	}
	if s.Bank == "" {
		s.Bank = RandomBank().Name
	}
	if s.BankAccount == "" {
		s.BankAccount = RandomBankAccount()
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
	if !s.CoinDark {
		s.CoinDark = randomdata.Boolean()
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

func (s Session) CompletedCount() int {
	c := 0
	for _, t := range s.Transactions {
		if t.Type == COMPLETED {
			c++
		}
	}
	return c
}

func (s Session) CompletedAmount() float32 {
	var c float32
	for _, t := range s.Transactions {
		if t.Type == COMPLETED {
			c += t.Amount
		}
	}
	return c
}

func (s Session) CompletedAmountString() string {
	ac := accounting.Accounting{Symbol: "$", Precision: 2}
	return ac.FormatMoney(s.CompletedAmount())
}

func (s Session) HoldsCount() int {
	c := 0
	for _, t := range s.Transactions {
		if t.Type == HOLD_NOT_SHIP || t.Type == HOLD_SHIP {
			c++
		}
	}
	return c
}

func (s Session) GmDateStart() string {
	if s.DateStart.Year() == time.Now().Year() {
		return s.DateStart.Format("Jan _2")
	} else {
		return s.DateStart.Format("01/02/06")
	}
}

func (s Session) ProductsCount() int {
	return s.HoldsCount() + s.CompletedCount()
}

func (s Session) GetProducts() []*Product {
	var prs []*Product
	for _, t := range s.Products {
		prs = append(prs, GetProduct(t))
	}
	return prs
}

var timeConverter = func(value string) reflect.Value {
	if v, err := time.Parse("2006-01-02T15:04", value); err == nil {
		return reflect.ValueOf(v)
	}
	return reflect.Value{}
}

var FirstNames = []string{"Jacob", "Michael", "Matthew", "Joshua", "Christopher", "Nicholas", "Andrew", "Joseph", "Daniel", "Tyler", "William", "Brandon", "Ryan", "John", "Zachary", "David", "Anthony", "James", "Justin", "Alexander", "Jonathan", "Christian", "Austin", "Dylan", "Ethan", "Benjamin", "Noah", "Samuel", "Robert", "Nathan", "Cameron", "Kevin", "Thomas", "Jose", "Hunter", "Jordan", "Kyle", "Caleb", "Jason", "Logan", "Aaron", "Eric", "Brian", "Gabriel", "Adam", "Jack", "Isaiah", "Juan", "Luis", "Connor", "Charles", "Elijah", "Isaac", "Steven", "Evan", "Jared", "Sean", "Timothy", "Luke", "Cody", "Nathaniel", "Alex", "Seth", "Mason", "Richard", "Carlos", "Angel", "Patrick", "Devin", "Bryan", "Cole", "Jackson", "Ian", "Garrett", "Trevor", "Jesus", "Chase", "Adrian", "Mark", "Blake", "Sebastian", "Antonio", "Lucas", "Jeremy", "Gavin", "Miguel", "Julian", "Dakota", "Alejandro", "Jesse", "Dalton", "Bryce", "Tanner", "Kenneth", "Stephen", "Jake", "Victor", "Spencer", "Marcus", "Paul", "Brendan", "Jeremiah", "Xavier", "Jeffrey", "Tristan", "Jalen", "Jorge", "Edward", "Riley", "Wyatt", "Colton", "Joel", "Maxwell", "Aidan", "Travis", "Shane", "Colin", "Dominic", "Carson", "Vincent", "Derek", "Oscar", "Grant", "Eduardo", "Peter", "Henry", "Parker", "Hayden", "Collin", "George", "Bradley", "Mitchell", "Devon", "Ricardo", "Shawn", "Taylor", "Nicolas", "Francisco", "Gregory", "Liam", "Kaleb", "Preston", "Erik", "Alexis", "Owen", "Omar", "Diego", "Dustin", "Corey", "Fernando", "Clayton", "Carter", "Ivan", "Jaden", "Javier", "Alec", "Johnathan", "Scott", "Manuel", "Cristian", "Alan", "Raymond", "Brett", "Max", "Andres", "Gage", "Mario", "Dawson", "Dillon", "Cesar", "Wesley", "Levi", "Jakob", "Chandler", "Martin", "Malik", "Edgar", "Trenton", "Sergio", "Josiah", "Nolan", "Marco", "Peyton", "Harrison", "Hector", "Micah", "Roberto", "Drew", "Brady", "Erick", "Conner", "Jonah", "Casey", "Jayden", "Emmanuel", "Edwin", "Andre", "Phillip", "Brayden", "Landon", "Giovanni", "Bailey", "Ronald", "Braden", "Damian", "Donovan", "Ruben", "Frank", "Pedro", "Gerardo", "Andy", "Chance", "Abraham", "Calvin", "Trey", "Cade", "Donald", "Derrick", "Payton", "Darius", "Enrique", "Keith", "Raul", "Jaylen", "Troy", "Jonathon", "Cory", "Marc", "Skyler", "Rafael", "Trent", "Griffin", "Colby", "Johnny", "Eli", "Chad", "Armando", "Kobe", "Caden", "Cooper", "Marcos", "Elias", "Brenden", "Israel", "Avery", "Zane", "Dante", "Josue", "Zackary", "Allen", "Mathew", "Dennis", "Leonardo", "Ashton", "Philip", "Julio", "Miles", "Damien", "Ty", "Gustavo", "Drake", "Jaime", "Simon", "Jerry", "Curtis", "Kameron", "Lance", "Brock", "Bryson", "Alberto", "Dominick", "Jimmy", "Kaden", "Douglas", "Gary", "Brennan", "Zachery", "Randy", "Louis", "Larry", "Nickolas", "Tony", "Albert", "Fabian", "Keegan", "Saul", "Danny", "Tucker", "Damon", "Myles", "Arturo", "Corbin", "Deandre", "Ricky", "Kristopher", "Lane", "Pablo", "Darren", "Zion", "Jarrett", "Alfredo", "Micheal", "Angelo", "Carl", "Oliver", "Kyler", "Tommy", "Walter", "Dallas", "Jace", "Quinn", "Theodore", "Grayson", "Lorenzo", "Joe", "Arthur", "Bryant", "Brent", "Roman", "Russell", "Ramon", "Lawrence", "Moises", "Aiden", "Quentin", "Tyrese", "Jay", "Tristen", "Emanuel", "Salvador", "Terry", "Morgan", "Jeffery", "Esteban", "Tyson", "Braxton", "Branden", "Brody", "Craig", "Marvin", "Ismael", "Rodney", "Isiah", "Maurice", "Marshall", "Ernesto", "Emilio", "Brendon", "Kody", "Eddie", "Malachi", "Abel", "Keaton", "Jon", "Shaun", "Skylar", "Nikolas", "Ezekiel", "Santiago", "Kendall", "Axel", "Camden", "Trevon", "Bobby", "Conor", "Jamal", "Lukas", "Malcolm", "Zackery", "Jayson", "Javon", "Reginald", "Zachariah", "Desmond", "Roger", "Felix", "Dean", "Johnathon", "Quinton", "Ali", "Davis", "Gerald", "Demetrius", "Rodrigo", "Billy", "Rene", "Reece", "Justice", "Kelvin", "Leo", "Guillermo", "Chris", "Kevon", "Steve", "Frederick", "Clay", "Weston", "Dorian", "Hugo", "Orlando", "Roy", "Terrance", "Kai", "Khalil", "Graham", "Noel", "Nathanael", "Willie", "Terrell", "Tyrone", "Camron", "Mauricio", "Amir", "Darian", "Jarod", "Nelson", "Kade", "Reese", "Kristian", "Garret", "Marquis", "Rodolfo", "Dane", "Felipe", "Todd", "Elian", "Walker", "Mateo", "Jaylon", "Kenny", "Bruce", "Ezra", "Ross", "Damion", "Francis", "Tate", "Byron", "Reid", "Warren", "Randall", "Bennett", "Jermaine", "Triston", "Jaquan", "Harley", "Jessie", "Franklin", "Duncan", "Charlie", "Reed", "Blaine", "Braeden", "Holden", "Ahmad", "Issac", "Kendrick", "Melvin", "Sawyer", "Solomon", "Moses", "Jaylin", "Sam", "Cedric", "Mohammad", "Alvin", "Beau", "Jordon", "Elliot", "Lee", "Darrell", "Jarred", "Mohamed", "Davion", "Wade", "Tomas", "Jaxon", "Uriel", "Deven", "Maximilian", "Rogelio", "Gilberto", "Emily", "Hannah", "Madison", "Ashley", "Sarah", "Alexis", "Samantha", "Jessica", "Elizabeth", "Taylor", "Lauren", "Alyssa", "Kayla", "Abigail", "Brianna", "Olivia", "Emma", "Megan", "Grace", "Victoria", "Rachel", "Anna", "Sydney", "Destiny", "Morgan", "Jennifer", "Jasmine", "Haley", "Julia", "Kaitlyn", "Nicole", "Amanda", "Katherine", "Natalie", "Hailey", "Alexandra", "Savannah", "Chloe", "Rebecca", "Stephanie", "Maria", "Sophia", "Mackenzie", "Allison", "Isabella", "Amber", "Mary", "Danielle", "Gabrielle", "Jordan", "Brooke", "Michelle", "Sierra", "Katelyn", "Andrea", "Madeline", "Sara", "Kimberly", "Courtney", "Erin", "Brittany", "Vanessa", "Jenna", "Jacqueline", "Caroline", "Faith", "Makayla", "Bailey", "Paige", "Shelby", "Melissa", "Kaylee", "Christina", "Trinity", "Mariah", "Caitlin", "Autumn", "Marissa", "Breanna", "Angela", "Catherine", "Zoe", "Briana", "Jada", "Laura", "Claire", "Alexa", "Kelsey", "Kathryn", "Leslie", "Alexandria", "Sabrina", "Mia", "Isabel", "Molly", "Leah", "Katie", "Gabriella", "Cheyenne", "Cassandra", "Tiffany", "Erica", "Lindsey", "Kylie", "Amy", "Diana", "Cassidy", "Mikayla", "Ariana", "Margaret", "Kelly", "Miranda", "Maya", "Melanie", "Audrey", "Jade", "Gabriela", "Caitlyn", "Angel", "Jillian", "Alicia", "Jocelyn", "Erika", "Lily", "Heather", "Madelyn", "Adriana", "Arianna", "Lillian", "Kiara", "Riley", "Crystal", "Mckenzie", "Meghan", "Skylar", "Ana", "Britney", "Angelica", "Kennedy", "Chelsea", "Daisy", "Kristen", "Veronica", "Isabelle", "Summer", "Hope", "Brittney", "Lydia", "Hayley", "Evelyn", "Bethany", "Shannon", "Michaela", "Karen", "Jamie", "Daniela", "Angelina", "Kaitlin", "Karina", "Sophie", "Sofia", "Diamond", "Payton", "Cynthia", "Alexia", "Valerie", "Monica", "Peyton", "Carly", "Bianca", "Hanna", "Brenda", "Rebekah", "Alejandra", "Mya", "Avery", "Brooklyn", "Ashlyn", "Lindsay", "Ava", "Desiree", "Alondra", "Camryn", "Ariel", "Naomi", "Jordyn", "Kendra", "Mckenna", "Holly", "Julie", "Kendall", "Kara", "Jasmin", "Selena", "Esmeralda", "Amaya", "Kylee", "Maggie", "Makenzie", "Claudia", "Kyra", "Cameron", "Karla", "Kathleen", "Abby", "Delaney", "Amelia", "Casey", "Serena", "Savanna", "Aaliyah", "Giselle", "Mallory", "April", "Raven", "Adrianna", "Christine", "Kristina", "Nina", "Asia", "Natalia", "Valeria", "Aubrey", "Lauryn", "Kate", "Patricia", "Jazmin", "Rachael", "Katelynn", "Cierra", "Alison", "Macy", "Nancy", "Elena", "Kyla", "Katrina", "Jazmine", "Joanna", "Tara", "Gianna", "Juliana", "Fatima", "Allyson", "Gracie", "Sadie", "Guadalupe", "Genesis", "Yesenia", "Julianna", "Skyler", "Tatiana", "Alexus", "Alana", "Elise", "Kirsten", "Nadia", "Sandra", "Dominique", "Ruby", "Haylee", "Jayla", "Tori", "Cindy", "Sidney", "Ella", "Tessa", "Carolina", "Camille", "Jaqueline", "Whitney", "Carmen", "Vivian", "Priscilla", "Bridget", "Celeste", "Kiana", "Makenna", "Alissa", "Madeleine", "Miriam", "Natasha", "Ciara", "Cecilia", "Mercedes", "Kassandra", "Reagan", "Aliyah", "Josephine", "Charlotte", "Rylee", "Shania", "Kira", "Meredith", "Eva", "Lisa", "Dakota", "Hallie", "Anne", "Rose", "Liliana", "Kristin", "Deanna", "Imani", "Marisa", "Kailey", "Annie", "Nia", "Carolyn", "Anastasia", "Brenna", "Dana", "Shayla", "Ashlee", "Kassidy", "Alaina", "Rosa", "Wendy", "Logan", "Tabitha", "Paola", "Callie", "Addison", "Lucy", "Gillian", "Clarissa", "Destinee", "Josie", "Esther", "Denise", "Katlyn", "Mariana", "Bryanna", "Emilee", "Georgia", "Deja", "Kamryn", "Ashleigh", "Cristina", "Baylee", "Heaven", "Ruth", "Raquel", "Monique", "Teresa", "Helen", "Krystal", "Tiana", "Cassie", "Kayleigh", "Marina", "Heidi", "Ivy", "Ashton", "Clara", "Meagan", "Gina", "Linda", "Gloria", "Jacquelyn", "Ellie", "Jenny", "Renee", "Daniella", "Lizbeth", "Anahi", "Virginia", "Gisselle", "Kaitlynn", "Julissa", "Cheyanne", "Lacey", "Haleigh", "Marie", "Martha", "Eleanor", "Kierra", "Tiara", "Talia", "Eliza", "Kaylie", "Mikaela", "Harley", "Jaden", "Hailee", "Madalyn", "Kasey", "Ashlynn", "Brandi", "Lesly", "Elisabeth", "Allie", "Viviana", "Cara", "Marisol", "India", "Tatyana", "Litzy", "Melody", "Jessie", "Brandy", "Alisha", "Hunter", "Noelle", "Carla", "Francesca", "Tia", "Layla", "Krista", "Zoey", "Carley", "Janet", "Carissa", "Iris", "Kaleigh", "Tyler", "Susan", "Tamara", "Theresa", "Yasmine", "Tatum", "Sharon", "Alice", "Yasmin", "Tamia", "Abbey", "Alayna", "Kali", "Lilly", "Bailee", "Lesley", "Mckayla", "Ayanna", "Serenity", "Karissa", "Precious", "Jane", "Maddison", "Jayda", "Kelsie", "Lexi", "Phoebe", "Halle", "Kiersten", "Kiera", "Tyra", "Annika", "Felicity", "Taryn", "Kaylin", "Ellen", "Kiley", "Jaclyn", "Rhiannon", "Madisyn", "Colleen", "Joy", "Pamela", "Charity", "Tania", "Fiona", "Alyson"}
var LastNames = []string{"Abbott", "Acevedo", "Acosta", "Adams", "Adkins", "Aguilar", "Aguirre", "Albert", "Alexander", "Alford", "Allen", "Allison", "Alston", "Alvarado", "Alvarez", "Anderson", "Andrews", "Anthony", "Armstrong", "Arnold", "Ashley", "Atkins", "Atkinson", "Austin", "Avery", "Avila", "Ayala", "Ayers", "Bailey", "Baird", "Baker", "Baldwin", "Ball", "Ballard", "Banks", "Barber", "Barker", "Barlow", "Barnes", "Barnett", "Barr", "Barrera", "Barrett", "Barron", "Barry", "Bartlett", "Barton", "Bass", "Bates", "Battle", "Bauer", "Baxter", "Beach", "Bean", "Beard", "Beasley", "Beck", "Becker", "Bell", "Bender", "Benjamin", "Bennett", "Benson", "Bentley", "Benton", "Berg", "Berger", "Bernard", "Berry", "Best", "Bird", "Bishop", "Black", "Blackburn", "Blackwell", "Blair", "Blake", "Blanchard", "Blankenship", "Blevins", "Bolton", "Bond", "Bonner", "Booker", "Boone", "Booth", "Bowen", "Bowers", "Bowman", "Boyd", "Boyer", "Boyle", "Bradford", "Bradley", "Bradshaw", "Brady", "Branch", "Bray", "Brennan", "Brewer", "Bridges", "Briggs", "Bright", "Britt", "Brock", "Brooks", "Brown", "Browning", "Bruce", "Bryan", "Bryant", "Buchanan", "Buck", "Buckley", "Buckner", "Bullock", "Burch", "Burgess", "Burke", "Burks", "Burnett", "Burns", "Burris", "Burt", "Burton", "Bush", "Butler", "Byers", "Byrd", "Cabrera", "Cain", "Calderon", "Caldwell", "Calhoun", "Callahan", "Camacho", "Cameron", "Campbell", "Campos", "Cannon", "Cantrell", "Cantu", "Cardenas", "Carey", "Carlson", "Carney", "Carpenter", "Carr", "Carrillo", "Carroll", "Carson", "Carter", "Carver", "Case", "Casey", "Cash", "Castaneda", "Castillo", "Castro", "Cervantes", "Chambers", "Chan", "Chandler", "Chaney", "Chang", "Chapman", "Charles", "Chase", "Chavez", "Chen", "Cherry", "Christensen", "Christian", "Church", "Clark", "Clarke", "Clay", "Clayton", "Clements", "Clemons", "Cleveland", "Cline", "Cobb", "Cochran", "Coffey", "Cohen", "Cole", "Coleman", "Collier", "Collins", "Colon", "Combs", "Compton", "Conley", "Conner", "Conrad", "Contreras", "Conway", "Cook", "Cooke", "Cooley", "Cooper", "Copeland", "Cortez", "Cote", "Cotton", "Cox", "Craft", "Craig", "Crane", "Crawford", "Crosby", "Cross", "Cruz", "Cummings", "Cunningham", "Curry", "Curtis", "Dale", "Dalton", "Daniel", "Daniels", "Daugherty", "Davenport", "David", "Davidson", "Davis", "Dawson", "Day", "Dean", "Decker", "Dejesus", "Delacruz", "Delaney", "Deleon", "Delgado", "Dennis", "Diaz", "Dickerson", "Dickson", "Dillard", "Dillon", "Dixon", "Dodson", "Dominguez", "Donaldson", "Donovan", "Dorsey", "Dotson", "Douglas", "Downs", "Doyle", "Drake", "Dudley", "Duffy", "Duke", "Duncan", "Dunlap", "Dunn", "Duran", "Durham", "Dyer", "Eaton", "Edwards", "Elliott", "Ellis", "Ellison", "Emerson", "England", "English", "Erickson", "Espinoza", "Estes", "Estrada", "Evans", "Everett", "Ewing", "Farley", "Farmer", "Farrell", "Faulkner", "Ferguson", "Fernandez", "Ferrell", "Fields", "Figueroa", "Finch", "Finley", "Fischer", "Fisher", "Fitzgerald", "Fitzpatrick", "Fleming", "Fletcher", "Flores", "Flowers", "Floyd", "Flynn", "Foley", "Forbes", "Ford", "Foreman", "Foster", "Fowler", "Fox", "Francis", "Franco", "Frank", "Franklin", "Franks", "Frazier", "Frederick", "Freeman", "French", "Frost", "Fry", "Frye", "Fuentes", "Fuller", "Fulton", "Gaines", "Gallagher", "Gallegos", "Galloway", "Gamble", "Garcia", "Gardner", "Garner", "Garrett", "Garrison", "Garza", "Gates", "Gay", "Gentry", "George", "Gibbs", "Gibson", "Gilbert", "Giles", "Gill", "Gillespie", "Gilliam", "Gilmore", "Glass", "Glenn", "Glover", "Goff", "Golden", "Gomez", "Gonzales", "Gonzalez", "Good", "Goodman", "Goodwin", "Gordon", "Gould", "Graham", "Grant", "Graves", "Gray", "Green", "Greene", "Greer", "Gregory", "Griffin", "Griffith", "Grimes", "Gross", "Guerra", "Guerrero", "Guthrie", "Gutierrez", "Guy", "Guzman", "Hahn", "Hale", "Haley", "Hall", "Hamilton", "Hammond", "Hampton", "Hancock", "Haney", "Hansen", "Hanson", "Hardin", "Harding", "Hardy", "Harmon", "Harper", "Harrell", "Harrington", "Harris", "Harrison", "Hart", "Hartman", "Harvey", "Hatfield", "Hawkins", "Hayden", "Hayes", "Haynes", "Hays", "Head", "Heath", "Hebert", "Henderson", "Hendricks", "Hendrix", "Henry", "Hensley", "Henson", "Herman", "Hernandez", "Herrera", "Herring", "Hess", "Hester", "Hewitt", "Hickman", "Hicks", "Higgins", "Hill", "Hines", "Hinton", "Hobbs", "Hodge", "Hodges", "Hoffman", "Hogan", "Holcomb", "Holden", "Holder", "Holland", "Holloway", "Holman", "Holmes", "Holt", "Hood", "Hooper", "Hoover", "Hopkins", "Hopper", "Horn", "Horne", "Horton", "House", "Houston", "Howard", "Howe", "Howell", "Hubbard", "Huber", "Hudson", "Huff", "Huffman", "Hughes", "Hull", "Humphrey", "Hunt", "Hunter", "Hurley", "Hurst", "Hutchinson", "Hyde", "Ingram", "Irwin", "Jackson", "Jacobs", "Jacobson", "James", "Jarvis", "Jefferson", "Jenkins", "Jennings", "Jensen", "Jimenez", "Johns", "Johnson", "Johnston", "Jones", "Jordan", "Joseph", "Joyce", "Joyner", "Juarez", "Justice", "Kane", "Kaufman", "Keith", "Keller", "Kelley", "Kelly", "Kemp", "Kennedy", "Kent", "Kerr", "Key", "Kidd", "Kim", "King", "Kinney", "Kirby", "Kirk", "Kirkland", "Klein", "Kline", "Knapp", "Knight", "Knowles", "Knox", "Koch", "Kramer", "Lamb", "Lambert", "Lancaster", "Landry", "Lane", "Lang", "Langley", "Lara", "Larsen", "Larson", "Lawrence", "Lawson", "Le", "Leach", "Leblanc", "Lee", "Leon", "Leonard", "Lester", "Levine", "Levy", "Lewis", "Lindsay", "Lindsey", "Little", "Livingston", "Lloyd", "Logan", "Long", "Lopez", "Lott", "Love", "Lowe", "Lowery", "Lucas", "Luna", "Lynch", "Lynn", "Lyons", "Macdonald", "Macias", "Mack", "Madden", "Maddox", "Maldonado", "Malone", "Mann", "Manning", "Marks", "Marquez", "Marsh", "Marshall", "Martin", "Martinez", "Mason", "Massey", "Mathews", "Mathis", "Matthews", "Maxwell", "May", "Mayer", "Maynard", "Mayo", "Mays", "Mcbride", "Mccall", "Mccarthy", "Mccarty", "Mcclain", "Mcclure", "Mcconnell", "Mccormick", "Mccoy", "Mccray", "Mccullough", "Mcdaniel", "Mcdonald", "Mcdowell", "Mcfadden", "Mcfarland", "Mcgee", "Mcgowan", "Mcguire", "Mcintosh", "Mcintyre", "Mckay", "Mckee", "Mckenzie", "Mckinney", "Mcknight", "Mclaughlin", "Mclean", "Mcleod", "Mcmahon", "Mcmillan", "Mcneil", "Mcpherson", "Meadows", "Medina", "Mejia", "Melendez", "Melton", "Mendez", "Mendoza", "Mercado", "Mercer", "Merrill", "Merritt", "Meyer", "Meyers", "Michael", "Middleton", "Miles", "Miller", "Mills", "Miranda", "Mitchell", "Molina", "Monroe", "Montgomery", "Montoya", "Moody", "Moon", "Mooney", "Moore", "Morales", "Moran", "Moreno", "Morgan", "Morin", "Morris", "Morrison", "Morrow", "Morse", "Morton", "Moses", "Mosley", "Moss", "Mueller", "Mullen", "Mullins", "Munoz", "Murphy", "Murray", "Myers", "Nash", "Navarro", "Neal", "Nelson", "Newman", "Newton", "Nguyen", "Nichols", "Nicholson", "Nielsen", "Nieves", "Nixon", "Noble", "Noel", "Nolan", "Norman", "Norris", "Norton", "Nunez", "Obrien", "Ochoa", "Oconnor", "Odom", "Odonnell", "Oliver", "Olsen", "Olson", "Oneal", "Oneil", "Oneill", "Orr", "Ortega", "Ortiz", "Osborn", "Osborne", "Owen", "Owens", "Pace", "Pacheco", "Padilla", "Page", "Palmer", "Park", "Parker", "Parks", "Parrish", "Parsons", "Pate", "Patel", "Patrick", "Patterson", "Patton", "Paul", "Payne", "Pearson", "Peck", "Pena", "Pennington", "Perez", "Perkins", "Perry", "Peters", "Petersen", "Peterson", "Petty", "Phelps", "Phillips", "Pickett", "Pierce", "Pittman", "Pitts", "Pollard", "Poole", "Pope", "Porter", "Potter", "Potts", "Powell", "Powers", "Pratt", "Preston", "Price", "Prince", "Pruitt", "Puckett", "Pugh", "Quinn", "Ramirez", "Ramos", "Ramsey", "Randall", "Randolph", "Rasmussen", "Ratliff", "Ray", "Raymond", "Reed", "Reese", "Reeves", "Reid", "Reilly", "Reyes", "Reynolds", "Rhodes", "Rice", "Rich", "Richard", "Richards", "Richardson", "Richmond", "Riddle", "Riggs", "Riley", "Rios", "Rivas", "Rivera", "Rivers", "Roach", "Robbins", "Roberson", "Roberts", "Robertson", "Robinson", "Robles", "Rocha", "Rodgers", "Rodriguez", "Rodriquez", "Rogers", "Rojas", "Rollins", "Roman", "Romero", "Rosa", "Rosales", "Rosario", "Rose", "Ross", "Roth", "Rowe", "Rowland", "Roy", "Ruiz", "Rush", "Russell", "Russo", "Rutledge", "Ryan", "Salas", "Salazar", "Salinas", "Sampson", "Sanchez", "Sanders", "Sandoval", "Sanford", "Santana", "Santiago", "Santos", "Sargent", "Saunders", "Savage", "Sawyer", "Schmidt", "Schneider", "Schroeder", "Schultz", "Schwartz", "Scott", "Sears", "Sellers", "Serrano", "Sexton", "Shaffer", "Shannon", "Sharp", "Sharpe", "Shaw", "Shelton", "Shepard", "Shepherd", "Sheppard", "Sherman", "Shields", "Short", "Silva", "Simmons", "Simon", "Simpson", "Sims", "Singleton", "Skinner", "Slater", "Sloan", "Small", "Smith", "Snider", "Snow", "Snyder", "Solis", "Solomon", "Sosa", "Soto", "Sparks", "Spears", "Spence", "Spencer", "Stafford", "Stanley", "Stanton", "Stark", "Steele", "Stein", "Stephens", "Stephenson", "Stevens", "Stevenson", "Stewart", "Stokes", "Stone", "Stout", "Strickland", "Strong", "Stuart", "Suarez", "Sullivan", "Summers", "Sutton", "Swanson", "Sweeney", "Sweet", "Sykes", "Talley", "Tanner", "Tate", "Taylor", "Terrell", "Terry", "Thomas", "Thompson", "Thornton", "Tillman", "Todd", "Torres", "Townsend", "Tran", "Travis", "Trevino", "Trujillo", "Tucker", "Turner", "Tyler", "Tyson", "Underwood", "Valdez", "Valencia", "Valentine", "Valenzuela", "Vance", "Vang", "Vargas", "Vasquez", "Vaughan", "Vaughn", "Vazquez", "Vega", "Velasquez", "Velazquez", "Velez", "Villarreal", "Vincent", "Vinson", "Wade", "Wagner", "Walker", "Wall", "Wallace", "Waller", "Walls", "Walsh", "Walter", "Walters", "Walton", "Ward", "Ware", "Warner", "Warren", "Washington", "Waters", "Watkins", "Watson", "Watts", "Weaver", "Webb", "Weber", "Webster", "Weeks", "Weiss", "Welch", "Wells", "West", "Wheeler", "Whitaker", "White", "Whitehead", "Whitfield", "Whitley", "Whitney", "Wiggins", "Wilcox", "Wilder", "Wiley", "Wilkerson", "Wilkins", "Wilkinson", "William", "Williams", "Williamson", "Willis", "Wilson", "Winters", "Wise", "Witt", "Wolf", "Wolfe", "Wong", "Wood", "Woodard", "Woods", "Woodward", "Wooten", "Workman", "Wright", "Wyatt", "Wynn", "Yang", "Yates", "York", "Young", "Zamora", "Zimmerman"}
