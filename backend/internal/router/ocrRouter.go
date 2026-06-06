package router

import (
	"github.com/FaridMo99/Go-API/helpers"
	"github.com/FaridMo99/Go-API/internal/handlers"
	"github.com/gin-gonic/gin"
)

func OcrRouter(rg *gin.RouterGroup, envVars helpers.EnvVars) {
    fileProcessor := handlers.Ocr{NODEJS_SERVICE_URL: envVars.NODEJS_SERVICE_URL}
    rg.POST("/process", fileProcessor.ProcessFile)
}