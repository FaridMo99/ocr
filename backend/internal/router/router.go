package router

import (
    "github.com/gin-gonic/gin"
    "github.com/FaridMo99/Go-API/internal/handlers"
    "github.com/FaridMo99/Go-API/internal/middleware"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.Use(middleware.Logger())

	UserHandler := handlers.UserHandler{}
	PostHandler := handlers.PostHandler{}

    r.GET("/users", UserHandler.GetUsers(&r.ContextWithFallback))
	r.GET("/users/:id", UserHandler.GetUser(&r.ContextWithFallback))

    r.POST("/users", UserHandler.CreateUser(&r.ContextWithFallback))
	r.PUT("/users/:id", UserHandler.UpdateUser(&r.ContextWithFallback))
	r.DELETE("/users/:id", UserHandler.DeleteUser(&r.ContextWithFallback))

	r.GET("/posts", PostHandler.GetPosts(&r.ContextWithFallback))
	r.GET("/posts/:id", PostHandler.GetPost(&r.ContextWithFallback))

    r.POST("/posts", PostHandler.CreatePost(&r.ContextWithFallback))
	r.PUT("/posts/:id", PostHandler.UpdatePost(&r.ContextWithFallback))
	r.DELETE("/posts/:id", PostHandler.DeletePost(&r.ContextWithFallback))

    return r
}