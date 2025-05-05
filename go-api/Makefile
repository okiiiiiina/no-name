
include .env

# ========================
#  ALL
# ========================
setup:
	docker network create study-network1
.PHONY: setup

build:
	docker compose build
.PHONY: build

up:
	docker compose up
.PHONY: up

up-d:
	docker compose up -d
.PHONY: up-d

down:
	docker compose down
.PHONY: down

# ========================
#  back-s1
# ========================
back-up:
	docker compose up back-s1
.PHONY: back-up

back-up-d:
	docker compose up back-s1 -d
.PHONY: back-up-d

back-down:
	docker compose down back-s1
.PHONY: back-down

back-exec:
	docker compose exec back-s1 sh
.PHONY: back-exec

# [DOC] migrate create の使い方（新しいマイグレーションファイルを作成）
# - https://github.com/golang-migrate/migrate/blob/master/cmd/migrate/README.md#usage
fileName=
migrate-create:
	docker compose exec back-s1 sh -c 'migrate create -ext sql -dir ./database/migrations -seq $(fileName)'
.PHONY: migrate-create

# [DOC] MySQL用の接続方法やオプションの説明（DSN形式など）
# - https://github.com/golang-migrate/migrate/tree/master/database/mysql#mysql
DB=mysql://$(MYSQL_USER):$(MYSQL_PASSWORD)@tcp($(MYSQL_HOST):3306)/$(MYSQL_DATABASE)?charset=utf8mb4&parseTime=true&loc=Local
migrate-up:
	docker compose exec back-s1 sh -c "migrate -path ./database/migrations -database '$(DB)' up"
.PHONY: migrate-up

# ========================
#  mysql-s1
# ========================
db-up:
	docker compose up mysql-s1
.PHONY: db-up

db-up-d:
	docker compose up mysql-s1 -d
.PHONY: db-up-d

db-exec:
	docker compose exec mysql-s1 sh -c "mysql -u $(MYSQL_USER) -p$(MYSQL_PASSWORD) $(MYSQL_DATABASE)"
.PHONY: db-exec

# ========================
#  phpmyadmin-s1
# ========================
pma-up:
	docker compose up phpmyadmin-s1
.PHONY: pma-up

pma-up-d:
	docker compose up phpmyadmin-s1 -d
.PHONY: pma-up-d

# ========================
#  api check
# ========================
health-check:
	@curl http://localhost:6101
.PHONY: health-check

mem-get:
	@curl http://127.0.0.1:6101/workspaces/0195e4d1-5211-7354-a583-a5c83aee8b81/members | jq
.PHONY: mem-get

post-get:
	@curl http://localhost:6101/workspaces/0195e4d1-5211-7354-a583-a5c83aee8b81/posts | jq
.PHONY: post-get

