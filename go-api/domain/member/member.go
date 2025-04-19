package domain

import (
	"github.com/google/uuid"
)

type Member struct {
	ID          uuid.UUID
	UserID      uuid.UUID
	WorkspaceID uuid.UUID
	Name        string
	CreatedBy   string
	UpdatedBy   *string
}

func NewMember(
	id, userID, workspaceID uuid.UUID,
	name string,
	createdBy string, updatedBy *string,
) (*Member, error) {
	v := Member{
		ID:          id,
		UserID:      userID,
		WorkspaceID: workspaceID,
		Name:        name,
		CreatedBy:   createdBy,
		UpdatedBy:   updatedBy,
	}

	// validation

	return &v, nil
}
