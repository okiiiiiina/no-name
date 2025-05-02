package persistence

import (
	"context"
	"fmt"
	"log"

	dm "example.com/domain/post"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	en "example.com/database/entity/post"
)

type postPersistence struct {
	q en.PostQuery
}

func NewPostPersistence(coredb *sqlx.DB) dm.PostPersistence {
	query := en.NewPostQuery(coredb)
	return &postPersistence{
		q: query,
	}
}

func (p *postPersistence) List(ctx context.Context, workspaceID uuid.UUID) ([]dm.Post, error) {
	res, err := p.q.List(ctx, workspaceID)
	if err != nil {
		log.Fatalf("failed to list posts for workspace_id=%s: %v", workspaceID, err)
	}

	posts := make([]dm.Post, len(res))
	for i, r := range res {
		posts[i] = dm.Post{
			ID:             r.ID,
			WorkspaceID:    r.WorkspaceID,
			Title:          r.Title,
			Text:           r.Text,
			CreatedByEmail: r.CreatedByEmail,
		}
	}

	fmt.Println("B", posts)

	return posts, nil
}
