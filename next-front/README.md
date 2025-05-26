## 1. プロジェクト概要

- 概要を記載

## 2. 環境構築・セットアップ

- bun が入っていない場合（Mac）
  - `curl -fsSL https://bun.sh/install | bash`
- パッケージのインストール
  - `bun i`
- アプリケーションの立ち上げ
  - `bun run dev`
- Storybook の立ち上げ
  - `bun run storybook`

## ディレクトリ構成

```ts
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── user/
│   │   └── page.tsx
│   └── post/
│       └── page.tsx
└── components/
    ├── page/
    │   ├── top/
    │   │   ├── index.ts
    │   │   ├── Top.tsx
    │   │   ├── Top.page.tsx
    │   │   ├── Top.stories.tsx
    │   │   └── Top.module.tsx
    │   ├── user/
    │   │   ├── index.ts
    │   │   ├── User.tsx
    │   │   ├── User.page.tsx
    │   │   ├── User.stories.tsx
    │   │   └── User.module.tsx
    │   └── post/
    │       ├── index.ts
    │       ├── Post.tsx
    │       ├── Post.page.tsx
    │       ├── Post.stories.tsx
    │       └── Post.module.tsx
    ├── ui/
    │   └── Button/
    │       ├── Button.tsx
    │       ├── Button.stories.tsx
    │       └── Button.module.css
    └── model/
        ├── user/
        │   └── UserAvatar/
        │       ├── UserAvatar.tsx
        │       ├── UserAvatar.stories.tsx
        │       ├── UserAvatar.test.ts
        │       └── UserAvatar.module.css
        └── post/
            └── TableOfContents/
                ├── TableOfContents.tsx
                ├── TableOfContents.stories.tsx
                ├── TableOfContents.test.ts
                └── TableOfContents.module.css
```

### 基本方針

- ソースコードは`src`ディレクトリ配下に全てまとめてください。
  - lint や formatter で `src` 配下を対象にしたいため
- import をする際は `src` がルートになるになります。
  - import の形式は`@/〇〇`で import してください。
  - ex) `import Button from "@/components/ui/Button"`

### .src/app

- 基本的にルーティングに使用するディレクトリ。
- ~~

### .src/components

- コンポーネントを管理するディレクトリ。
- ~~

#### .src/components/page

- ~~

...
