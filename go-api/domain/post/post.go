package domain

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	ID          uuid.UUID
	WorkspaceID uuid.UUID
	Title       string
	Text        string
	CreatedBy   string
	CreatedAt   time.Time
	UpdatedAt   *time.Time
	DeletedAt   *time.Time
}

func NewMember(
	id, workspaceID uuid.UUID,
	title, text string,
	createdBy string, updatedAt, deletedAt *time.Time,
) (*Post, error) {
	v := Post{
		ID:          id,
		WorkspaceID: workspaceID,
		Title:       title,
		Text:        text,
		CreatedBy:   createdBy,
		CreatedAt:   time.Now(),
		UpdatedAt:   updatedAt,
		DeletedAt:   deletedAt,
	}
	// validation

	return &v, nil
}
