package router

import (
	"github.com/FaridMo99/Go-API/helpers"
	"github.com/FaridMo99/Go-API/internal/handlers"
	"github.com/gin-gonic/gin"
)

func OcrRouter(rg *gin.RouterGroup) {
	NODEJS_SERVICE_URL := helpers.LoadEnvVars().NODEJS_SERVICE_URL
    fileProcessor := handlers.Ocr{
		NODEJS_SERVICE_URL: NODEJS_SERVICE_URL,
	}
    rg.POST("/process", fileProcessor.ProcessFiles)
}