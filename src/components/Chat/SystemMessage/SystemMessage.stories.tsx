import type { Meta, StoryObj } from '@storybook/react-vite';
import SystemMessage from './SystemMessage';

const meta: Meta<typeof SystemMessage> = {
    title: 'Components/Chat/SystemMessage',
    component: SystemMessage,
    parameters: {
        layout: 'padded', 
    },
    tags: ['autodocs'],
    argTypes: {
        message: { control: 'text', description: 'The system message text.' },
        className: { control: 'text', description: 'Additional CSS classes for custom styling.' },
    },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: '#f2f6f9', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof SystemMessage>;

export const Default: Story = {
    args: {
        message: 'Camilla si è iscritta all\'attività',
    },
};

export const UserJoined: Story = {
    args: {
        message: 'Marco è entrato nella chat.',
    },
};

export const ActivityStarted: Story = {
    args: {
        message: 'L\'attività "MTB - Una passeggiata nella natura" è iniziata.',
    },
};

export const WithLongMessage: Story = {
    args: {
        message: 'Attenzione: la data dell\'evento è stata modificata dal 25 Giugno al 28 Giugno a causa di previsioni meteo avverse. Vi preghiamo di controllare i dettagli aggiornati.',
    },
};