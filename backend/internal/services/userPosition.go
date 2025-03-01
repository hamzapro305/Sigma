package services

import (
	"encoding/json"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func SynUserPositions(userName string) {
	var users []User
	for name, conn := range ActiveConnections {
		if userName == name {
			continue
		}
		users = append(users, User{
			Name:     conn.Name,
			Position: conn.Position,
		})
	}

	message, err := json.Marshal(fiber.Map{
		"type":      "sync_users",
		"all_users": users,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	mu.Lock()
	conn := ActiveConnections[userName]
	conn.Mu.Lock()
	defer conn.Mu.Unlock()
	conn.Conn.WriteMessage(websocket.TextMessage, message)
	mu.Unlock()
}

func NewUserPosNotif(userName string, position PositionT) {
	message, err := json.Marshal(fiber.Map{
		"type":     "user_new_pos",
		"name":     userName,
		"position": position,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool { return name == userName })
}
