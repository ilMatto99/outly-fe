import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatMessage from './ChatMessage';

const AVATAR_URL_1 = 'https://static.vecteezy.com/system/resources/previews/026/812/394/large_2x/a-young-woman-cyclist-with-a-close-up-shot-of-her-smiling-face-as-she-rides-generative-ai-photo.jpg';
const AVATAR_URL_2 = 'https://static.vecteezy.com/system/resources/previews/026/812/394/large_2x/a-young-woman-cyclist-with-a-close-up-shot-of-her-smiling-face-as-she-rides-generative-ai-photo.jpg';
const AVATAR_URL_3 = 'https://static.vecteezy.com/system/resources/previews/026/812/394/large_2x/a-young-woman-cyclist-with-a-close-up-shot-of-her-smiling-face-as-she-rides-generative-ai-photo.jpg';

const meta: Meta<typeof ChatMessage> = {
    title: 'Components/Chat/ChatMessage',
    component: ChatMessage,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        message: { control: 'text', description: 'The text content of the chat message.' },
        time: { control: 'text', description: 'The time the message was sent.' },
        type: { control: 'select', options: ['sent', 'received'], description: 'Type of message: "sent" by current user, "received" by another user.' },
        sender: { control: 'text', description: 'Name of the message sender (for received messages).' },
        avatarUrl: { control: 'text', description: 'URL for the sender\'s avatar image.' },
        readStatusIcon: {
            control: 'select',
            options: ['', 'checked', 'delivered'],
            description: 'Icon for message read/delivery status (only for "sent" messages). "checked" for read, "delivered" for delivered.'
        },
        isOrganizer: { control: 'boolean', description: 'True if the sender is the organizer of the activity (applies to received messages).' },
    },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: '#f0f2f5', padding: '20px', minHeight: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const ReceivedMessageGiuseppeOrganizer: Story = {
    args: {
        message: 'Benvenuti a tutti! Sono Giuseppe, l\'organizzatore di questa attività.',
        time: '14:00',
        type: 'received',
        sender: 'Giuseppe',
        avatarUrl: AVATAR_URL_1,
        isOrganizer: true,
    },
};

export const ReceivedMessagePatriziaParticipant: Story = {
    args: {
        message: 'Possiamo incontrarci alle 9 nel parcheggio dell\'Esselunga',
        time: '15:00',
        type: 'received',
        sender: 'Patrizia Colombo',
        avatarUrl: AVATAR_URL_2,
        isOrganizer: false,
    },
};

export const LongReceivedMessage: Story = {
    args: {
        message: 'Ciao, sono Camilla! Ho visto che anche tu vivi a Milano. Potremo andare insieme! Questa è una descrizione del messaggio piuttosto lunga per testare come si comporta il layout quando il testo è molto esteso e va a capo su più righe e la bolla occupa la larghezza massima consentita per assicurare che il testo venga visualizzato correttamente senza overflow.',
        time: '15:00',
        type: 'received',
        sender: 'Camilla',
        avatarUrl: AVATAR_URL_3,
        isOrganizer: false,
    },
};

export const SentMessageCamillaRead: Story = {
    args: {
        message: 'Ciao, sono Camilla! Piacere!',
        time: '14:30',
        type: 'sent',
        sender: 'Camilla',
        avatarUrl: AVATAR_URL_3,
        readStatusIcon: 'checked',
        isOrganizer: false,
    },
};

export const SentMessageDelivered: Story = {
    args: {
        message: 'Il mio messaggio è stato consegnato, ma non ancora letto.',
        time: '16:00',
        type: 'sent',
        sender: 'Camilla',
        avatarUrl: AVATAR_URL_3,
        readStatusIcon: 'delivered',
        isOrganizer: false,
    },
};

export const LongSentMessage: Story = {
    args: {
        message: 'Assolutamente! Possiamo incontrarci alle 8 nel parcheggio del punto di ritrovo. Assicurati di portare acqua e snack sufficienti per il percorso lungo. Ci vediamo presto! Questo è un messaggio lungo inviato per testare la larghezza massima e come si comporta il testo quando deve andare a capo.',
        time: '15:02',
        type: 'sent',
        sender: 'Camilla',
        avatarUrl: AVATAR_URL_3,
        readStatusIcon: 'checked',
        isOrganizer: false,
    },
};

export const ReceivedMessageNoAvatar: Story = {
    args: {
        message: 'Questo messaggio è ricevuto ma senza un avatar.',
        time: '10:00',
        type: 'received',
        sender: 'Utente Sconosciuto',
        avatarUrl: undefined,
        isOrganizer: false,
    },
};

export const SentMessageNoStatusIcon: Story = {
    args: {
        message: 'Questo messaggio inviato non ha un\'icona di stato (es. messaggio in fase di invio).',
        time: '10:05',
        type: 'sent',
        sender: 'Tu',
        avatarUrl: undefined,
        readStatusIcon: undefined,
        isOrganizer: false,
    },
};

export const ReceivedMessageNoSender: Story = {
    args: {
        message: 'Messaggio ricevuto senza nome mittente.',
        time: '10:10',
        type: 'received',
        sender: undefined,
        avatarUrl: AVATAR_URL_1,
        isOrganizer: false,
    },
};

