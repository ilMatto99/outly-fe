import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBar, { type SearchBarProps } from "./SeachBar";

/**
 * File di storie per il componente `SearchBar`.
 *
 * Mostra la `SearchBar` in diversi contesti, includendo la gestione
 * degli eventi di ricerca e di click sui filtri, per dimostrarne
 * l'interattività e l'integrazione con il sistema di navigazione.
 */
const StorybookWrapper = (props: SearchBarProps) => {
    const handleSearch = (searchTerm: string, dateRange?: { from?: Date; to?: Date }) => {
        console.log("onSearch - Termine:", searchTerm, "Data:", dateRange);
    };

    const handleFilterClick = () => {
        console.log("onFilterClick - Cliccato su Filtri!");
    };

    return (
        <SearchBar
            {...props}
            onSearch={props.onSearch || handleSearch} 
            onFilterClick={props.onFilterClick || handleFilterClick}
        />
    );
};

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: StorybookWrapper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onFilterClick: { action: 'filter clicked', description: 'Callback triggered when the filter icon is clicked.' },
        onSearch: { action: 'search triggered', description: 'Callback triggered when search term or date range changes.' },
    },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
    args: {
    },
};