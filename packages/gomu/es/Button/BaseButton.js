import styled from "styled-components";
import { darken, getContrastText, lighten } from "../hana/es/colorManipulator.js";
import { CLASSNAME_PREFIX } from "../utils/constant.js";
import colors from "../theme/colors.js";
const BaseButton = styled.button((props) => {
  const { size = "md", gradient } = props;
  const variant = props.variant || "solid";
  const mode = props.mode || props.theme.mode || "light";
  const fontSize = props.theme.responsive[size || "md"]?.fontSize || 16;
  const borderRadius = props.theme.responsive[props.radius || "sm"]?.borderRadius || 2;
  const mainColor = mode == "dark" ? darken(props.theme["light"].main, 0.5) : props.theme["light"].main;
  const sx = props.sx instanceof Function ? props.sx(props.theme) : props.sx;
  const gradientDeg = gradient && gradient.deg && (typeof gradient.deg === "number" ? `${gradient.deg}deg` : gradient.deg) || "to left";
  const borderWidth = 1;
  return {
    position: "relative",
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    height: "auto",
    minWidth: 0,
    overflow: "hidden",
    userSelect: "none",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    borderRadius,
    fontSize,
    whiteSpace: "nowrap",
    letterSpacing: 0.875,
    "&:hover": {
      background: darken(mainColor, 0.1)
    },
    // #region variant style
    ...variant === "solid" && {
      background: mainColor,
      color: getContrastText(mainColor, props.theme["light"].color, props.theme["dark"].color),
      ...gradient && {
        background: `linear-gradient(${gradientDeg}, ${gradient.from}, ${gradient.to})`,
        "&:hover": {
          backgroundSize: "150%"
        }
      }
    },
    ...variant === "text" && {
      color: mainColor,
      "&:hover": {
        background: lighten(mainColor, 0.9)
      },
      ...gradient && {
        background: `linear-gradient(${gradientDeg}, ${gradient.from}, ${gradient.to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        "&:hover": {
          backgroundSize: "150%"
        }
      }
    },
    ...variant === "outline" && {
      borderStyle: "solid",
      borderWidth,
      borderColor: mainColor,
      color: mainColor,
      "&:hover": {
        background: lighten(mainColor, 0.95)
      },
      ...gradient && {
        boxSizing: "border-box",
        backgroundClip: "padding-box",
        [`& .${CLASSNAME_PREFIX}-btn-content`]: {
          background: `linear-gradient(${gradientDeg}, ${gradient.from}, ${gradient.to})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        },
        overflow: "unset",
        background: props.theme[mode].background,
        borderColor: "transparent",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
          margin: -borderWidth,
          borderRadius: "inherit",
          backgroundImage: `linear-gradient(${gradientDeg}, ${gradient.from}, ${gradient.to})`
        },
        "&:hover": {
          backgroundSize: "200%",
          boxSizing: "border-box",
          backgroundClip: "padding-box",
          [`& .${CLASSNAME_PREFIX}-btn-content`]: {
            backgroundSize: "200%"
          }
        }
      }
    },
    // #endregion
    // #region button size style
    ...size === "xs" && {
      padding: "6px 8px"
    },
    ...size === "sm" && {
      padding: "8px 16px"
    },
    ...size === "md" && {
      padding: "10px 16px"
    },
    ...size === "lg" && {
      padding: "12px 18px"
    },
    ...size === "xl" && {
      padding: "14px 18px"
    },
    // #endregion
    // #region disabled style
    [`&.${CLASSNAME_PREFIX}-btn-disabled`]: {
      pointerEvents: "none",
      color: props.theme[mode].disabled,
      ...variant === "solid" && {
        background: lighten(props.theme[mode].disabled, 0.85)
      },
      ...variant === "outline" && {
        borderColor: props.theme[mode].disabled
      }
    },
    // #endregion
    [`&.${CLASSNAME_PREFIX}-btn-loading`]: {
      pointerEvents: "none",
      "&:before": {
        content: '""',
        position: "absolute",
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        backgroundColor: "rgba(255, 255, 255, .5)",
        borderRadius
      }
    },
    ...sx
  };
});
BaseButton.defaultProps = {
  theme: {
    mode: "light",
    light: {
      background: "#fff",
      color: colors.slate[900],
      main: colors.sky[600],
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    dark: {
      background: "#121212",
      color: colors.slate[50],
      main: colors.gray[900],
      disabled: "rgba(0, 0, 0, 0.5)"
    },
    responsive: {
      xs: {
        breakpoints: "0px",
        fontSize: "0.75rem",
        borderRadius: "2px"
      },
      sm: {
        breakpoints: "600px",
        fontSize: "0.875rem",
        borderRadius: "4px"
      },
      md: {
        breakpoints: "900px",
        fontSize: "1rem",
        borderRadius: "8px"
      },
      lg: {
        breakpoints: "1200px",
        fontSize: "1.125rem",
        borderRadius: "16px"
      },
      xl: {
        breakpoints: "1536px",
        fontSize: "1.25rem",
        borderRadius: "32px"
      }
    }
  }
};
export {
  BaseButton
};
