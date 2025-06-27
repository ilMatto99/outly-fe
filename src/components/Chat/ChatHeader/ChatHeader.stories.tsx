import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatHeader from './ChatHeader';

const USER_AVATAR_URL = 'https://i.pravatar.cc/150?img=12'; 
const GROUP_AVATAR_URL = 'https://picsum.photos/id/237/150/150';

const meta: Meta<typeof ChatHeader> = {
    title: 'Components/Chat/ChatHeader',
    component: ChatHeader,
    parameters: {
        
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        onBackClick: { action: 'back clicked', description: 'Callback triggered when the back button is clicked.' },
        onOptionsClick: { action: 'options clicked', description: 'Callback triggered when the options button is clicked.' },
        type: { control: 'select', options: ['individual', 'group'], description: 'Type of chat: individual or group.' },
        userName: { control: 'text', description: 'Name of the individual chat user.' },
        userAvatarUrl: { control: 'text', description: 'Avatar URL for the individual chat user.' },
        groupName: { control: 'text', description: 'Name of the group chat.' },
        groupParticipants: { control: 'object', description: 'Object containing group participant details (e.g., count).' },
        groupAvatarUrl: { control: 'text', description: 'Avatar URL for the group chat.' },
        className: { control: 'text', description: 'Additional CSS classes for custom styling.' },
    },
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

export const IndividualChat: Story = {
    args: {
        type: 'individual',
        userName: 'Patrizia Colombo',
        userAvatarUrl: USER_AVATAR_URL,
    },
};

export const GroupChat: Story = {
    args: {
        type: 'group',
        groupName: 'MTB - Una passeggiata nella natura',
        groupParticipants: { count: 26 },
    },
};

export const GroupChatWithAvatar: Story = {
    args: {
        type: 'group',
        groupName: 'MTB - Una passeggiata nella natura',
        groupParticipants: { count: 26 },
        groupAvatarUrl: GROUP_AVATAR_URL, 
    },
};

export const ChatWithOnlyButtons: Story = {
    args: {
        type: 'individual', 
        userName: '', 
        userAvatarUrl: undefined, 
        groupName: '', 
        groupParticipants: undefined, 
    },
};