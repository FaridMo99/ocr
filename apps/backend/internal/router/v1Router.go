package router

import (
    "github.com/gin-gonic/gin"
)

func V1Router(rg *gin.RouterGroup) {
    ocr := rg.Group("/ocr")
    OcrRouter(ocr)
}