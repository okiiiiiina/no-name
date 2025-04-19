# 🏗 Goのプロジェクト構成比較
Goでは複数のディレクトリ構成パターンがありますが、ここでは代表的な2つを比較します。

## A. 一般的な汎用構成（Go公式・OSSライク）
```
myproject/
├── cmd/
│   └── myapp/
│       └── main.go
├── internal/
│   ├── foo/
│   └── bar/
├── pkg/
│   └── myproject/
├── api/
│   └── proto/
├── go.mod
├── go.sum
└── README.md

```
- cmd/：アプリのエントリポイント（複数のバイナリに対応可能）
- internal/：外部からインポートできないパッケージ
- pkg/：外部公開を意識した再利用ライブラリ
- api/：API定義（gRPCやOpenAPIなど）

## B. Clean Architecture / DDD風構成（レイヤード）
```
myapp/
├── cmd/
│   └── main.go
├── handler/           # HTTP層（MVCでいうController）
├── usecase/           # ユースケース（アプリケーションサービス層）
├── domain/            # ドメイン層（ビジネスルール）
│   ├── model/
│   └── persistence/
├── infrastructure/    # DB・外部APIの実装
├── config/            # 設定読み込み
└── main.go

```

## 構成比較表
| 観点 | A. 汎用構成 | B. Clean Architecture |
|------|-------------|------------------------|
| 構成目的 | 汎用的で柔軟 | 拡張性・保守性重視 |
| internal使用 | 多い | あまり使わない |
| レイヤー分離 | 弱い（自由） | 明確（handler → usecase → domain） |
| 導入コスト | 低い | 高い（ルールと知識が必要） |
| テストのしやすさ | △ | ◎（モックやユースケース単体テストが容易） |
| OSS向き | ◎ | △ |
| Web API向き | △ | ◎ |
| 規模向き | 小〜中規模 | 中〜大規模 |
| 普及度 | 非常に高い（Go公式推奨） | 実務で増加中（特にAPI開発） |
