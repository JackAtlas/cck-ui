import { Meta, StoryObj } from '@storybook/vue3-vite'
import CTitle from '.'

const meta = {
  title: 'Title',
  component: CTitle,
} satisfies Meta<typeof CTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CTitle },
    template: `
      <div style="padding: 40px;">
        <c-title :order="1">Heading 1</c-title>
        <c-title :order="2">Heading 2</c-title>
        <c-title :order="3">Heading 3</c-title>
        <c-title :order="4">Heading 4</c-title>
        <c-title :order="5">Heading 5</c-title>
        <c-title :order="6">Heading 6</c-title>
      </div>
    `,
  }),
}

export const TextWrap: Story = {
  render: () => ({
    components: { CTitle },
    template: `
      <div style="padding: 40px;">
        <c-title text-wrap="balance" :order="1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis reiciendis, commodi placeat
        doloribus iusto autem, odit maxime, at dolor blanditiis est ea incidunt nostrum esse quod
        rerum error ipsum laboriosam?
        </c-title>
      </div>
    `,
  }),
}

export const LineClamp: Story = {
  render: () => ({
    components: { CTitle },
    template: `
      <div style="padding: 40px;">
        <c-title :order="1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis reiciendis, commodi placeat
        doloribus iusto autem, odit maxime, at dolor blanditiis est ea incidunt nostrum esse quod
        rerum error ipsum laboriosam?
        </c-title>
        <c-title :line-clamp="2" :order="1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis reiciendis, commodi placeat
        doloribus iusto autem, odit maxime, at dolor blanditiis est ea incidunt nostrum esse quod
        rerum error ipsum laboriosam?
        </c-title>
      </div>
    `,
  }),
}
