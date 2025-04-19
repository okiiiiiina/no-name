package router

import (
	"example.com/infrastructure/persistence"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/rs/cors"

	dm "example.com/domain/member"

	handler "example.com/handler"
	usecase "example.com/usecase"
)

type Router struct {
	chi.Router
}

func New() *Router {
	return &Router{
		Router: chi.NewRouter(),
	}
}

func (r *Router) Routes(coredb *sqlx.DB) {
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3101"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Workspace-Id", "Request-From"},
		AllowCredentials: true,
	})
	r.Use(cors.Handler)

	// setting
	memberPersistence := persistence.NewMemberPersistence(coredb)

	memberService := dm.MemberService(memberPersistence)

	memberUseCase := usecase.NewMemberUseCase(memberService)

	memberHandler := handler.NewMemberHandler(memberUseCase)

	// router
	r.Route("/", func(r chi.Router) {
		r.Get("/", handler.HelthCheckHandler)
		r.Get("/workspace/{wID}/member", memberHandler.HandleList)
	})
}
