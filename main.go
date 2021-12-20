package main

import (
	"fmt"
	"html/template"
	"net/http"
	"poypel/mdl"
	"poypel/srv"
)

func main() {

	http.HandleFunc("/build", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/build requsted: ")
		settings := mdl.StartSession(w, r)
		buildTmpl := template.Must(template.ParseFiles("tmpl/build.html"))
		err := buildTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/transactions/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/transactions/ requsted: ")
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/transactions.html"))
		err := activityTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/summary/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/myaccount/summary/ requsted: ")
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/summary.html"))
		err := activityTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/dashboard/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/dashboard/ requsted: ")
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/coinbase.html"))
		err := activityTmpl.Execute(w, settings)
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

	fs := http.FileServer(http.Dir("public"))
	handler := http.StripPrefix("/static/", fs)
	http.Handle("/static/", handler)


	err := srv.GetDB().AutoMigrate(mdl.Session{}, mdl.Transaction{})
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Server is listening...")
	http.ListenAndServe(":8181", nil)
}
