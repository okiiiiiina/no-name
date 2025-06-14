package domain

import (
	"context"

	"github.com/google/uuid"
)

type MemberPersistence interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Member, error)
}

type MemberService interface {
	List(ctx context.Context, workspaceID uuid.UUID) ([]Member, error)
}

type memberService struct {
	repo MemberPersistence
}

func NewMemberService(repo MemberPersistence) MemberService {
	return &memberService{
		repo: repo,
	}
}

func (s *memberService) List(ctx context.Context, workspaceID uuid.UUID) ([]Member, error) {
	return s.repo.List(ctx, workspaceID)
}
