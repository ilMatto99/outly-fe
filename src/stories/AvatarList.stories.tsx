// src/components/ui/avatar-list.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarList } from '../components/custom/AvatarList'; // Importa AvatarList

const sampleUsers = [
  { id: '1', name: 'Alice', image: 'https://github.com/shadcn.png' },
  { id: '2', name: 'Bob', image: 'https://github.com/shadcn.png?seed=Bob&backgroundColor=ffc107&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '3', name: 'Charlie', image: 'https://api.dicebear.com/8.x/initials/svg?seed=Charlie&backgroundColor=dc3545&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '4', name: 'David', image: 'https://api.dicebear.com/8.x/initials/svg?seed=David&backgroundColor=198754&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '5', name: 'Eve', image: 'https://api.dicebear.com/8.x/initials/svg?seed=Eve&backgroundColor=6f42c1&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '6', name: 'Frank', image: 'https://api.dicebear.com/8.x/initials/svg?seed=Frank&backgroundColor=20c997&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '7', name: 'Grace', image: 'https://api.dicebear.com/8.x/initials/svg?seed=Grace&backgroundColor=6c757d&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
  { id: '8', name: 'Harry', image: 'https://api.dicebear.com/8.x/initials/svg?seed=Harry&backgroundColor=fd7e14&backgroundType=circle&fontFamily=Arial&fontWeight=600' },
];

const meta: Meta<typeof AvatarList> = {
  title: 'Components/Avatar/AvatarList',
  component: AvatarList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    users: {
      control: 'object',
      description: 'Array of user objects to display.',
    },
    maxDisplay: {
      control: { type: 'number', min: 0 },
      description: 'Maximum number of avatars to display before showing the count.',
    },
    avatarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'custom'],
      description: 'Predefined size for avatars in the list.',
    },
    customSizeClass: {
      control: 'text',
      description: 'Custom Tailwind class for avatar size (e.g., "size-14"). Only used if avatarSize is "custom".',
      if: { arg: 'avatarSize', eq: 'custom' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the list container.',
    },
  },
  args: {
    users: sampleUsers,
    maxDisplay: 3,
    avatarSize: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof AvatarList>;

// 1. Lista di avatar di default (mostra 3 + count)
export const DefaultList: Story = {
  args: {}, 
};

// 2. Lista di avatar con tutti visibili
export const AllVisibleList: Story = {
  args: {
    users: sampleUsers.slice(0, 4), 
    maxDisplay: 4, 
  },
};

// 3. Lista di avatar con molti utenti e un conteggio alto
export const HighCountList: Story = {
  args: {
    users: sampleUsers,
    maxDisplay: 2, 
  },
};

// 4. Lista di avatar di dimensione piccola
export const SmallList: Story = {
  args: {
    users: sampleUsers,
    maxDisplay: 4,
    avatarSize: 'sm',
  },
};

// 5. Lista di avatar di dimensione grande
export const LargeList: Story = {
  args: {
    users: sampleUsers,
    maxDisplay: 3,
    avatarSize: 'lg',
  },
};

// 6. Lista di avatar con dimensione custom
export const CustomSizeList: Story = {
  args: {
    users: sampleUsers,
    maxDisplay: 3,
    avatarSize: 'custom',
    customSizeClass: 'size-14', // Esempio di dimensione personalizzata 56px
  },
};

// 7. Lista con utenti senza immagini
export const NoImagesList: Story = {
  args: {
    users: [
      { id: '9', name: 'Laura' },
      { id: '10', name: 'Marco' },
      { id: '11', name: 'Nadia' },
      { id: '12', name: 'Omar' },
    ],
    maxDisplay: 2,
  },
};

// 8. Lista vuota
export const EmptyList: Story = {
  args: {
    users: [],
    maxDisplay: 3,
  },
};