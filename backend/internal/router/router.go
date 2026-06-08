package router

import (
    "github.com/gin-gonic/gin"
    "github.com/FaridMo99/Go-API/internal/middleware"
	"github.com/FaridMo99/Go-API/helpers"
)

func SetupRouter(envVars helpers.EnvVars) *gin.Engine {

    if envVars.ENV == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

    r := gin.Default()

    //middleware
	r.Use(middleware.Logger())
	r.Use(middleware.CheckJwt(envVars.JWT_SECRET))

    //routes
    api := r.Group("/api")
    ApiRouter(api)
    
    return r
}