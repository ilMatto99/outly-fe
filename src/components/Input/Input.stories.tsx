import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './input'; 

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'textarea', 'search', 'message'],
            description: 'The type of the input element (or "textarea" to render a textarea).',
        },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        readOnly: { control: 'boolean' },
        required: { control: 'boolean' },
        onChange: { action: 'changed' }, 
        rows: { control: 'number', if: { arg: 'type', eq: 'textarea' } },
        cols: { control: 'number', if: { arg: 'type', eq: 'textarea' } },
        leadingIcon: {
            control: 'select',
            options: ['', 'paperclip', 'search', 'camera', 'filter', 'calendar', 'eye', 'barred-eye', 'arrow-left'],
            description: 'Name of the icon to display at the beginning of the input.',
        },
        trailingIcons: {
            control: 'object', 
            description: 'Array of icons to display at the end of the input.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;


export const DefaultText: Story = {
    args: { 
        label: 'Nome Utente', 
        type: 'text', 
        placeholder: 'Inserisci il nome utente' 
    },
};

export const PasswordHidden: Story = {
    args: { 
        label: 'Password', 
        type: 'password', 
        placeholder: 'Inserisci la tua password',
        trailingIcons: [
            {iconName: 'eye', label: 'Occhio aperto'}
        ]
    },
};

export const PasswordShown: Story = {
    args: { 
        label: 'Password', 
        type: 'password', 
        placeholder: 'Inserisci la tua password',
        trailingIcons: [
            {iconName: 'barred-eye', label: 'Occhio chiuso'}
        ]
    },
};

export const SearchBar: Story = {
    args: {
        type: 'search',
        placeholder: 'Cerca luogo...',
        leadingIcon: 'search',
    },
};

export const SearchBarClicked: Story = {
    args: {
        type: 'search',
        placeholder: 'Cerca luogo...',
        leadingIcon: 'arrow-left',
        trailingIcons: [
            { iconName: 'calendar', label: 'Calendario' }, 
            { iconName: 'filter', label: 'Filtri' }, 
        ],
    },
};

export const ChatMessageInput: Story = {
    args: {
        label: 'Scrivi un messaggio',
        type: 'text',
        placeholder: 'Scrivi un messaggio...',
        leadingIcon: 'paperclip',
        trailingIcons: [
            { iconName: 'camera', label: 'Allega foto' },
            { iconName: 'send', label: 'Invia messaggio', variant: 'default' },
        ],
    },
};

export const ChatMessageInputWithValue: Story = {
    args: {
        label: 'Scrivi un messaggio',
        type: 'text',
        placeholder: 'Scrivi un messaggio...',
        leadingIcon: 'paperclip',
        value: 'Ciao, sono Camilla! Piacere!',
        trailingIcons: [
            { iconName: 'camera', label: 'Allega foto' },
            { iconName: 'send', label: 'Invia messaggio', variant: 'default' },
        ],
    },
};

export const DisabledChatInput: Story = {
    args: {
        label: 'Scrivi un messaggio (disabilitato)',
        type: 'text',
        placeholder: 'Input disabilitato',
        leadingIcon: 'paperclip',
        trailingIcons: [
            { iconName: 'camera', label: 'Allega foto' },
            { iconName: 'send', label: 'Invia messaggio', variant: 'default' },
        ],
        disabled: true,
    },
};