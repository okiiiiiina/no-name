INSERT INTO workspace (id, name, created_at, created_by, updated_at, updated_by) VALUES
('0195e4d1-5211-7354-a583-a5c83aee8b81', 'チーム1', '2025-03-30 02:12:15', '0195e4d1-5211-7e56-b0e1-0e567326f907', NULL, NULL),
('0195e4d1-5211-7ee7-82c9-dd60a3a6e1f4', 'チーム2', '2025-03-30 02:12:15', '0195e4d1-5211-7b60-a351-de498691f3aa', NULL, NULL);

INSERT INTO user (id, email, created_at, created_by, updated_at, updated_by) VALUES
('0195e4d1-5211-7e56-b0e1-0e567326f907', 'user1@example.com', '2025-03-30 02:12:15', '0195e4d1-5211-7bc6-b27c-69fe1b08112e', NULL, NULL),
('0195e4d1-5211-7b60-a351-de498691f3aa', 'user2@example.com', '2025-03-30 02:12:15', '0195e4d1-5211-70c2-a5d0-eb952377cf69', NULL, NULL),
('0195e4d1-5211-70c2-a5d0-eb952377cf69', 'user3@example.com', '2025-03-30 02:12:15', '0195e4d1-5211-7e56-b0e1-0e567326f907', NULL, NULL),
('0195e4d1-5211-7bc6-b27c-69fe1b08112e', 'user4@example.com', '2025-03-30 02:12:15', '0195e4d1-5211-7b60-a351-de498691f3aa', NULL, NULL);

INSERT INTO member (id, user_id, workspace_id, name, created_at, created_by, updated_at, updated_by) VALUES
('0195e4d1-5211-78ec-a7ea-c7c6106399af', '0195e4d1-5211-7e56-b0e1-0e567326f907', '0195e4d1-5211-7354-a583-a5c83aee8b81', 'メンバー1', '2025-03-30 02:12:15', '0195e4d1-5211-78ec-a7ea-c7c6106399af', NULL, NULL),
('0195e4d1-5211-7d39-a357-e790f53bff59', '0195e4d1-5211-7b60-a351-de498691f3aa', '0195e4d1-5211-7ee7-82c9-dd60a3a6e1f4', 'メンバー2', '2025-03-30 02:12:15', '0195e4d1-5211-7d39-a357-e790f53bff59', NULL, NULL),
('0195e4d1-5211-7201-b8c6-4a2f62134cb9', '0195e4d1-5211-70c2-a5d0-eb952377cf69', '0195e4d1-5211-7354-a583-a5c83aee8b81', 'メンバー3', '2025-03-30 02:12:15', '0195e4d1-5211-7201-b8c6-4a2f62134cb9', NULL, NULL),
('0195e4d1-5211-701e-be6a-9236304cb12d', '0195e4d1-5211-7bc6-b27c-69fe1b08112e', '0195e4d1-5211-7ee7-82c9-dd60a3a6e1f4', 'メンバー4', '2025-03-30 02:12:15', '0195e4d1-5211-701e-be6a-9236304cb12d', NULL, NULL);

INSERT INTO post (id, workspace_id, title, text, created_at, created_by, updated_at, updated_by) VALUES
('0195e4d1-5211-7d60-b77d-fd9cd6a06be8', '0195e4d1-5211-7354-a583-a5c83aee8b81', 'タイトル1', '本文1', '2025-03-30 02:12:15', '0195e4d1-5211-7bc6-b27c-69fe1b08112e', NULL, NULL),
('0195e4d1-5211-7063-ae09-2b34fac57b12', '0195e4d1-5211-7ee7-82c9-dd60a3a6e1f4', 'タイトル2', '本文2', '2025-03-30 02:12:15', '0195e4d1-5211-70c2-a5d0-eb952377cf69', NULL, NULL),
('0195e4d1-5211-7078-a494-2786460c90d2', '0195e4d1-5211-7354-a583-a5c83aee8b81', 'タイトル3', '本文3', '2025-03-30 02:12:15', '0195e4d1-5211-7e56-b0e1-0e567326f907', NULL, NULL),
('0195e4d1-5211-7504-97aa-c295f4ee8e4a', '0195e4d1-5211-7ee7-82c9-dd60a3a6e1f4', 'タイトル4', '本文4', '2025-03-30 02:12:15', '0195e4d1-5211-7b60-a351-de498691f3aa', NULL, NULL);