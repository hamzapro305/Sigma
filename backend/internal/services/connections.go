package services

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
)

type UserConnection struct {
	Conn *websocket.Conn
	Name string
	X    float64
	Y    float64
	Mu   *sync.Mutex
}

type User struct {
	Name string  `json:"name"`
	X    float64 `json:"x"`
	Y    float64 `json:"y"`
}

// Active WebSocket Connections (userID -> WebSocket connection)
var activeConnections = make(map[string]UserConnection)
var mu sync.Mutex // For thread safety

func AddConnection(name string, user UserConnection) {
	mu.Lock()
	defer mu.Unlock()
	activeConnections[name] = user

	go synUser(name)
	go newUserJoinNotif(name)
}

func newUserJoinNotif(userName string) {
	message, err := json.Marshal(map[string]interface{}{
		"type": "user_join",
		"name": userName,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool { return name == userName })
}

func NewPosNotif(userName string, x float64, y float64) {
	message, err := json.Marshal(map[string]interface{}{
		"type": "user_new_pos",
		"name": userName,
		"x":    x,
		"y":    y,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool { return name == userName })
}

func synUser(userName string) {
	var users []User
	for name, user := range activeConnections {
		if userName == name {
			continue
		}
		users = append(users, User{
			X:    user.X,
			Y:    user.Y,
			Name: user.Name,
		})
	}

	message, err := json.Marshal(map[string]interface{}{
		"type":      "sync_users",
		"all_users": users,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	mu.Lock()
	conn := activeConnections[userName]
	conn.Mu.Lock()
	defer conn.Mu.Unlock()
	conn.Conn.WriteMessage(websocket.TextMessage, message)
	mu.Unlock()
}

// Function to Remove WebSocket Connection
func RemoveConnection(name string) {
	mu.Lock()
	defer mu.Unlock()
	delete(activeConnections, name)

	message, err := json.Marshal(map[string]interface{}{
		"type": "user_left",
		"name": name,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool { return false })
}

// Send Participant Message
func SendMessageToUsers(message []byte, skipMessage func(name string) bool) {
	var wg sync.WaitGroup // Wait group to track Goroutines

	mu.Lock()
	defer mu.Unlock()

	for name, user := range activeConnections {
		if skipMessage(name) {
			continue
		}

		wg.Add(1)
		go func(user *UserConnection) {
			defer wg.Done()

			user.Mu.Lock() // Lock before writing
			defer user.Mu.Unlock()

			err := user.Conn.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				fmt.Println(err)
			}
		}(&user)

	}
	wg.Wait()
}
