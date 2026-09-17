import { Meta, StoryObj } from '@storybook/vue3-vite'
import CScrollArea from '.'
import CStack from '../stack'
import CPaper from '../paper'
import CCode from '../code'
import { ref } from 'vue'

const meta = {
  title: 'ScrollArea',
  component: CScrollArea,
} satisfies Meta<typeof CScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const content = Array(10).fill(0)

export const Usage: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      return { content }
    },
    template: `
      <div style="background: pink; max-width: 300px;">
        <c-scroll-area
          scrollbars="y"
          variant="test-variant"
          :onBottomReached="() => console.log('bottom')"
          :onTopReached="() => console.log('top')"
          :h="200"
        >
          <div style="width: 600px;">
            <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
            </p>
          </div>
        </c-scroll-area>
      </div>
    `,
  }),
}

export const BottomReachedDecimal: Story = {
  render: () => ({
    components: { CCode, CPaper, CStack, CScrollArea },
    setup() {
      const scrollPosition = ref({ x: 0, y: 0 })
      const hasReachedBottom = ref(false)
      const setHasReachedBottom = (v: boolean) => {
        hasReachedBottom.value = v
      }
      const onScrollPositionChange = (p: { x: number; y: number }) => {
        scrollPosition.value.x = p.x
        scrollPosition.value.y = p.y
      }
      return {
        content,
        hasReachedBottom,
        scrollPosition,
        setHasReachedBottom,
        onScrollPositionChange,
      }
    },
    template: `
      <c-stack align="center" justify="center">
        <c-paper with-border :h="100" :w="200">
          <c-scroll-area
            :on-bottom-reached="() => setHasReachedBottom(true)"
            :on-scroll-position-change="onScrollPositionChange"
            :h="100"
          >
            <div style="width: 600px;">
              <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
              </p>
            </div>
          </c-scroll-area>
        </c-paper>

        <div>Scroll position <c-code>{ x: {{ scrollPosition.x }}, y: {{ scrollPosition.y }} }</c-code></div>
        <div>Has Reached Bottom: <c-code>{ {{ hasReachedBottom }} }</c-code></div>
      </c-stack>
    `,
  }),
}

export const OffsetScrollbars: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      return { content }
    },
    template: `
      <div style="background: pink; max-width: 300px;">
        <c-scroll-area
          type="always"
          offset-scrollbars="present"
          :h="200"
        >
          <div style="width: 600px;">
            <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
            </p>
          </div>
        </c-scroll-area>
      </div>
    `,
  }),
}

export const Unstyled: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      return { content }
    },
    template: `
      <div style="background: pink; max-width: 300px;">
        <c-scroll-area
          type="always"
          offset-scrollbars
          unstyled
          :h="200"
        >
          <div style="width: 600px;">
            <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
            </p>
          </div>
        </c-scroll-area>
      </div>
    `,
  }),
}

export const onScrollChange: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      const scrollPosition = ref({ x: 0, y: 0 })
      const onScrollPositionChange = (p: { x: number; y: number }) => {
        scrollPosition.value.x = p.x
        scrollPosition.value.y = p.y
      }
      return {
        content,
        scrollPosition,
        onScrollPositionChange,
      }
    },
    template: `
      <div style="background: pink; max-width: 300px;">
        <c-scroll-area
          type="always"
          :on-scroll-position-change="onScrollPositionChange"
          :h="200"
        >
          <div style="width: 600px;">
            <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
            </p>
          </div>
        </c-scroll-area>
        <div>scroll position x: {{ scrollPosition.x }}, y: {{ scrollPosition.y }}</div>
      </div>
    `,
  }),
}

export const NeverType: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      return { content }
    },
    template: `
      <c-scroll-area type="never" :h="200">
        <div style="width: 600px;">
          <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
          </p>
        </div>
      </c-scroll-area>
    `,
  }),
}

export const StartScrollPosition: Story = {
  render: () => ({
    components: { CScrollArea },
    setup() {
      return { content }
    },
    template: `
      <div style="padding: 40px; max-width: 300px;">
        <c-scroll-area
          :h="200"
          :start-scroll-position="{ y: 200 }"
        >
          <div style="width: 600px;">
            <p style="margin:0;padding:0;" v-for="(_, index) in content" :key="index">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam qui minima, voluptates aperiam labore delectus consequuntur tempore a sed ullam? Vitae ducimus amet distinctio, fugiat odio accusamus veniam sit hic.
            </p>
          </div>
        </c-scroll-area>
      </div>
    `,
  }),
}
