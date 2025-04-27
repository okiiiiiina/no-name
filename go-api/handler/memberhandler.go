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
	HandleCreate(w http.ResponseWriter, r *http.Request)
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

func (h memberHandler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "wID")

	var req struct {
		UserID string `json:"user_id"`
		Name   string `json:"name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("failed to decode request body: %v", err)
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	res, err := h.u.Create(r.Context(), id, req.UserID, req.Name)
	if err != nil {
		log.Printf("failed to create member for workspace_id=%s: %v", id, err)
		http.Error(w, "failed to create member", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
