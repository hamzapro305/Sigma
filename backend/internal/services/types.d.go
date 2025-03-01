package services

import (
	"sync"

	"github.com/gofiber/contrib/websocket"
)

type PositionT struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type UserConnection struct {
	Conn     *websocket.Conn
	Name     string
	Position PositionT
	Mu       *sync.Mutex
}

type User struct {
	Name     string    `json:"name"`
	Position PositionT `json:"position"`
}
type Drawing struct {
	Id       string    `json:"id"`
	Position PositionT `json:"position"`
}
