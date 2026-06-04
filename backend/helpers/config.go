package helpers

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
)
type EnvVars struct {
	PORT   string
	DB_URL string
}

func LoadEnvVars() EnvVars {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found using system environment variables.")
	}

	PORT := getEnv("PORT", "3001")
	DB_URL := getEnv("DB_URL", "http://") //change url later

	envVars := EnvVars{
		PORT:   PORT,
		DB_URL: DB_URL,
	}

	return envVars

}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}