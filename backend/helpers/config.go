package helpers

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
)
type EnvVars struct {
	PORT   string
	DB_URL string
	NODEJS_SERVICE_URL string
	JWT_SECRET string
}

func LoadEnvVars() EnvVars {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found using system environment variables.")
	}

	PORT := getEnv("PORT", "3001")
	DB_URL := getEnv("DB_URL", "http://") //change url later
	NODEJS_SERVICE_URL:= getEnv("NODEJS_SERVICE_URL", "http://localhost:3000")
	JWT_SECRET:= getEnv("JWT_SECRET", "")

	envVars := EnvVars{
		PORT:   PORT,
		DB_URL: DB_URL,
		NODEJS_SERVICE_URL: NODEJS_SERVICE_URL,
		JWT_SECRET:JWT_SECRET,
	}

	return envVars

}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}