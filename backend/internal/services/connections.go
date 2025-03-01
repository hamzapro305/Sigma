package services

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

// Active WebSocket Connections (userID -> WebSocket connection)
var ActiveConnections = make(map[string]UserConnection)
var Drawings = make(map[string]Drawing)
var mu sync.Mutex // For thread safety

func AddConnection(name string, user UserConnection) {
	mu.Lock()
	defer mu.Unlock()
	ActiveConnections[name] = user

	go SynUserPositions(name)
	go SyncnDrawingPosition(name)
	go newUserJoinNotif(name)
}
func newUserJoinNotif(userName string) {
	message, err := json.Marshal(fiber.Map{
		"type": "user_join",
		"name": userName,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool { return name == userName })
}

// Function to Remove WebSocket Connection
func RemoveConnection(name string) {
	mu.Lock()
	defer mu.Unlock()
	delete(ActiveConnections, name)

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

	for name, conn := range ActiveConnections {
		if skipMessage(name) {
			continue
		}

		wg.Add(1)
		go func(conn *UserConnection) {
			defer wg.Done()
			conn.Mu.Lock() // Lock before writing
			defer conn.Mu.Unlock()

			err := conn.Conn.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				fmt.Println(err)
			}
		}(&conn)
	}
	wg.Wait()
}
