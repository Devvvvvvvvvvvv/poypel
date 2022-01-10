package main

import (
	"fmt"
	"html/template"
	"net/http"
	"poypel/mdl"
	"poypel/srv"
)

func main() {

	tmpl, err := template.ParseGlob("tmpl/*.html")
	if err != nil {
		panic(err.Error())
		return
	}

	http.HandleFunc("/build", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/build requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "build", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/transactions/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/transactions/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "transactions", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/summary/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/summary/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "summary", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/dashboard/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/dashboard/ requsted: ")
		settings := mdl.StartSession(w, r)
		err := tmpl.ExecuteTemplate(w, "coinbase.html", settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/trade/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/trade/ requsted: ")
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/coinbase_trade.html"))
		err := activityTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/asset/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/asset/ requsted: ")
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/coinbase_assets.html"))
		err := activityTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	fs := http.FileServer(http.Dir("public"))
	handler := http.StripPrefix("/public/", fs)
	http.Handle("/public/", handler)

	err = srv.GetDB().AutoMigrate(mdl.Session{}, mdl.Transaction{})
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Server is listening...")
	http.ListenAndServe(":8181", nil)
}
