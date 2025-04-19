package entity

import (
	"context"
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type MemberQuery interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Member, error)
}

type memberQuery struct {
	db *sqlx.DB
}

func NewMemberQuery(coredb *sqlx.DB) *memberQuery {
	return &memberQuery{
		db: coredb,
	}
}

func (q *memberQuery) List(ctx context.Context, workspaceID uuid.UUID) ([]Member, error) {

	res := []Member{}
	query := `
    SELECT id, user_id, workspace_id, name, created_by, updated_by
    FROM member
    WHERE workspace_id = ?
  `

	err := q.db.SelectContext(ctx, &res, query, workspaceID)
	if err != nil {
		log.Fatalf("failed to list members for workspace_id=%s: %v", workspaceID, err)
	}

	return res, nil
}
