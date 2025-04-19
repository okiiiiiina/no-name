package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"example.com/router"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("B", "テスト")
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	// [DOC]
	// - https://pkg.go.dev/github.com/jmoiron/sqlx#Stmt.GetContext
	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s",
		os.Getenv("MYSQL_USER"),
		os.Getenv("MYSQL_PASSWORD"),
		os.Getenv("MYSQL_HOST"),
		os.Getenv("MYSQL_DATABASE"),
	)
	coredb, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		log.Fatalf("failed to connect to MySQL: %v\n", err)
	}

	r := router.New()
	r.Routes(coredb)

	// https://pkg.go.dev/net/http#hdr-Servers
	server := &http.Server{
		Addr:           ":8080",
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Println("サーバー起動失敗:", err)
		panic(err)
	}
}
