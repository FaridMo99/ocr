package main

import (
	"log"
	"github.com/FaridMo99/Go-API/helpers"
	"github.com/FaridMo99/Go-API/internal/router"
)

func main() {
	envVars := helpers.LoadEnvVars()
	router := router.SetupRouter(envVars)

	log.Printf("Starting server on port %s...", envVars.PORT)
	err := router.Run(envVars.PORT)
	
	if err != nil {
		log.Fatalf("Server failed to start: %v\n", err)
	}
	log.Printf("Server started successfully on port:%s", envVars.PORT)
}