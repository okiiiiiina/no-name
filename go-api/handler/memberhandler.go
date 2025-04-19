package handler

import (
	"encoding/json"
	"log"
	"net/http"

	u "example.com/usecase"
	"github.com/go-chi/chi/v5"
)

type MemberHandler interface {
	HandleList(w http.ResponseWriter, r *http.Request)
}

type memberHandler struct {
	u u.MemberUseCase
}

func NewMemberHandler(u u.MemberUseCase) MemberHandler {
	return &memberHandler{
		u: u,
	}
}

func (h memberHandler) HandleList(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "wID")

	res, err := h.u.List(r.Context(), id)
	if err != nil {
		log.Printf("failed to list members for workspace_id=%s: %v", id, err)
		http.Error(w, "failed to get member list", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
