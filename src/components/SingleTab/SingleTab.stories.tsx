import type { Meta, StoryObj } from '@storybook/react-vite';
import './SingleTab.css'
import SingleTab from './SingleTab';

const meta: Meta<typeof SingleTab> = {
  title: 'Components/SingleTab',
  component: SingleTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: ['map-pin', 'users', 'euro'],
      description: 'The name of the icon to display.',
    },
    text: { control: 'text', description: 'Accessible label for the button.' },
    onClick: {action: 'clicked'},
  }
};

export default meta;

type Story = StoryObj<typeof SingleTab>;

export const Default: Story = {
  args: {
    iconName: 'map-pin',
    text: 'Nelle vicinanze',
  },
};