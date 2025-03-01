package services

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func ParseWebsocketMessage[T any](message []byte) (*T, fiber.Map) {
	var body T
	if err := json.Unmarshal(message, &body); err != nil {
		return nil, fiber.Map{
			"type":    "error",
			"message": "invalid message format",
		}
	}
	return &body, nil
}
