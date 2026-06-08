package handlers

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/otiai10/gosseract/v2"
	"golang.org/x/sync/errgroup"
)

type Ocr struct {
	NODEJS_SERVICE_URL string
}

type processedFile struct {
	Filename string `json:"filename"`
	Content  string `json:"content"`
}

func (h *Ocr) ProcessFiles(c *gin.Context) {

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(400, gin.H{"error": "Failed to parse form"})
		return
	}

	files := c.Request.MultipartForm.File["files"]
	results := make([]processedFile, len(files))

	g, _ := errgroup.WithContext(c.Request.Context())
	g.SetLimit(3)

	for i, file := range files {

		g.Go(func() error {
			content, err := processSingleFile(file)
			if err != nil {
				return err
			}
			results[i] = processedFile{
				Filename: file.Filename,
				Content:  content,
			}
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		c.JSON(500, gin.H{"error": fmt.Sprintf("Processing failed: %v", err)})
		return
	}

	c.JSON(200, results)
}

func processSingleFile(file *multipart.FileHeader) (string, error) {
	// open file
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// create temporary file that is required by tesseract
	tmpFile, err := os.CreateTemp("", "ocr-upload-*.tmp")
	if err != nil {
		return "", err
	}
	defer os.Remove(tmpFile.Name())
	defer tmpFile.Close()

	if _, err := io.Copy(tmpFile, src); err != nil {
		return "", err
	}

	// init tesseract
	client := gosseract.NewClient()
	defer client.Close()
	client.SetImage(tmpFile.Name())
	
	// osd detects orientation and language
	client.SetPageSegMode(gosseract.PSM_AUTO_OSD)

	// run ocr
	text, err := client.Text()
	if err != nil {
		return "", err
	}

	return text, nil
}