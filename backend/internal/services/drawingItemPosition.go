package services

import (
	"encoding/json"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func SyncnDrawingPosition(userName string) {
	message, err := json.Marshal(fiber.Map{
		"type":     "sync_user_drawings",
		"drawings": Drawings,
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

func NewDrawingItemPos(userName string, position PositionT) {
	message, err := json.Marshal(fiber.Map{
		"type":     "new_drawing_position",
		"position": position,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool {
		return name == userName
	})
}

func NewDrawingItem(userName string, drawing Drawing) {
	mu.Lock()
	defer mu.Unlock()
	Drawings[drawing.Id] = drawing

	message, err := json.Marshal(fiber.Map{
		"type":    "new_drawing",
		"drawing": drawing,
	})
	if err != nil {
		log.Println("Error marshalling notification:", err)
		return
	}

	go SendMessageToUsers(message, func(name string) bool {
		return userName == name
	})
}
