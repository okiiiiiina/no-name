package persistence

import (
	"context"
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

	// members := make([]dm.Member, len(res))
	// for i, r := range res {
	// 	members[i] = dm.Member{
	// 		ID:          r.ID,
	// 		UserID:      r.UserID,
	// 		WorkspaceID: r.WorkspaceID,
	// 		Name:        r.Name,
	// 		CreatedBy:   r.CreatedBy,
	// 		UpdatedBy:   r.UpdatedBy,
	// 	}
	// }

	members := make([]dm.Member, len(res))
	for i, r := range res {
		data, err := dm.NewMember(r.ID, r.UserID, r.WorkspaceID, r.Name, r.CreatedBy, r.UpdatedBy)
		if err != nil {
			log.Fatalf("failed to list members for workspace_id=%s: %v", workspaceID, err)
		}
		members[i] = *data
	}

	return members, nil
}
