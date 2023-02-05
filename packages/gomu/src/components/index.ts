import 'styled-components';

export { default as Button } from './Button';
export * from './Button';

interface Mode {
  color: string;
  main: string;
  disabled: string;
}

// 先写这，到时候挪走
declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: 'light' | 'dark';
    light: Mode;
    dark: Mode;
    responsive: {
      xs: {
        breakpoints: string;
        fontSize: string;
        borderRadius: string;
      };
      sm: {
        breakpoints: string;
        fontSize: string;
        borderRadius: string;
      };
      md: {
        breakpoints: string;
        fontSize: string;
        borderRadius: string;
      };
      lg: {
        breakpoints: string;
        fontSize: string;
        borderRadius: string;
      };
      xl: {
        breakpoints: string;
        fontSize: string;
        borderRadius: string;
      };
    };
  }
}
