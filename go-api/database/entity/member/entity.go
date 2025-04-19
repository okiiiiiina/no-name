package entity

import (
	"github.com/google/uuid"
)

type Member struct {
	ID          uuid.UUID `db:"id"`
	UserID      uuid.UUID `db:"user_id"`
	WorkspaceID uuid.UUID `db:"workspace_id"`
	Name        string    `db:"name"`
	CreatedBy   string    `db:"created_by"`
	UpdatedBy   *string   `db:"updated_by"`
}
