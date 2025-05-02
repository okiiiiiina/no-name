package handler

import (
	"encoding/json"
	"log"
	"net/http"

	u "example.com/usecase"
	"github.com/go-chi/chi/v5"
)

type PostHandler interface {
	HandleList(w http.ResponseWriter, r *http.Request)
}

type postHandler struct {
	u u.PostUseCase
}

func NewPostHandler(u u.PostUseCase) PostHandler {
	return &postHandler{
		u: u,
	}
}

func (h postHandler) HandleList(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "wID")

	res, err := h.u.List(r.Context(), id)
	if err != nil {
		log.Printf("failed to list posts for workspace_id=%s: %v", id, err)
		http.Error(w, "failed to get post list", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
