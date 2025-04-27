package usecase

import (
	"context"
	"fmt"

	dm "example.com/domain/member"
	"github.com/google/uuid"
)

type MemberUseCase interface { //関数名、引数名、戻り値の型
	List(ctx context.Context, workspaceID string) ([]dm.Member, error)
	Create(ctx context.Context, workspaceID string, userID string, name string) (dm.Member, error)
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

func (u memberUseCase) Create(ctx context.Context, workspaceID string, userID string, name string) (dm.Member, error) {
	wID, err := uuid.Parse(workspaceID)
	if err != nil {
		return dm.Member{}, fmt.Errorf("invalid workspace ID format: %w", err)
	}

	uID, err := uuid.Parse(userID)
	if err != nil {
		return dm.Member{}, fmt.Errorf("invalid user ID format: %w", err)
	}

	member, err := dm.NewMember(uuid.New(), uID, wID, name, "system", nil)
	if err != nil {
		return dm.Member{}, err
	}
	fmt.Printf("A", member.Name)

	return u.ms.Create(ctx, *member)
}
