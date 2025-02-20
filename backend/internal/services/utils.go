package services

import "encoding/json"

func ParseWebsocketMessage[T any](message []byte) (*T, map[string]interface{}) {
	var body T
	if err := json.Unmarshal(message, &body); err != nil {
		return nil, map[string]interface{}{
			"type":    "error",
			"message": "invalid message format",
		}
	}
	return &body, nil
}
