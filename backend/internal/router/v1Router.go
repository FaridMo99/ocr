package router

import (
    "github.com/gin-gonic/gin"
    "github.com/FaridMo99/Go-API/helpers"
)

func V1Router(rg *gin.RouterGroup, envVars helpers.EnvVars) {
    ocr := rg.Group("/ocr")
    OcrRouter(ocr, envVars)
}