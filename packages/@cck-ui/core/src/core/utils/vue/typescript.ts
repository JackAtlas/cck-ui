import type {
  AllowedComponentProps,
  AppContext,
  Component,
  EmitsOptions,
  ObjectPlugin,
  SetupContext,
  VNodeProps,
} from 'vue'
import { type ComponentEmit, type ComponentProps } from 'vue-component-type-helpers'

type NativeType =
  | null
  | undefined
  | number
  | string
  | boolean
  | symbol
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  | Function

type InferDefaults<T> = {
  [K in keyof T as string extends K ? never : K]?: InferDefault<T[K]>
}

type InferDefault<T> = (() => T & {}) | (T extends NativeType ? T : never)

type ExtractEventNames<T> =
  ComponentEmit<T> extends (event: string, ...args: any[]) => any
    ? never
    : keyof {
        [K in keyof ComponentProps<T> as K extends `on${infer Event}`
          ? ComponentEmit<T> extends (event: Uncapitalize<Event>, ...args: any[]) => any
            ? K
            : never
          : never]: unknown
      }

type ExcludeProps<T> = ExtractEventNames<T> | keyof VNodeProps | keyof AllowedComponentProps

export type SFCWithInstall<T> = T & ObjectPlugin & SFCWithPropsDefaultSetter<T>

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

export type SFCWithPropsDefaultSetter<T> = T extends Component
  ? {
      setPropsDefault: (
        defaults: InferDefaults<{
          [K in keyof ComponentProps<T> as K extends ExcludeProps<T>
            ? never
            : K]?: ComponentProps<T>[K]
        }>
      ) => void
    }
  : unknown

export type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit']
