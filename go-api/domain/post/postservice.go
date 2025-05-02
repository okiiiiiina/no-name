package domain

import (
	"context"

	"github.com/google/uuid"
)

type PostPersistence interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Post, error)
}

type PostService interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Post, error)
}

type postService struct {
	repo PostPersistence
}

func NewPostService(repo PostPersistence) PostService {
	return &postService{
		repo: repo,
	}
}

func (s *postService) List(ctx context.Context, workspaceID uuid.UUID) ([]Post, error) {
	return s.repo.List(ctx, workspaceID)
}
