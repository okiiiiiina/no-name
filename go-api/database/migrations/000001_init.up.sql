CREATE TABLE IF NOT EXISTS user (
  id           VARCHAR(36)  NOT NULL PRIMARY KEY COMMENT 'id',
  email        VARCHAR(255) NOT NULL COMMENT 'メールアドレス',
  created_by   VARCHAR(36)  NOT NULL COMMENT 'member.id | system',
  updated_by   VARCHAR(36)  COMMENT 'member.id | system',
  created_at   TIMESTAMP    NOT NULL COMMENT '作成日時',
  updated_at   TIMESTAMP    COMMENT '更新日時',
  deleted_at   TIMESTAMP    COMMENT '削除日時',
  INDEX idx_user_email (email)
) COMMENT = 'ユーザ';

CREATE TABLE IF NOT EXISTS workspace (
  id            VARCHAR(36)  NOT NULL PRIMARY KEY COMMENT 'id',
  name          VARCHAR(255) NOT NULL COMMENT '名前',
  created_by    VARCHAR(36)  NOT NULL COMMENT 'member.id | system',
  updated_by    VARCHAR(36)  COMMENT 'member.id | system',
  created_at    TIMESTAMP    NOT NULL COMMENT '作成日時',
  updated_at    TIMESTAMP    COMMENT '更新日時',
  deleted_at    TIMESTAMP    COMMENT '削除日時'
) COMMENT = 'ワークスペース';

CREATE TABLE IF NOT EXISTS member (
  id            VARCHAR(36)  NOT NULL PRIMARY KEY COMMENT 'id',
  user_id       VARCHAR(36)  NOT NULL COMMENT 'user.id',
  workspace_id  VARCHAR(36)  NOT NULL COMMENT 'ワークスペース',
  name          VARCHAR(255) NOT NULL COMMENT '名前',
  created_by    VARCHAR(36)  NOT NULL COMMENT 'member.id | system',
  updated_by    VARCHAR(36)  COMMENT 'member.id | system',
  created_at    TIMESTAMP    NOT NULL COMMENT '作成日時',
  updated_at    TIMESTAMP    COMMENT '更新日時',
  deleted_at    TIMESTAMP    COMMENT '削除日時',
  INDEX idx_member_workspace_id (workspace_id),
  CONSTRAINT fk_member_workspace_id
    FOREIGN KEY (workspace_id)
    REFERENCES workspace (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_member_user_id
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT = 'メンバー';

CREATE TABLE IF NOT EXISTS post (
  id            VARCHAR(36)  NOT NULL PRIMARY KEY COMMENT 'id',
  workspace_id  VARCHAR(36)  NOT NULL COMMENT 'ワークスペース',
  title         VARCHAR(255) NOT NULL COMMENT 'タイトル',
  text          TEXT         NOT NULL COMMENT 'テキスト',
  created_by    VARCHAR(36)  NOT NULL COMMENT 'member.id',
  created_at    TIMESTAMP    NOT NULL COMMENT '作成日時',
  updated_at    TIMESTAMP    COMMENT '更新日時',
  deleted_at    TIMESTAMP    COMMENT '削除日時',
  INDEX idx_post_workspace_id (workspace_id),
  INDEX idx_post_created_by (created_by),
  CONSTRAINT fk_post_workspace_id
    FOREIGN KEY (workspace_id)
    REFERENCES workspace (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_post_created_by
    FOREIGN KEY (created_by)
    REFERENCES member (id)
    ON DELETE NO ACTION ON UPDATE CASCADE
) COMMENT = '投稿';
