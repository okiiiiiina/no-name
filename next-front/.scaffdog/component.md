---
name: 'component'
root: '.'
output: './src/components/ui'
questions:
  name: 'コンポーネント名を入力'
---

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import styles from "./{{ inputs.name }}.module.css"

type Props = {
  children: React.ReactNode;
}

export const {{ inputs.name | pascal }}: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.module.css`

```typescript
.container {
  display: flex;
}
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { {{ inputs.name }} } from './{{ inputs.name }}';

const meta: Meta<typeof {{ inputs.name }}> = {
  component: {{ inputs.name }},
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof {{ inputs.name }}>;

export const Default: Story = {};
```
