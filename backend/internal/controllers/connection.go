package controllers

import (
	"backend/internal/services"

	"github.com/gofiber/contrib/websocket"
)

type IncomingMessage struct {
	Type string `json:"type"`
}

func WebSocketMessageHandler(c *websocket.Conn, message []byte) {
	incomingMsg, err := services.ParseWebsocketMessage[IncomingMessage](message)
	if err != nil {
		c.WriteJSON(err)
		return
	}

	switch incomingMsg.Type {
	case "user_new_pos":
		NewPosController(c, message)
	default:
	}
}

type NewPosControllerMessage struct {
	Type string  `json:"type"`
	Name string  `json:"name"`
	X    float64 `json:"x"`
	Y    float64 `json:"y"`
}

func NewPosController(c *websocket.Conn, message []byte) {
	incomingMsg, err := services.ParseWebsocketMessage[NewPosControllerMessage](message)
	if err != nil {
		c.WriteJSON(err)
		return
	}
	go services.NewPosNotif(incomingMsg.Name, incomingMsg.X, incomingMsg.Y)
}
