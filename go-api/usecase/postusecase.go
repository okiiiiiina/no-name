package usecase

import (
	"context"
	"fmt"

	dm "example.com/domain/post"
	"github.com/google/uuid"
)

type PostUseCase interface {
	List(ctx context.Context, workspaceID string) ([]dm.Post, error)
}

type postUseCase struct {
	ps dm.PostService
}

func NewPostUseCase(ps dm.PostService) PostUseCase {
	return postUseCase{
		ps: ps,
	}
}

func (u postUseCase) List(ctx context.Context, workspaceID string) ([]dm.Post, error) {
	wID, err := uuid.Parse(workspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID format: %w", err)
	}

	return u.ps.List(ctx, wID)
}
