package handlers

import "github.com/gin-gonic/gin"

type UserHandler struct {
	db string //change later
}

func (handler *UserHandler) CreateUser(c *gin.Context) {
    var newUser models.User

    // 1. Bind JSON from the request to the struct
    if err := c.ShouldBindJSON(&newUser); err != nil {
        c.JSON(400, gin.H{"error": "Invalid input"})
        return
    }

    // 2. Call the Service layer (The "Brain")
    err := handler.Service.Create(newUser)
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to save user"})
        return
    }

    // 3. Return success
    c.JSON(201, gin.H{"message": "User created successfully"})
}

// GetUser retrieves a single user by ID
func (h *UserHandler) GetUser(c *gin.Context) {
    id := c.Param("id")
    user, err := h.Service.Get(id)
    if err != nil {
        c.JSON(404, gin.H{"error": "User not found"})
        return
    }
    c.JSON(200, user)
}

//gets all users (maybe add a limit of 10 or similar)
func (h *UserHandler) GetUsers(c *gin.Context) {
    users, err := h.Service.Get("all")
    if err != nil {
        c.JSON(404, gin.H{"error": "Users not found"})
        return
    }
    c.JSON(200, users)
}

// UpdateUser modifies an existing user
func (h *UserHandler) UpdateUser(c *gin.Context) {
    id := c.Param("id")
    var updatedUser models.User
    if err := c.ShouldBindJSON(&updatedUser); err != nil {
        c.JSON(400, gin.H{"error": "Invalid input"})
        return
    }
    
    if err := h.Service.Update(id, updatedUser); err != nil {
        c.JSON(500, gin.H{"error": "Failed to update"})
        return
    }
    c.JSON(200, gin.H{"message": "User updated"})
}

// DeleteUser removes a user
func (h *UserHandler) DeleteUser(c *gin.Context) {
    id := c.Param("id")
    if err := h.Service.Delete(id); err != nil {
        c.JSON(500, gin.H{"error": "Failed to delete"})
        return
    }
    c.JSON(200, gin.H{"message": "User deleted"})
}