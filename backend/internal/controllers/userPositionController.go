package controllers

import (
	"backend/internal/services"

	"github.com/gofiber/contrib/websocket"
)

type NewUserPosControllerMessage struct {
	Type     string             `json:"type"`
	Name     string             `json:"name"`
	Position services.PositionT `json:"position"`
}

func NewUserPosController(c *websocket.Conn, message []byte) {
	incomingMsg, err := services.ParseWebsocketMessage[NewUserPosControllerMessage](message)
	if err != nil {
		c.WriteJSON(err)
		return
	}
	go services.NewUserPosNotif(incomingMsg.Name, incomingMsg.Position)
}
