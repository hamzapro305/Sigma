package controllers

import (
	"backend/internal/services"

	"github.com/gofiber/contrib/websocket"
)

type NewDrawingPosControllerMessage struct {
	Type     string             `json:"type"`
	Name     string             `json:"name"`
	Position services.PositionT `json:"position"`
}

func NewDrawingPosController(c *websocket.Conn, message []byte) {
	incomingMsg, err := services.ParseWebsocketMessage[NewDrawingPosControllerMessage](message)
	if err != nil {
		c.WriteJSON(err)
		return
	}
	go services.NewDrawingItemPos(incomingMsg.Name, incomingMsg.Position)
}

type NewDrawingControllerMessage struct {
	Type     string             `json:"type"`
	Name     string             `json:"name"`
	Drawing  services.Drawing   `json:"drawing"`
}

func NewDrawingController(c *websocket.Conn, message []byte) {
	incomingMsg, err := services.ParseWebsocketMessage[NewDrawingControllerMessage](message)
	if err != nil {
		c.WriteJSON(err)
		return
	}
	go services.NewDrawingItem(incomingMsg.Name, incomingMsg.Drawing)
}
