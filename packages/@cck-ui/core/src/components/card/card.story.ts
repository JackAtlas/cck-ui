import { Meta, StoryObj } from '@storybook/vue3-vite'
import CCard, { CCardSection } from '.'

const meta = {
  title: 'Card',
  component: CCard,
  render: () => ({}),
} satisfies Meta<typeof CCard>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CCard, CCardSection },
    template: `
      <div style="max-width: 400px; padding: 40px; margin: auto;">
        <c-card with-border>
          <c-card-section inherit-padding py="md" with-border>Card section 1</c-card-section>
          <c-card-section inherit-padding py="md" with-border>Card section 2</c-card-section>
          <c-card-section inherit-padding py="md" with-border>Card section 3</c-card-section>
          <c-card-section inherit-padding py="md" with-border>Card section 4</c-card-section>
        </c-card>
      </div>
    `,
  }),
}

export const HorizontalOrientation: Story = {
  render: () => ({
    components: { CCard, CCardSection },
    template: `
      <div style="max-width: 400px; padding: 40px; margin: auto;">
        <c-card orientation="horizontal" with-border>
          <c-card-section bg="blue">Card section 1</c-card-section>
          <c-card-section bg="orange">Card section 2</c-card-section>
          <div>Content</div>
          <c-card-section bg="red" :flex="1">Card section 3</c-card-section>
        </c-card>
      </div>
    `,
  }),
}
