package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
)



func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        path := c.Request.URL.Path
		method := c.Request.Method

        c.Next()

		statusCode := c.Writer.Status()

		fmt.Println("Path:", path, "| Status:", statusCode, "| Method:", method)
    }
}