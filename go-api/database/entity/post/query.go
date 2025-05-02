package entity

import (
	"context"
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type PostQuery interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Post, error)
}

type postQuery struct {
	db *sqlx.DB
}

func NewPostQuery(coredb *sqlx.DB) *postQuery {
	return &postQuery{
		db: coredb,
	}
}

func (q *postQuery) List(ctx context.Context, workspaceID uuid.UUID) ([]Post, error) {

	res := []Post{}
	query := `
		SELECT 
			p.id,
			p.title,
			p.text,
			u.email as created_by_email
		FROM post p
		JOIN member m ON p.created_by = m.id
		JOIN user u ON m.user_id = u.id
		WHERE p.workspace_id = ?
	`

	err := q.db.SelectContext(ctx, &res, query, workspaceID)
	if err != nil {
		log.Fatalf("failed to list posts for workspace_id=%s: %v", workspaceID, err)
	}

	return res, nil
}
