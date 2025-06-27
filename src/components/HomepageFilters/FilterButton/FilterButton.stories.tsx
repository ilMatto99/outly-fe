import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterButton from './FilterButton';

const meta: Meta<typeof FilterButton> = {
    title: 'Components/HomepageFilter/FilterButton',
    component: FilterButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        iconName: { control: 'text', description: 'Name of the icon to display.' },
        label: { control: 'text', description: 'Text label for the button.' },
        isActive: { control: 'boolean', description: 'Whether the button is in an active/selected state.' },
        onClick: { action: 'clicked', description: 'Callback function when the button is clicked.' },
        className: { control: 'text', description: 'Additional CSS classes for custom styling.' },
    },
};

export default meta;

type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {
    args: {
        iconName: 'map-pin',
        label: 'Nelle vicinanze',
        isActive: false,
    },
};

export const Active: Story = {
    args: {
        iconName: 'map-pin',
        label: 'Nelle vicinanze',
        isActive: true,
    },
};

export const PeopleFilter: Story = {
    args: {
        iconName: 'users',
        label: 'Persone vicino a me',
        isActive: false,
    },
};

export const PremiumFilter: Story = {
    args: {
        iconName: 'euro', 
        label: 'Premium',
        isActive: false,
    },
};
