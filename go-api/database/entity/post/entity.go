package entity

import (
	"github.com/google/uuid"
)

type Post struct {
	ID             uuid.UUID `db:"id"`
	WorkspaceID    uuid.UUID `db:"workspace_id"`
	Title          string    `db:"title"`
	Text           string    `db:"text"`
	CreatedByEmail string    `db:"created_by_email"`
}
