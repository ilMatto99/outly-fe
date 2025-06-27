import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterCarousel from './FilterCarousel';
import React from 'react';

const meta: Meta<typeof FilterCarousel> = {
    title: 'Components/HomepageFilter/FilterCarousel',
    component: FilterCarousel,
    parameters: {
        layout: 'fullscreen', 
    },
    tags: ['autodocs'],
    argTypes: {
        filters: { control: 'object', description: 'Array of filter objects (id, iconName, label).' },
        activeFilterId: { control: 'text', description: 'ID of the currently active filter.' },
        onFilterChange: { action: 'filter changed', description: 'Callback when a filter button is clicked.' },
        className: { control: 'text', description: 'Additional CSS classes for custom styling.' },
    },
};

export default meta;

type Story = StoryObj<typeof FilterCarousel>;

const sampleFilters = [
    { id: 'vicinanze', iconName: 'map-pin', label: 'Nelle vicinanze' },
    { id: 'persone', iconName: 'users', label: 'Persone vicino a me' },
    { id: 'premium', iconName: 'euro', label: 'Premium' },
];

export const Default: Story = {
    args: {
        filters: sampleFilters,
        activeFilterId: 'vicinanze', 
    },
};

export const NoActiveFilter: Story = {
    args: {
        filters: sampleFilters,
        activeFilterId: null, 
    },
};

export const InteractiveCarousel: Story = {
    render: (args) => {
        const [currentActiveFilter, setCurrentActiveFilter] = React.useState<string | null>(args.activeFilterId);

        const handleFilterChange = (id: string) => {
            setCurrentActiveFilter(id);
            args.onFilterChange(id); 
        };

        return (
            <FilterCarousel
                {...args}
                activeFilterId={currentActiveFilter}
                onFilterChange={handleFilterChange}
            />
        );
    },
    args: {
        filters: sampleFilters,
        activeFilterId: 'vicinanze',
    },
};