import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./radio-group"; // Importa i tuoi componenti Shadcn/Radix modificati
import { useState } from "react"; 

/**
 * File di storie per i componenti `RadioGroup` e `RadioGroupItem`.
 *
 * Contiene storie che mostrano i radio button in diversi stati (singolo, in gruppo,
 * con opzione predefinita e disabilitata) per testarne l'interazione e lo stile.
 */
const meta: Meta<typeof RadioGroup> = { 
  title: 'Components/RadioGroup',
  component: RadioGroup, 
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const SingleItem: Story = {
  render: () => (
    <RadioGroup defaultValue="item1" className="grid w-full max-w-sm gap-4"> 
      <RadioGroupItem value="item1" label="Opzione Singola" />
    </RadioGroup>
  ),
  args: {},
};

const InteractiveRadioGroupTemplate = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={setSelectedValue}
      className="grid w-full max-w-sm gap-4" 
    >
      <RadioGroupItem value="option1" label="Prima Opzione" />
      <RadioGroupItem value="option2" label="Seconda Opzione" />
      <RadioGroupItem value="option3" label="Terza Opzione" />
    </RadioGroup>
  );
};

export const Group: Story = {
  render: InteractiveRadioGroupTemplate,
  args: {},
};

export const GroupWithDefaultSelected: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("option2"); 

    return (
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="grid w-full max-w-sm gap-4">
        <RadioGroupItem value="option1" label="Opzione Uno" />
        <RadioGroupItem value="option2" label="Opzione Due" />
        <RadioGroupItem value="option3" label="Opzione Tre" />
      </RadioGroup>
    );
  },
  args: {},
};

export const GroupWithDisabledItems: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("option1");

    return (
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="grid w-full max-w-sm gap-4">
        <RadioGroupItem value="option1" label="Opzione Abilitata" />
        <RadioGroupItem value="option2" label="Opzione Disabilitata" disabled />
        <RadioGroupItem value="option3" label="Opzione Selezionata e Disabilitata" disabled />
      </RadioGroup>
    );
  },
  args: {},
};