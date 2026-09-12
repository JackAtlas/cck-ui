import { Meta, StoryObj } from '@storybook/vue3-vite'
import { CircleCheckIcon, CircleDashedIcon } from '@lucide/vue'
import CList, { CListItem } from '.'
import CThemeIcon from '../theme-icon'

const meta = {
  title: 'List',
  component: CList,
} satisfies Meta<typeof CList>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CList, CListItem },
    template: `
      <div style="padding: 40px;">
        <c-list type="ordered">
          <c-list-item>Clone or download repository from Github</c-list-item>
          <c-list-item>Install dependencies with pnpm</c-list-item>
          <c-list-item>To start development server run pnpm start command</c-list-item>
          <c-list-item>Run tests to make sure your changes do not break the build</c-list-item>
          <c-list-item>Submit a pull request once you are done</c-list-item>
        </c-list>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CList, CListItem },
    template: `
      <div style="padding: 40px;">
        <c-list size="lg" type="ordered" unstyled>
          <c-list-item>Clone or download repository from Github</c-list-item>
          <c-list-item>Install dependencies with pnpm</c-list-item>
          <c-list-item>To start development server run pnpm start command</c-list-item>
          <c-list-item>Run tests to make sure your changes do not break the build</c-list-item>
          <c-list-item>Submit a pull request once you are done</c-list-item>
        </c-list>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { CircleCheckIcon, CircleDashedIcon, CList, CListItem, CThemeIcon },
    template: `
      <div style="padding: 40px;">
        <c-list type="ordered">
          <template #icon>
            <c-theme-icon color="blue" radius="xl" variant="filled" :size="24">
              <circle-check-icon size="1rem" />
            </c-theme-icon>
          </template>
          <c-list-item>Clone or download repository from Github</c-list-item>
          <c-list-item>Install dependencies with pnpm</c-list-item>
          <c-list-item>To start development server run pnpm start command</c-list-item>
          <c-list-item>Run tests to make sure your changes do not break the build</c-list-item>
          <c-list-item>
            <template #icon>
              <c-theme-icon color="blue" radius="xl" variant="filled" :size="24">
                <circle-dashed-icon size="1rem" />
              </c-theme-icon>
            </template>
            Submit a pull request once you are done
          </c-list-item>
        </c-list>
      </div>
    `,
  }),
}

export const Nested: Story = {
  render: () => ({
    components: { CList, CListItem },
    template: `
      <div style="padding: 40px;">
        <c-list list-style-type="disc">
          <c-list-item>First order item</c-list-item>
          <c-list-item>First order item</c-list-item>
          <c-list-item>
            First order item with list
            <c-list with-padding list-style-type="disc">
              <c-list-item>Nested item</c-list-item>
              <c-list-item>Nested item</c-list-item>
              <c-list-item>
                Nested item with list
                <c-list with-padding list-style-type="disc">
                  <c-list-item>Even more nested</c-list-item>
                  <c-list-item>Even more nested</c-list-item>
                </c-list>
              </c-list-item>
              <c-list-item>Nested item</c-list-item>
            </c-list>
          </c-list-item>
          <c-list-item>First order item</c-list-item>
        </c-list>
      </div>
    `,
  }),
}
