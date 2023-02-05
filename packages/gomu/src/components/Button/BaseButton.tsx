import React from 'react';
import styled, { DefaultTheme, CSSObject } from 'styled-components';
import { lighten, darken, getContrastText } from '../../utils/colorManipulator';
import { CLASSNAME_PREFIX } from '../../utils/constant';
import colors from '../../utils/colors';

export interface BaseButtonProps {
  variant?: 'text' | 'solid' | 'outline';
  mode?: DefaultTheme['mode'];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'left' | 'right' | 'center';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sx?: CSSObject | ((t: DefaultTheme) => CSSObject);
}

export const BaseButton = styled.button<BaseButtonProps>((props) => {
  // TODO 可以单独定制 button 主题
  const { size = 'md' } = props;
  const variant = props.variant || 'solid';
  const mode = props.mode || props.theme.mode || 'light';
  const fontSize = props.theme.responsive[size || 'md']?.fontSize || 16;
  const borderRadius = props.theme.responsive[props.radius || 'sm']?.borderRadius || 2;
  const mainColor =
    mode == 'dark' ? darken(props.theme['light'].main, 0.5) : props.theme['light'].main;
  const sx = props.sx instanceof Function ? props.sx(props.theme) : props.sx;

  return {
    position: 'relative',
    display: 'inline-flex',
    gap: 8,
    alignItems: 'center',
    height: 'auto',
    minWidth: 0,
    overflow: 'hidden',
    userSelect: 'none',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderRadius,
    fontSize,
    whiteSpace: 'nowrap',
    letterSpacing: 0.875,
    '&:hover': {
      background: darken(mainColor, 0.1),
    },
    // #region variant style
    ...(variant === 'solid' && {
      background: mainColor,
      color: getContrastText(mainColor, props.theme['light'].color, props.theme['dark'].color),
    }),
    ...(variant === 'text' && {
      color: mainColor,
      '&:hover': {
        background: lighten(mainColor, 0.9),
      },
    }),
    ...(variant === 'outline' && {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: mainColor,
      color: mainColor,
      '&:hover': {
        background: lighten(mainColor, 0.95),
      },
    }),
    // #endregion
    // #region button size style
    ...(size === 'xs' && {
      padding: '6px 8px',
    }),
    ...(size === 'sm' && {
      padding: '8px 16px',
    }),
    ...(size === 'md' && {
      padding: '10px 16px',
    }),
    ...(size === 'lg' && {
      padding: '12px 18px',
    }),
    ...(size === 'xl' && {
      padding: '14px 18px',
    }),
    // #endregion
    // #region disabled style
    [`&.${CLASSNAME_PREFIX}-btn-disabled`]: {
      pointerEvents: 'none',
      color: props.theme[mode].disabled,
      ...(variant === 'solid' && {
        background: lighten(props.theme[mode].disabled, 0.85),
      }),
      ...(variant === 'outline' && {
        borderColor: props.theme[mode].disabled,
      }),
    },
    // #endregion
    [`&.${CLASSNAME_PREFIX}-btn-loading`]: {
      pointerEvents: 'none',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        borderRadius,
      },
    },
    ...sx,
  };
});

// 提供默认主题
// TODO 移除无关的主题配置
BaseButton.defaultProps = {
  theme: {
    mode: 'light',
    light: {
      color: colors.slate[900],
      main: colors.sky[600],
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    dark: {
      color: colors.slate[50],
      main: colors.gray[900],
      disabled: 'rgba(0, 0, 0, 0.5)',
    },
    responsive: {
      xs: {
        breakpoints: '0px',
        fontSize: '0.75rem',
        borderRadius: '2px',
      },
      sm: {
        breakpoints: '600px',
        fontSize: '0.875rem',
        borderRadius: '4px',
      },
      md: {
        breakpoints: '900px',
        fontSize: '1rem',
        borderRadius: '8px',
      },
      lg: {
        breakpoints: '1200px',
        fontSize: '1.125rem',
        borderRadius: '16px',
      },
      xl: {
        breakpoints: '1536px',
        fontSize: '1.25rem',
        borderRadius: '32px',
      },
    },
  },
};
