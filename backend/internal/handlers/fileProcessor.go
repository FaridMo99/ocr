package handlers

import (
	"github.com/gin-gonic/gin"
)

type Ocr struct {
	NODEJS_SERVICE_URL string
}

func (ocr *Ocr) ProcessFile(c *gin.Context) {
	
}

/*
api should only accept from nodejs server access
after processing file send back content
first have to find the language with a different tool, then use ocr to process
*/