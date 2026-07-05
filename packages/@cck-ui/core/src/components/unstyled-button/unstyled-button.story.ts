import type { Meta, StoryObj } from '@storybook/vue3-vite'

// import { CckConfigProvider } from '../../core/config-provider'
import { UnstyledButton, UnstyledButtonProps } from '.'
import { CTheme } from '../../core'

const meta = {
  title: 'Unstyled Button',
} satisfies Meta<typeof UnstyledButton>
export default meta

type Story = StoryObj<typeof meta>

// TODO
// export const Usage: Story = {
//   render: () => {
//     const theme = {
//       components: {
//         UnstyledButton: UnstyledButton.extends({
//           classNames: (_theme, props) => ({
//             root: `provider-classname-${props.__staticSelector}`,
//           }),
//         }),
//       },
//     }
//     return {
//       components: { CckConfigProvider, UnstyledButton },
//       template: `
//       <cck-config-provider inherit :theme="${theme}">
//         <div style="padding: 40px;">
//           <unstyled-button>Button</unstyled-button>
//         </div>
//       </cck-config-provider>
//     `,
//     }
//   },
// }

export const PropsInStyles: Story = {
  render: () => ({
    components: { UnstyledButton },
    setup() {
      const classNames = (_theme: CTheme, props: UnstyledButtonProps) => ({
        root: `${props.__staticSelector}----test`,
      })
      return { classNames }
    },
    template: `
        <unstyled-button :classNames="classNames">Hello</unstyled-button>
      `,
  }),
}
