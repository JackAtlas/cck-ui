import { Meta, StoryObj } from '@storybook/vue3-vite'
import CNumberFormatter from '.'

const meta = {
  title: 'NumberFormatter',
  component: CNumberFormatter,
} satisfies Meta<typeof CNumberFormatter>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CNumberFormatter },
    template: `
      <div style="padding: 40px;">
        <c-number-formatter allow-negative className="test" decimalSeparator="dec" fixed-decimal-scale thousand-separator thousands-group-style="thousand" prefix="$ " suffix=" R$" :decimalScale="3" :value="-1022233.34"></c-number-formatter>
      </div>
    `,
  }),
}
