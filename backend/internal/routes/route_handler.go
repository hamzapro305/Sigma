package routes

import (
	"github.com/gofiber/fiber/v2"
)

func RouteHandler(app *fiber.App) {
	webSocketRoute(app)
}
