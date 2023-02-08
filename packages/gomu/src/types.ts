export interface Mode {
  background?: string;
  color: string;
  main: string;
  disabled: string;
}

export interface Responsive {
  breakpoints: string;
  fontSize: string;
  borderRadius: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: 'light' | 'dark';
    light: Mode;
    dark: Mode;
    responsive: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', Responsive>;
  }
}
