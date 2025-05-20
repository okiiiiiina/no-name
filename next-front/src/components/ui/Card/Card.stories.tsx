import type { Meta, StoryObj } from '@storybook/react';

import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardBody>Card Body</CardBody>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
};
