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
		NewUserPosController(c, message)
	case "move_drawing":
		NewDrawingPosController(c, message)
	case "new_drawing":
		NewDrawingController(c, message)
	default:
	}
}
