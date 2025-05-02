package usecase

import (
	"context"
	"fmt"

	dm "example.com/domain/member"
	"github.com/google/uuid"
)

type MemberUseCase interface {
	List(ctx context.Context, workspaceID string) ([]dm.Member, error)
}

type memberUseCase struct {
	ms dm.MemberService
}

func NewMemberUseCase(ms dm.MemberService) MemberUseCase {
	return memberUseCase{
		ms: ms,
	}
}

func (u memberUseCase) List(ctx context.Context, workspaceID string) ([]dm.Member, error) {
	wID, err := uuid.Parse(workspaceID)
	if err != nil {
		return nil, fmt.Errorf("invalid workspace ID format: %w", err)
	}

	return u.ms.List(ctx, wID)
}
