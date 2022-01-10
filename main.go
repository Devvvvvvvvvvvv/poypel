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

	http.HandleFunc("/dashboard/", coinbase)
	http.HandleFunc("/price/", coinbase)
	http.HandleFunc("/accounts/", coinbase)

	fs := http.FileServer(http.Dir("public"))
	handler := http.StripPrefix("/public/", fs)
	http.Handle("/public/", handler)

	err := srv.GetDB().AutoMigrate(mdl.Session{}, mdl.Transaction{})
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
