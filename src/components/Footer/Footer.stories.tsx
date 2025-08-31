import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from './Footer';
import './Footer.css'
import './../ButtonFooter/ButtonFooter.css'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
};