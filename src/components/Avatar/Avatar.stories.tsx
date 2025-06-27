import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from './avatar'; 

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar/Avatar',
  component: Avatar, 
  parameters: {
    layout: 'centered', 
  },
  tags: ['autodocs'], 
  argTypes: {
   type: {
      control: 'select',
      options: ['image', 'text'],
      description: 'Determines if the avatar displays an image/fallback or a count.',
      defaultValue: 'image',
    },
    src: {
      control: 'text',
      description: 'URL for the avatar image (if type is "image").',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image.',
    },
    fallbackText: {
      control: 'text',
      description: 'Text to display as fallback (e.g., initials) or when image fails to load.',
    },
    count: {
      control: { type: 'number', min: 0 },
      description: 'The number for the count avatar (e.g., +3). Only applicable when type is "count".',
      if: { arg: 'type', eq: 'text' }, 
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the avatar.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const ImageAvatar: Story = {
  args: {
    type: 'image',
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
    fallbackText: 'CN',
  },
};

export const LargeImageAvatar: Story = {
  args: {
    type: 'image',
    src: 'https://picsum.photos/200/200',
    alt: 'Random User',
    fallbackText: 'RU',
    className: 'size-20', 
  },
};

export const CountAvatar: Story = {
  args: {
    type: 'text',
    count: 3,
  },
};

export const LargeCountAvatar: Story = {
  args: {
    type: 'text',
    count: 10,
    className: 'size-16', 
  },
};
