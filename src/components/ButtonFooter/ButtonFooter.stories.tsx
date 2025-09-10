import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonFooter from './ButtonFooter';

const meta: Meta<typeof ButtonFooter> = {
  title: 'Components/ButtonFooter',
  component: ButtonFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonFooter>;

export const Default: Story = {
};