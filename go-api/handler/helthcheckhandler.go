package handler

import (
	"encoding/json"
	"net/http"
)

type MessageResponse struct {
	Message string `json:"message"`
}

func HelthCheckHandler(w http.ResponseWriter, r *http.Request) {
	response := MessageResponse{
		Message: "Hello, World!",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
