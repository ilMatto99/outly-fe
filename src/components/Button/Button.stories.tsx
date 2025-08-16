import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";

/**
 * File di storie per il componente `Button`.
 *
 * Contiene diverse storie che mostrano le varie combinazioni di
 * varianti (`primary`, `secondary`, `outline`, `link`) e dimensioni
 * (`small`, `medium`, `large`) del componente `Button`, inclusa la
 * versione disabilitata, per una completa documentazione visiva.
 */
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {control: 'text'},
        onClick: {action: 'clicked'},
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'link'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        }
    }
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        label: 'Primary Button',
        variant: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        label: 'Secondary Button',
        variant: 'secondary'
    }
}

export const Outline: Story = {
    args: {
        label: 'Outline Button',
        variant: 'outline'
    }
}

export const Link: Story = {
    args: {
        label: 'Link Button',
        variant: 'link'
    }
}

export const SmallButton: Story = {
    args: {
        label: 'Small Button',
        size: 'small'
    }
}

export const MediumButton: Story = {
    args: {
        label: 'Medium Button',
        size: 'medium'
    }
}

export const LargeButton: Story = {
    args: {
        label: 'Large Button',
        size: 'large'
    }
}

export const Disabled: Story = {
    args: {
        label: 'Disabled Button',
        disabled: true
    }
}