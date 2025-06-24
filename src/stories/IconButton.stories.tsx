import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from '../components/custom/IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: ['paperclip', 'camera', 'send'],
      description: 'The name of the icon to display.',
    },
    label: { control: 'text', description: 'Accessible label for the button.' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button.',
    },
    variant: {
        control: 'select',
        options: ['default', 'outline'],
        description: 'The visual style of the button.',
    },
    iconColor: { control: 'color', description: 'Override the default icon color.' },
    iconSize: { control: 'number', description: 'Override the default icon size.' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const DefaultAttach: Story = {
  args: {
    iconName: 'paperclip',
    label: 'Allega file',
    size: 'medium',
    variant: 'default',
  },
};

export const CameraAttach: Story = {
  args: {
    iconName: 'camera',
    label: 'Scatta foto',
    size: 'medium',
    variant: 'default',
  },
};

export const SendMessage: Story = {
  args: {
    iconName: 'send',
    label: 'Invia messaggio',
    size: 'medium',
    variant: 'default',
  },
};

export const SmallIcon: Story = {
  args: {
    iconName: 'paperclip',
    label: 'Allega file (piccolo)',
    size: 'small',
  },
};

export const LargeIcon: Story = {
  args: {
    iconName: 'camera',
    label: 'Scatta foto (grande)',
    size: 'large',
  },
};

export const DisabledIcon: Story = {
  args: {
    iconName: 'send',
    label: 'Invia disabilitato',
    disabled: true,
    variant: 'default',
  },
};

export const CustomColorIcon: Story = {
    args: {
        iconName: 'paperclip',
        label: 'Icona personalizzata',
        iconColor: 'purple',
        size: 'medium',
    }
}

export const Outline: Story = {
  args: {
    iconName: 'send',
    label: 'Invia disabilitato',
    disabled: false,
    variant: 'outline',
  },
};