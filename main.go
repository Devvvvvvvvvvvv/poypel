package main

import (
	"fmt"
	"github.com/gorilla/sessions"
	"html/template"
	"net/http"
	"poypel/mdl"
)

var (
	key = []byte("super-secret-key-123")
	store = sessions.NewCookieStore(key)
)

func main() {

	http.HandleFunc("/build", func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "sid")
		settings := session.Values["settings"]
		buildTmpl := template.Must(template.ParseFiles("tmpl/build.html"))
		buildTmpl.Execute(w, settings)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "sid")
		settings := session.Values
		if settings["Transactions"] == nil {
			settings["Transactions"] = mdl.GenerateTransactions(session.ID)
		}
		activityTmpl := template.Must(template.ParseFiles("tmpl/activity.html"))
		store.Save(r, w, session)
		activityTmpl.Execute(w, settings)
	})

	fmt.Println("Server is listening...")
	http.ListenAndServe(":8181", nil)
}

func generateProducts() {

}
