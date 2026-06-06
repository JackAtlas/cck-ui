/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    ELICON: typeof import('cck-ui')['CIcon']
  }
}

export {}
