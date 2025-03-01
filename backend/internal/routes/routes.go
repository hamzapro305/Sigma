package routes

import (
	"backend/internal/controllers"
	"backend/internal/services"
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func webSocketRoute(webRoute fiber.Router) {
	webRoute.Get("/ws/:name", websocket.New(func(c *websocket.Conn) {

		name := c.Params("name")

		// Add User Connection
		services.AddConnection(name, services.UserConnection{
			Name:     name,
			Conn:     c,
			Position: services.PositionT{},
			Mu:       &sync.Mutex{},
		})
		log.Println("User connected:", name)

		defer func() {
			services.RemoveConnection(name)
			c.Close()
			log.Println("User disconnected:", name)
		}()

		// Keep connection alive
		for {
			messageType, msg, err := c.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
				break
			}

			switch messageType {
			case websocket.TextMessage:
				controllers.WebSocketMessageHandler(c, msg)
			case websocket.BinaryMessage:
				log.Println("Binary messages are not supported")
			default:
				log.Println("Unsupported message type:", messageType)
			}
		}
	}))
}
