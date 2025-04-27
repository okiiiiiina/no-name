package persistence

import (
	"context"
	"fmt"
	"log"

	dm "example.com/domain/member"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	en "example.com/database/entity/member"
)

type memberPersistence struct {
	q en.MemberQuery
}

func NewMemberPersistence(coredb *sqlx.DB) dm.MemberPersistence {
	query := en.NewMemberQuery(coredb)
	return &memberPersistence{
		q: query,
	}
}

func (p *memberPersistence) List(ctx context.Context, workspaceID uuid.UUID) ([]dm.Member, error) {
	res, err := p.q.List(ctx, workspaceID)
	if err != nil {
		log.Fatalf("failed to list members for workspace_id=%s: %v", workspaceID, err)
	}

	members := make([]dm.Member, len(res))
	for i, r := range res {
		members[i] = dm.Member{ //NewMemberに渡すのがベストプラクティス
			ID:          r.ID,
			UserID:      r.UserID,
			WorkspaceID: r.WorkspaceID,
			Name:        r.Name,
			CreatedBy:   r.CreatedBy,
			UpdatedBy:   r.UpdatedBy,
		}
	}

	fmt.Println("B", members)

	return members, nil
}

func (p *memberPersistence) Create(ctx context.Context, member dm.Member) (dm.Member, error) {
	// fmt.Printf("🍎")
	createdMember, err := p.q.Create(ctx, en.Member{
		ID:          member.ID,
		UserID:      member.UserID,
		WorkspaceID: member.WorkspaceID,
		Name:        member.Name,
		CreatedBy:   member.CreatedBy,
	})
	if err != nil {
		log.Fatalf("failed to create member for workspace_id=%s: %v", member.WorkspaceID, err)
	}

	return dm.Member{
		ID:          createdMember.ID,
		UserID:      createdMember.UserID,
		WorkspaceID: createdMember.WorkspaceID,
		Name:        createdMember.Name,
	}, nil
}
