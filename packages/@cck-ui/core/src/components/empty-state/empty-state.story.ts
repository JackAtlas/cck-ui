import { CEmptyState, CEmptyStateActions } from '.'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import CButton from '../button'

const meta = {
  title: 'EmptyState',
  component: CEmptyState,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CEmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CEmptyState },
    template: `
      <div style="padding: 40px; max-width: 500px; margin: auto;">
        <c-empty-state>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>No results found</template>
          <template #description>Try adjusting your search or filters to find what you are looking for.</template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const Compound: Story = {
  render: () => ({
    components: { CEmptyState, CEmptyStateActions, CButton },
    setup() {
      const head = document.head
      const viteStyles = Array.from(head.querySelectorAll('style')).filter(
        (style) => style.dataset.viteDevId
      )
      let buttonStyle: HTMLStyleElement | null = null
      let unstyledButtonStyle: HTMLStyleElement | null = null
      viteStyles.forEach((style) => {
        if (style.dataset.viteDevId?.endsWith('/button.module.css')) {
          buttonStyle = style
        } else if (style.dataset.viteDevId?.endsWith('/unstyled-button.module.css')) {
          unstyledButtonStyle = style
        }
      })

      if (buttonStyle && unstyledButtonStyle) {
        head.insertBefore(unstyledButtonStyle, buttonStyle)
      }
    },
    template: `
      <div style="padding: 40px; max-width: 500px; margin: auto;">
        <c-empty-state>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>No results found</template>
          <template #description>Try adjusting your filters.</template>
          <template #actions>
            <c-button>Reset filters</c-button>
            <c-button variant="filled">Create new</c-button>
          </template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const WithIndicatorBackground: Story = {
  render: () => ({
    components: { CEmptyState },
    template: `
      <div style="padding: 40px; max-width: 500px; margin: auto;">
        <c-empty-state with-indicator-background>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>No results found</template>
          <template #description>Try adjusting your search or filters.</template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { CEmptyState },
    setup() {
      const variants = ['filled', 'light'] as const
      return { variants }
    },
    template: `
      <div style="padding: 40px; display: flex; gap: 40px; flex-wrap: wrap;">
        <c-empty-state
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          color="blue"
          style="max-width: 360px;"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>Variant {{ variant }}</template>
          <template #description>Try adjusting your search or filters.</template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const Alignment: Story = {
  render: () => ({
    components: { CEmptyState, CButton },
    setup() {
      const alignments = ['center', 'left', 'right'] as const
      return { alignments }
    },
    template: `
      <div style="padding: 40px; max-width: 600px; display: flex; flex-direction: column; gap: 40px;">
        <c-empty-state
          v-for="align in alignments"
          :key="align"
          :align="align"
          with-indicator-background
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>Align {{ align }}</template>
          <template #description>Try adjusting your search or filters to find what you are looking for.</template>
          <template #default>
            <c-button variant="default" style="margin-top: 8px;">Reset filters</c-button>
          </template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { CEmptyState },
    setup() {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      return { sizes }
    },
    template: `
      <div style="padding: 40px; display: flex; flex-direction: column; gap: 40px;">
        <c-empty-state
          v-for="size in sizes"
          :key="size"
          :size="size"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>Size {{ size }}</template>
          <template #description>Try adjusting your search or filters.</template>
        </c-empty-state>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CEmptyState },
    template: `
      <div style="padding: 40px; max-width: 500px; margin: auto;">
        <c-empty-state unstyled>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </template>
          <template #title>No results found</template>
          <template #description>Try adjusting your search or filters.</template>
        </c-empty-state>
      </div>
    `,
  }),
}
