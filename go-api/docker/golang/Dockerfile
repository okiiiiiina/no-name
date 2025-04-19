# [DOC] golang イメージの使い方とベストプラクティス解説
# - https://github.com/docker-library/docs/blob/master/golang/README.md
FROM golang:1.24-alpine

WORKDIR /app

# [DOC] golang-migrate CLI をバージョン指定でインストールするための手順
# - https://github.com/golang-migrate/migrate/blob/master/cmd/migrate/README.md#with-go-toolchain
RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.18.2

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /app/tmp/main /app

CMD ["go", "run", "main.go"]

EXPOSE 8080