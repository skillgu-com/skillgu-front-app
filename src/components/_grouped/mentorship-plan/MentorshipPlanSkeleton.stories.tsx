import type { Meta, StoryObj } from "@storybook/react";
import { MentorshipPlanSkeleton } from ".";

const meta = {
  title: "grouped/MentorshipPlanSkeleton",
  component: MentorshipPlanSkeleton,
  parameters: {
    variant: "pro",
  },
  tags: ["autodocs"],
  argTypes: {
    withUser: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof MentorshipPlanSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    withUser: true,
  },
};
