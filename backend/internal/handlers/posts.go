package handlers

import "github.com/gin-gonic/gin"

type PostHandler struct {
	db string //change later
}

func (handler *PostHandler) CreatePost(c *gin.Context) {
    var newPost models.Post

    // 1. Bind JSON from the request to the struct
    if err := c.ShouldBindJSON(&newPost); err != nil {
        c.JSON(400, gin.H{"error": "Invalid input"})
        return
    }

    // 2. Call the Service layer (The "Brain")
    err := handler.Service.Create(newPost)
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to save post"})
        return
    }

    // 3. Return success
    c.JSON(201, gin.H{"message": "Post created successfully"})
}

// GetPost retrieves a single Post by ID
func (h *PostHandler) GetPost(c *gin.Context) {
    id := c.Param("id")
    post, err := h.Service.Get(id)
    if err != nil {
        c.JSON(404, gin.H{"error": "Post not found"})
        return
    }
    c.JSON(200, post)
}

//gets all post (maybe add a limit of 10 or similar)
func (h *PostHandler) GetPosts(c *gin.Context) {
    posts, err := h.Service.Get("all")
    if err != nil {
        c.JSON(404, gin.H{"error": "Posts not found"})
        return
    }
    c.JSON(200, posts)
}

// UpdatePost modifies an existing Post
func (h *PostHandler) UpdatePost(c *gin.Context) {
    id := c.Param("id")
    var updatedPost models.Post
    if err := c.ShouldBindJSON(&updatedPost); err != nil {
        c.JSON(400, gin.H{"error": "Invalid input"})
        return
    }
    
    if err := h.Service.Update(id, updatedPost); err != nil {
        c.JSON(500, gin.H{"error": "Failed to update"})
        return
    }
    c.JSON(200, gin.H{"message": "Post updated"})
}

// DeletePost removes a Post
func (h *PostHandler) DeletePost(c *gin.Context) {
    id := c.Param("id")
    if err := h.Service.Delete(id); err != nil {
        c.JSON(500, gin.H{"error": "Failed to delete"})
        return
    }
    c.JSON(200, gin.H{"message": "Post deleted"})
}