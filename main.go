package main

import (
	"fmt"
	"html/template"
	"net/http"
	"poypel/mdl"
	"poypel/srv"
	"strings"
)

var tmpl *template.Template

func main() {

	tmpl, err := template.ParseGlob("tmpl/*.html")
	if err != nil {
		panic(err.Error())
		return
	}

	http.HandleFunc("/build", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/build requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "build.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/transactions/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/transactions/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "transactions.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/summary/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/summary/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "summary.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/gp/your-account/order-history", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/gp/your-account/order-history requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "am_orders.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/progress-tracker/package/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/progress-tracker/package/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "am_track.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/mys/overview", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/mys/overview requested: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "eb_overview.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/mys/sold", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/mys/sold requested: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "eb_sold.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/dashboard/", coinbase)
	http.HandleFunc("/price/", coinbase)
	http.HandleFunc("/accounts/", coinbase)

	fs := http.FileServer(http.Dir("public"))
	handler := http.StripPrefix("/public/", fs)
	http.Handle("/public/", handler)

	err = srv.GetDB().AutoMigrate(mdl.Session{}, mdl.Transaction{}, mdl.Rate{})
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Server is listening...")
	http.ListenAndServe(":8181", nil)
}

func coinbase(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseGlob("tmpl/*.html")
	if err != nil {
		panic(err.Error())
		return
	}
	fmt.Println("/dashboard/ requsted: ")
	settings := mdl.StartSession(w, r)
	settings["Page"] = strings.Split(r.URL.Path, "/")[0]
	err = tmpl.ExecuteTemplate(w, "coinbase.html", settings)
	if err != nil {
		fmt.Println(err)
	}
}
