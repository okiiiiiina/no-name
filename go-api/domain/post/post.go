package domain

import (
	"github.com/google/uuid"
)

type Post struct {
	ID             uuid.UUID
	WorkspaceID    uuid.UUID
	Title          string
	Text           string
	CreatedByEmail string
}

func NewPost(
	id, workspaceID uuid.UUID,
	title string,
	text string,
	createdByEmail string,
) (*Post, error) {
	v := Post{
		ID:             id,
		WorkspaceID:    workspaceID,
		Title:          title,
		Text:           text,
		CreatedByEmail: createdByEmail,
	}

	// validation

	return &v, nil
}
