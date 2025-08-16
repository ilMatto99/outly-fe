import type { Meta, StoryObj } from '@storybook/react-vite';
import MessageListItem from './MessageListItem';

const USER_AVATAR_URL_1 = 'https://i.pravatar.cc/150?img=3'; 
const USER_AVATAR_URL_2 = 'https://i.pravatar.cc/150?img=12'; 
const GROUP_AVATAR_URL_1 = 'https://picsum.photos/id/237/150/150'; 

/**
 * File di storie per il componente `MessageListItem`.
 *
 * Include storie che mostrano vari stati di un elemento di chat:
 * messaggi non letti, messaggi letti, messaggi inviati con stato di consegna/lettura,
 * chat di gruppo e chat individuali, fornendo una visione completa e interattiva
 * del componente.
 */
const meta: Meta<typeof MessageListItem> = {
    title: 'Components/Chat/MessageListItem',
    component: MessageListItem,
    parameters: {
        layout: 'padded', 
    },
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text', description: 'Unique ID for the chat item.' },
        onClick: { action: 'item clicked', description: 'Callback triggered when the list item is clicked.' },
        chatName: { control: 'text', description: 'Name of the chat (user or group).' },
        avatarUrl: { control: 'text', description: 'URL for the chat\'s avatar image.' },
        lastMessage: { control: 'text', description: 'Content of the last message.' },
        lastMessageTime: { control: 'text', description: 'Time of the last message (e.g., "14:10").' },
        unreadCount: { control: 'number', description: 'Number of unread messages.' },
        isGroupChat: { control: 'boolean', description: 'True if it is a group chat.' },
        isLastMessageSentByMe: { control: 'boolean', description: 'True if the last message was sent by the current user.' },
        lastMessageStatus: { 
            control: 'select', 
            options: ['', 'checked', 'delivered'], 
            description: 'Status of the last sent message (checked/delivered).' 
        },
        className: { control: 'text', description: 'Additional CSS classes for custom styling.' },
    },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: '#f0f2f5', padding: '20px', width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof MessageListItem>;

export const IndividualChatUnread: Story = {
    args: {
        id: 'chat-1',
        chatName: 'Giuseppe',
        avatarUrl: USER_AVATAR_URL_1,
        lastMessage: 'Benvenuti a tutti! Sono Giuseppe, l\'organizzatore di questa attività.',
        lastMessageTime: '14:00',
        unreadCount: 2,
        isGroupChat: false,
        isLastMessageSentByMe: false,
    },
};

export const IndividualChatRead: Story = {
    args: {
        id: 'chat-2',
        chatName: 'Patrizia Colombo',
        avatarUrl: USER_AVATAR_URL_2,
        lastMessage: 'Possiamo incontrarci alle 9 nel parcheggio del...',
        lastMessageTime: '15:00',
        unreadCount: 0, 
        isGroupChat: false,
        isLastMessageSentByMe: false,
    },
};

export const IndividualChatSentByMeDelivered: Story = {
    args: {
        id: 'chat-3',
        chatName: 'Marco Rossi',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
        lastMessage: 'Ho inviato l\'ultimo messaggio, è stato consegnato.',
        lastMessageTime: '16:05',
        unreadCount: 0,
        isGroupChat: false,
        isLastMessageSentByMe: true,
        lastMessageStatus: 'delivered',
    },
};

export const IndividualChatSentByMeRead: Story = {
    args: {
        id: 'chat-4',
        chatName: 'Sara Bianchi',
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
        lastMessage: 'Il mio ultimo messaggio è stato letto.',
        lastMessageTime: '16:10',
        unreadCount: 0,
        isGroupChat: false,
        isLastMessageSentByMe: true,
        lastMessageStatus: 'checked',
    },
};


export const GroupChatUnread: Story = {
    args: {
        id: 'group-1',
        chatName: 'MTB - Una passeggiata nella natura',
        avatarUrl: GROUP_AVATAR_URL_1,
        lastMessage: 'Giuseppe: L\'incontro è previsto per le ore 10 a M...',
        lastMessageTime: '14:10',
        unreadCount: 5, 
        isGroupChat: true,
        isLastMessageSentByMe: false,
    },
};

export const GroupChatRead: Story = {
    args: {
        id: 'group-2',
        chatName: 'Cena di Natale Aziendale',
        avatarUrl: undefined,
        lastMessage: 'Anna: Ci aggiorniamo per i dettagli.',
        lastMessageTime: 'Ieri',
        unreadCount: 0,
        isGroupChat: true,
        isLastMessageSentByMe: false,
    },
};

// --- Esempio di una lista di MessageListItem (per una visualizzazione più completa) ---

import { type StoryFn } from '@storybook/react-vite';

export const ListOfChats: StoryFn<typeof MessageListItem> = () => (
  <div style={{ backgroundColor: '#f0f2f5', padding: '0px', width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
    <MessageListItem
      id="chat-1"
      chatName="Giuseppe"
      avatarUrl={USER_AVATAR_URL_1}
      lastMessage="Benvenuti a tutti! Sono Giuseppe, l'organizzatore di questa attività."
      lastMessageTime="14:00"
      unreadCount={2}
      isGroupChat={false}
      isLastMessageSentByMe={false}
    />
    <MessageListItem
      id="chat-2"
      chatName="Patrizia Colombo"
      avatarUrl={USER_AVATAR_URL_2}
      lastMessage="Possiamo incontrarci alle 9 nel parcheggio del..."
      lastMessageTime="15:00"
      unreadCount={0}
      isGroupChat={false}
      isLastMessageSentByMe={false}
    />
    <MessageListItem
      id="group-1"
      chatName="MTB - Una passeggiata nella natura"
      avatarUrl={GROUP_AVATAR_URL_1}
      lastMessage="Giuseppe: L'incontro è previsto per le ore 10 a M..."
      lastMessageTime="14:10"
      unreadCount={5}
      isGroupChat={true}
      isLastMessageSentByMe={false}
    />
    <MessageListItem
      id="chat-3"
      chatName="Marco Rossi"
      avatarUrl={'https://i.pravatar.cc/150?img=68'}
      lastMessage="Ho inviato l'ultimo messaggio, è stato consegnato."
      lastMessageTime="16:05"
      unreadCount={0}
      isGroupChat={false}
      isLastMessageSentByMe={true}
      lastMessageStatus="delivered"
    />
    <MessageListItem
      id="chat-4"
      chatName="Sara Bianchi"
      avatarUrl={'https://i.pravatar.cc/150?img=15'}
      lastMessage="Il mio ultimo messaggio è stato letto."
      lastMessageTime="16:10"
      unreadCount={0}
      isGroupChat={false}
      isLastMessageSentByMe={true}
      lastMessageStatus="checked"
    />
  </div>
);