package router

import (
	"example.com/infrastructure/persistence"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/rs/cors"

	dmMember "example.com/domain/member"
	dmPost "example.com/domain/post"

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

	memberService := dmMember.NewMemberService(memberPersistence)

	memberUseCase := usecase.NewMemberUseCase(memberService)

	memberHandler := handler.NewMemberHandler(memberUseCase)

	postPersistence := persistence.NewPostPersistence(coredb)

	postService := dmPost.NewPostService(postPersistence)

	postUseCase := usecase.NewPostUseCase(postService)

	postHandler := handler.NewPostHandler(postUseCase)

	// router
	r.Route("/", func(r chi.Router) {
		r.Get("/", handler.HelthCheckHandler)
		r.Get("/workspaces/{wID}/posts", postHandler.HandleList)
		r.Get("/workspaces/{wID}/members", memberHandler.HandleList)
	})
}
