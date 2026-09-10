import { Meta, StoryObj } from '@storybook/vue3-vite'
import CSpoiler from '.'
import { ref } from 'vue'

const meta = {
  title: 'Spoiler',
  component: CSpoiler,
} satisfies Meta<typeof CSpoiler>

export default meta

type Story = StoryObj<typeof meta>

export const Usage: Story = {
  render: () => ({
    components: { CSpoiler },
    template: `
      <div style="padding: 40px; max-width: 500px;">
        <c-spoiler :max-height="50">
          <template #show-label>Show more</template>
          <template #hide-label>Hide details</template>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut quam vitae lorem
          viverra ultricies. Integer hendrerit, quam mollis tempus iaculis, tellus est pellentesque
          eros, vel molestie risus eros sit amet sem. Fusce pretium ex quis neque fringilla facilisis.
          Aenean sed luctus tortor, eget suscipit neque. Pellentesque consequat neque quis porta
          luctus. Donec vitae est id velit condimentum mollis id vel est. Sed eleifend interdum enim,
          a facilisis ex faucibus nec. Morbi vel est et mauris congue ullamcorper. Duis eget velit
          lacinia, consequat neque vel, dignissim massa.
          <input aria-label="test-input" />
        </c-spoiler>
        <div>Some content after the spoiler</div>
      </div>
    `,
  }),
}

export const ContentChanges: Story = {
  render: () => ({
    components: { CSpoiler },
    setup() {
      const count = ref(1)
      const setCount = (val: number) => {
        count.value = val
      }
      const randomCount = () => {
        setCount(Math.round(Math.random() * 5 + 1))
      }
      return { count, randomCount, setCount }
    },
    template: `
      <div style="padding: 40px;">
        <button type="button" @click="randomCount">Random count</button>
        <c-spoiler :max-height="120">
          <template #show-label>Show more</template>
          <template #hide-label>Hide</template>
          <p v-for="i in count" :key="'p-' + i">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis, incidunt libero,
            itaque, quaerat labore quis odio culpa tempore quisquam porro unde omnis tempora nostrum
            nihil eligendi distinctio. Animi, consectetur!
          </p>
        </c-spoiler>
      </div>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { CSpoiler },
    setup() {
      const expanded = ref(false)
      const setExpanded = (val: boolean) => {
        expanded.value = val
      }

      return { expanded, setExpanded }
    },
    template: `
      <div style="padding: 40px;">
        <c-spoiler :expanded="expanded" :max-height="50" :onExpandedChange="setExpanded">
          <template #show-label>Show more</template>
          <template #hide-label>Hide details</template>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut quam vitae lorem
          viverra ultricies. Integer hendrerit, quam mollis tempus iaculis, tellus est pellentesque
          eros, vel molestie risus eros sit amet sem. Fusce pretium ex quis neque fringilla facilisis.
          Aenean sed luctus tortor, eget suscipit neque. Pellentesque consequat neque quis porta
          luctus. Donec vitae est id velit condimentum mollis id vel est. Sed eleifend interdum enim,
          a facilisis ex faucibus nec. Morbi vel est et mauris congue ullamcorper. Duis eget velit
          lacinia, consequat neque vel, dignissim massa.
          <input aria-label="test-input" />
        </c-spoiler>
        <div>Some content after the spoiler</div>
      </div>
    `,
  }),
}
