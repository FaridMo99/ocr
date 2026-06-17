package router

import (
    "github.com/gin-gonic/gin"
)

func ApiRouter(rg *gin.RouterGroup) {
    v1 := rg.Group("/v1")
    V1Router(v1)
}