import type { Meta, StoryObj } from "@storybook/react-vite";
import Navbar from "./Navbar";

/**
 * File di storie per il componente `Navbar`.
 *
 * Contiene storie che mostrano le due varianti di navbar per la visualizzazione
 * su mobile, replicando i diversi scenari d'uso.
 */
const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'radio',
            options: ['default', 'secondary'],
            description: 'The variant of the navbar.',
            table: {
                defaultValue: { summary: 'default' },
            },
        },
        onBack: {
            action: 'onBack',
            description: 'Function called when the back button is clicked.',
            if: { arg: 'variant', eq: 'secondary' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
    args: {
        variant: 'default',
    }
};

export const Primary: Story = {
    args: {
        variant: 'primary',
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        onBack: () => alert("Torna indietro!")
    }
};