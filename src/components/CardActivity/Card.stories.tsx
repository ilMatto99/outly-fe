import type { Meta, StoryObj } from '@storybook/react-vite';
import CardActivity from './CardActivity';

const meta: Meta<typeof CardActivity> = {
  title: 'Components/CardActivity',
  component: CardActivity,
  tags: ['autodocs'],
  args: {
    title: 'MTB - Una pedalata nella natura',
    location: 'Villa Reale - Monza (MB)',
    date: '15/09/2025',
    difficulty: 'Facile',
    distance: '15,7km',
    duration: '2h 30min',
    mapImage: "",
  },
};

export default meta;
type Story = StoryObj<typeof CardActivity>;

export const Default: Story = {};

export const Difficile: Story = {
  args: {
    title: 'Percorso Enduro Estremo',
    difficulty: 'Difficile',
    distance: '25km',
    duration: '3h 45min',
  },
};

export const MedioConPercorsoLungo: Story = {
  args: {
    title: 'Anello dei Laghi',
    difficulty: 'Medio',
    distance: '42km',
    duration: '5h',
  },
};
