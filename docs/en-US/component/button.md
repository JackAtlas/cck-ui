---
title: Button
lang: en-US
---

# Button

## Variant

<script setup>
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, DownloadIcon, ImageIcon } from '@lucide/vue'
import { h } from 'vue'

const downloadIcon = h(DownloadIcon, { size: 14 })
</script>

<style scoped>
.custom-button:disabled,
.custom-button[data-disabled] {
  border-color: light-dark(var(--c-color-gray-3), var(--c-color-dark-4));
  background-color: transparent;
}
</style>

<div style="display:flex;gap:12px;">
  <c-button>Default</c-button>
  <c-button variant="filled">Filled</c-button>
  <c-button variant="light">Light</c-button>
  <c-button variant="outline">Outline</c-button>
  <c-button variant="subtle">Subtle</c-button>
  <c-button variant="transparent">Transparent</c-button>
  <c-button variant="white">White</c-button>
</div>

```vue
<c-button>Default</c-button>

<c-button variant="filled">Filled</c-button>

<c-button variant="light">Light</c-button>

<c-button variant="outline">Outline</c-button>

<c-button variant="subtle">Subtle</c-button>

<c-button variant="transparent">Transparent</c-button>

<c-button variant="white">White</c-button>
```

## Color

Default theme includes several color presets. And custom color is acceptable.

### Presets:

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  variant:
  <c-button variant="filled" color="dark">Dark</c-button>
  <c-button variant="filled" color="gray">Gray</c-button>
  <c-button variant="filled" color="red">Red</c-button>
  <c-button variant="filled" color="pink">Pink</c-button>
  <c-button variant="filled" color="grape">Grape</c-button>
  <c-button variant="filled" color="violet">Violet</c-button>
  <c-button variant="filled" color="indigo">Indigo</c-button>
  <c-button variant="filled" color="blue">Blue</c-button>
  <c-button variant="filled" color="cyan">Cyan</c-button>
  <c-button variant="filled" color="teal">Teal</c-button>
  <c-button variant="filled" color="green">Green</c-button>
  <c-button variant="filled" color="lime">Lime</c-button>
  <c-button variant="filled" color="yellow">Yellow</c-button>
  <c-button variant="filled" color="orange">Orange</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  light:
  <c-button variant="light" color="dark">Dark</c-button>
  <c-button variant="light" color="gray">Gray</c-button>
  <c-button variant="light" color="red">Red</c-button>
  <c-button variant="light" color="pink">Pink</c-button>
  <c-button variant="light" color="grape">Grape</c-button>
  <c-button variant="light" color="violet">Violet</c-button>
  <c-button variant="light" color="indigo">Indigo</c-button>
  <c-button variant="light" color="blue">Blue</c-button>
  <c-button variant="light" color="cyan">Cyan</c-button>
  <c-button variant="light" color="teal">Teal</c-button>
  <c-button variant="light" color="green">Green</c-button>
  <c-button variant="light" color="lime">Lime</c-button>
  <c-button variant="light" color="yellow">Yellow</c-button>
  <c-button variant="light" color="orange">Orange</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  outline:
  <c-button variant="outline" color="dark">Dark</c-button>
  <c-button variant="outline" color="gray">Gray</c-button>
  <c-button variant="outline" color="red">Red</c-button>
  <c-button variant="outline" color="pink">Pink</c-button>
  <c-button variant="outline" color="grape">Grape</c-button>
  <c-button variant="outline" color="violet">Violet</c-button>
  <c-button variant="outline" color="indigo">Indigo</c-button>
  <c-button variant="outline" color="blue">Blue</c-button>
  <c-button variant="outline" color="cyan">Cyan</c-button>
  <c-button variant="outline" color="teal">Teal</c-button>
  <c-button variant="outline" color="green">Green</c-button>
  <c-button variant="outline" color="lime">Lime</c-button>
  <c-button variant="outline" color="yellow">Yellow</c-button>
  <c-button variant="outline" color="orange">Orange</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  subtle:
  <c-button variant="subtle" color="dark">Dark</c-button>
  <c-button variant="subtle" color="gray">Gray</c-button>
  <c-button variant="subtle" color="red">Red</c-button>
  <c-button variant="subtle" color="pink">Pink</c-button>
  <c-button variant="subtle" color="grape">Grape</c-button>
  <c-button variant="subtle" color="violet">Violet</c-button>
  <c-button variant="subtle" color="indigo">Indigo</c-button>
  <c-button variant="subtle" color="blue">Blue</c-button>
  <c-button variant="subtle" color="cyan">Cyan</c-button>
  <c-button variant="subtle" color="teal">Teal</c-button>
  <c-button variant="subtle" color="green">Green</c-button>
  <c-button variant="subtle" color="lime">Lime</c-button>
  <c-button variant="subtle" color="yellow">Yellow</c-button>
  <c-button variant="subtle" color="orange">Orange</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  transparent:
  <c-button variant="transparent" color="dark">Dark</c-button>
  <c-button variant="transparent" color="gray">Gray</c-button>
  <c-button variant="transparent" color="red">Red</c-button>
  <c-button variant="transparent" color="pink">Pink</c-button>
  <c-button variant="transparent" color="grape">Grape</c-button>
  <c-button variant="transparent" color="violet">Violet</c-button>
  <c-button variant="transparent" color="indigo">Indigo</c-button>
  <c-button variant="transparent" color="blue">Blue</c-button>
  <c-button variant="transparent" color="cyan">Cyan</c-button>
  <c-button variant="transparent" color="teal">Teal</c-button>
  <c-button variant="transparent" color="green">Green</c-button>
  <c-button variant="transparent" color="lime">Lime</c-button>
  <c-button variant="transparent" color="yellow">Yellow</c-button>
  <c-button variant="transparent" color="orange">Orange</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  white:
  <c-button variant="white" color="dark">Dark</c-button>
  <c-button variant="white" color="gray">Gray</c-button>
  <c-button variant="white" color="red">Red</c-button>
  <c-button variant="white" color="pink">Pink</c-button>
  <c-button variant="white" color="grape">Grape</c-button>
  <c-button variant="white" color="violet">Violet</c-button>
  <c-button variant="white" color="indigo">Indigo</c-button>
  <c-button variant="white" color="blue">Blue</c-button>
  <c-button variant="white" color="cyan">Cyan</c-button>
  <c-button variant="white" color="teal">Teal</c-button>
  <c-button variant="white" color="green">Green</c-button>
  <c-button variant="white" color="lime">Lime</c-button>
  <c-button variant="white" color="yellow">Yellow</c-button>
  <c-button variant="white" color="orange">Orange</c-button>
</div>

### Custom color:

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  variant:
  <c-button variant="filled" color="skyblue">Custom</c-button>
  <c-button variant="filled" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  light:
  <c-button variant="light" color="skyblue">Custom</c-button>
  <c-button variant="light" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  outline:
  <c-button variant="outline" color="skyblue">Custom</c-button>
  <c-button variant="outline" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  subtle:
  <c-button variant="subtle" color="skyblue">Custom</c-button>
  <c-button variant="subtle" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  transparent:
  <c-button variant="transparent" color="skyblue">Custom</c-button>
  <c-button variant="transparent" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;">
  white:
  <c-button variant="white" color="skyblue">Custom</c-button>
  <c-button variant="white" color="rgba(148, 22, 22, 1)">Custom</c-button>
</div>

```vue
<!-- Preset color -->
<c-button variant="filled" color="dark">Dark</c-button>

<c-button variant="filled" color="gray">Gray</c-button>
<!-- ... -->

<!-- Custom color -->
<c-button variant="filled" color="skyblue">Custom</c-button>

<c-button variant="filled" color="rgba(148, 22, 22, 1)">Custom</c-button>
<!-- ... -->
```

## Full width

If the `fullWidth` props is set, the `Button` will take 100% of the parent width:

<div>
  <c-button fullWidth>Full width button</c-button>
</div>

```vue
<c-button fullWidth>Full width button</c-button>
```

## Left and right sections

`left-section` and `right-section` allow adding icons or any other element to the left and right sides of the button. When a section is added, padding on the corresponding side is reduced. Both slot and prop are acceptable.

<div style="display:flex;justify-content:center;gap:12px;">
  <c-button>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Gallery
  </c-button>
  <c-button :right-section="downloadIcon">Download</c-button>
  <c-button>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Visit gallery
    <template #right-section>
      <ChevronRightIcon size="14" />
    </template>
  </c-button>
</div>

```vue
<script setup>
import { ChevronRightIcon, DownloadIcon, ImageIcon } from '@lucide/vue'
import { h } from 'vue'

const downloadIcon = h(DownloadIcon, { size: 14 }) // or jsx
</script>

<template>
  <c-button>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Gallery
  </c-button>

  <c-button :right-section="downloadIcon">Download</c-button>

  <c-button>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Visit gallery
    <template #right-section>
      <ChevronRightIcon size="14" />
    </template>
  </c-button>
</template>
```

(**WIP**) Note that `left-section` and `right-section` are flipped in RTL mode (`left-section` is displayed on the right and `right-section` is displayed on the left).

## Sections position

The `justify` prop sets the `justify-content` of the `inner` element. You can use it to change the alignment of left and right sections. For example, to spread them across the button, set `justify="space-between"`.

If you need to align just one section to the side of the button, set `justify` to `space-between` and add an empty `<span />` to the opposite section.

<div style="display:flex;flex-direction:column;gap:12px;">
  <c-button justify="space-between" fullWidth>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Button label
    <template #right-section>
      <ImageIcon size="14" />
    </template>
  </c-button>
  <c-button justify="space-between" fullWidth>
    <template #left-section>
      <ImageIcon size="14" />
    </template>
    Button label
  </c-button>
  <c-button justify="start" fullWidth>
    Button label
    <template #left-section>
      <ImageIcon size="14" />
    </template>
  </c-button>
  <c-button justify="end" fullWidth>
    Button label
    <template #right-section>
      <ImageIcon size="14" />
    </template>
  </c-button>
  <c-button justify="space-between" fullWidth>
    <template #left-section>
      <span></span>
    </template>
    Button label
    <template #right-section>
      <ImageIcon size="14" />
    </template>
  </c-button>
</div>

```vue
<c-button justify="space-between" fullWidth>
  <template #left-section>
    <ImageIcon size="14" />
  </template>
  Button label
  <template #right-section>
    <ImageIcon size="14" />
  </template>
</c-button>

<c-button justify="space-between" fullWidth>
  <template #left-section>
    <ImageIcon size="14" />
  </template>
  Button label
</c-button>

<c-button justify="start" fullWidth>
  Button label
  <template #left-section>
    <ImageIcon size="14" />
  </template>
</c-button>

<c-button justify="end" fullWidth>
  Button label
  <template #right-section>
    <ImageIcon size="14" />
  </template>
</c-button>

<c-button justify="space-between" fullWidth>
  <template #left-section>
    <span></span>
  </template>
  Button label
  <template #right-section>
    <ImageIcon size="14" />
  </template>
</c-button>
```

## Size

`Button` support `xs` - `xl` and `compact-xs` - `compact-xl` sizes. `compact` sizes have the same font size as `xs` - `xl` but with reduced padding and height.

<div style="display:flex;gap:12px;align-items:center;">
  <c-button size="xs">Regular xs</c-button>
  <c-button size="sm">Regular sm</c-button>
  <c-button size="md">Regular md</c-button>
  <c-button size="lg">Regular lg</c-button>
  <c-button size="xl">Regular xl</c-button>
</div>
<div style="display:flex;gap:12px;align-items:center;margin-top:12px;">
  <c-button size="compact-xs">Compact xs</c-button>
  <c-button size="compact-sm">Compact sm</c-button>
  <c-button size="compact-md">Compact md</c-button>
  <c-button size="compact-lg">Compact lg</c-button>
  <c-button size="compact-xl">Compact xl</c-button>
</div>

## Gradient variant

When the `variant` prop is set to `gradient`, you can control the gradient with the `gradient` prop, which accepts an object with `form`,`to` and `deg` properties. If the `gradient` props is not set, `Button` will use `theme.defaultGradient` which can be configured on the theme object. The `gradient` prop is ignored when `variant` is not `gradient`.

**WIP** Note that `variant="gradient"` supports only linear gradients with two colors. If you need a more complex gradient, use the Styles API to modify `Button` styles.

<div style="display:flex;gap:12px;">
  <c-button variant="gradient">Gradient button</c-button>
  <c-button variant="gradient" :gradient="{from: 'yellow', to: 'green'}">Gradient button</c-button>
  <c-button variant="gradient" :gradient="{from: 'rgba(245, 56, 56, 1)', to: 'rgba(230, 106, 48, 1)', deg: 90}">Gradient button</c-button>
</div>

```vue
<c-button variant="gradient">Gradient button</c-button>
<c-button
  variant="gradient"
  :gradient="{ from: 'yellow', to: 'green' }"
>Gradient button</c-button>
<c-button
  variant="gradient"
  :gradient="{
    from: 'rgba(245, 56, 56, 1)',
    to: 'rgba(230, 106, 48, 1)',
    deg: 90
  }"
>Gradient button</c-button>
```

## Disabled state

To make a `Button` disabled, set the `disabled` prop. This will prevent any interactions with the button and add disabled styles. If you want the button to just look disabled but still be interactive, set the `data-disabled` prop instead. Note that disabled styles are the same for all variants.

<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <c-button disabled>Disabled button</c-button>
</div>

## Disabled state when Button is link

The `<a />` element does not support the `disabled` attribute. To make a `Button` disabled when it is rendered as a link, set the `data-disabled` attribute instead and prevent default behavior in the `@click` event handler.

**Note**: The blue text color and underline you see here are styles injected by VitePress for all `<a>` tags. When using this button component in your own project, these styles won't appear unless you explicitly add them to your theme.

<div>
  <c-button tag="a" href="https://jackatlas.xyz" data-disabled @click="(event) => event.preventDefault()">Disabled button</c-button>
</div>

```vue
<c-button
  tag="a"
  href="https://jackatlas.xyz"
  data-disabled
  @click="(event) => event.preventDefault()"
>Disabled button</c-button>
```

## Customize disabled styles

To customize disabled styles, it is recommended to use both `&:disabled` and `&[data-disabled]` selectors:

- `&:disabled` is used to style the button when the `disabled` prop is set and also when the button is disabled by the parent component (for example, when the `disabled` prop is set on a `<fieldset />` element which contains the `Button`).
- `&[data-disabled]` is used to style the button when it is not actually disabled but should look like it is (for example, `data-disabled` should be used if you need to use Tooltip with a disabled `Button` or when the `Button` is used as a link).

<c-button class="custom-button" disabled>Disabled with styles</c-button>

```vue
<template>
  <c-button class="custom-button" disabled>Disabled with styles</c-button>
</template>

<style scoped>
.custom-button:disabled,
.custom-button[data-disabled] {
  border-color: light-dark(var(--c-color-gray-3), var(--c-color-dark-4));
  background-color: transparent;
}
</style>
```

## Disabled button with Tooltip (WIP)

The `onMouseLeave` event is not triggered when a `Button` is disabled, so if you need to use a Tooltip with a disabled `Button`, you need to set the `data-disabled` prop on the `Button` instead of `disabled`. Note that it is also required to change the `onClick` event library to `(event) => event.preventDefault()` as the `Button` is not actually disabled and will still trigger the `onClick` event.

## Loading state (WIP)

When the `loading` prop is set, the `Button` will be disabled and a Loader with overlay will be rendered in the center of the button. Loader color depends on the `Button` variant.

<div style="display:flex;gap:12px;">
  <c-button variant="filled" loading>Filled button</c-button>
  <c-button variant="light" loading>Light button</c-button>
  <c-button variant="outline" loading>Outline button</c-button>
</div>

## Loader props (WIP)

You can customize the Loader with the `loaderProps` prop, which accepts all props that the Loader component has.

## Custom variants (WIP)

To add new `Button` variants, use the data-variant attribute. Usually the new variants are added to the theme, this way they are available in all components that support variant prop in your application.

## Auto contrast (WIP)

`Button` supports the `auto-contrast` prop and theme.autoContrast. If `autoContrast` is set either on `Button` or on the theme, the content color will be ajusted to have sufficient contrast with the value specified in the `color` prop.

Note that the `auto-contrast` feature works only if you use the `color` prop to change the background color. `auto-contrast` works only with the `filled` variant.

## Button group

<div style="display:flex; flex-direction:column; align-items: center; gap: 12px;">
  <c-button-group>
    <c-button>Left</c-button>
    <c-button>Center</c-button>
    <c-button>Right</c-button>
  </c-button-group>

  <c-button-group orientation="vertical">
    <c-button>Top</c-button>
    <c-button>Middle</c-button>
    <c-button>Bottom</c-button>
  </c-button-group>
</div>

```vue
<c-button-group>
  <c-button>Left</c-button>
  <c-button>Center</c-button>
  <c-button>Right</c-button>
</c-button-group>

<c-button-group orientation="vertical">
  <c-button>Top</c-button>
  <c-button>Middle</c-button>
  <c-button>Bottom</c-button>
</c-button-group>
```

Note that you must not wrap child `c-button` components with any additional elements.

```vue
<c-button-group>
  <div>
    <c-button>This will not work</c-button>
  </div>
  <c-button>Buttons will have incorrect borders</c-button>
</c-button-group>
```

## Button group section

<div style="display: flex; justify-content: center; gap: 12px">
  <c-button-group>
    <c-button-group-section variant="filled">123</c-button-group-section>
    <c-button>
      <chevron-up-icon color="var(--c-color-teal-text)" />
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-button>
      <chevron-down-icon color="var(--c-color-red-text)" />
    </c-button>
    <c-button-group-section>123</c-button-group-section>
    <c-button>
      <chevron-up-icon color="var(--c-color-teal-text)" />
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-button>
      <chevron-down-icon color="var(--c-color-red-text)" />
    </c-button>
    <c-button-group-section>123</c-button-group-section>
  </c-button-group>
</div>

```vue
<div style="display: flex; justify-content: center; gap: 12px">
  <c-button-group>
    <c-button-group-section variant="filled">123</c-button-group-section>
    <c-button>
      <chevron-up-icon color="var(--c-color-teal-text)" />
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-button>
      <chevron-down-icon color="var(--c-color-red-text)" />
    </c-button>
    <c-button-group-section>123</c-button-group-section>
    <c-button>
      <chevron-up-icon color="var(--c-color-teal-text)" />
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-button>
      <chevron-down-icon color="var(--c-color-red-text)" />
    </c-button>
    <c-button-group-section>123</c-button-group-section>
  </c-button-group>
</div>
```

## Get element ref

```vue
<template>
  <c-button ref="buttonRef" variant="filled" size="lg">点击我</c-button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const buttonRef = ref(null)

onMounted(() => {
  console.log(buttonRef.value.ref)
})
</script>
```
