package router

import (
    "github.com/gin-gonic/gin"
    "github.com/FaridMo99/Go-API/helpers"
)

func ApiRouter(rg *gin.RouterGroup, envVars helpers.EnvVars) {
    v1 := rg.Group("/v1")
    V1Router(v1, envVars)
}