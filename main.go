package main

import (
	"fmt"
	"html/template"
	"net/http"
	"poypel/mdl"
)

func main() {

	http.HandleFunc("/build", func(w http.ResponseWriter, r *http.Request) {
		settings := mdl.StartSession(w, r)
		buildTmpl := template.Must(template.ParseFiles("tmpl/build.html"))
		err := buildTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/myaccount/transactions/", func(w http.ResponseWriter, r *http.Request) {
		settings := mdl.StartSession(w, r)
		activityTmpl := template.Must(template.ParseFiles("tmpl/activity.html"))
		err := activityTmpl.Execute(w, settings)
		if err != nil {
			fmt.Println(err)
		}
	})

	fmt.Println("Server is listening...")
	http.ListenAndServe(":8181", nil)
}
