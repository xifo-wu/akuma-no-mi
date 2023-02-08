import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { forwardRef } from "react";
import { BaseButton } from "./BaseButton.js";
import { CLASSNAME_PREFIX } from "../utils/constant.js";
import Loading from "../icons/Loading.js";
const Button = /* @__PURE__ */ forwardRef((props, ref) => {
  const { children, loadingPosition = "left", loadingText, leftIcon, loading, rightIcon, className, variant = "solid", ...rest } = props;
  return /* @__PURE__ */ jsxs(BaseButton, {
    className: clsx(`${CLASSNAME_PREFIX}-btn`, {
      [`${CLASSNAME_PREFIX}-btn-disabled`]: rest.disabled
    }, {
      [`${CLASSNAME_PREFIX}-btn-loading`]: loading
    }, className),
    variant,
    ref,
    ...rest,
    children: [
      loading && loadingPosition === "center" && /* @__PURE__ */ jsx("div", {
        style: {
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        },
        children: /* @__PURE__ */ jsx(Loading, {
          width: 16,
          stroke: variant !== "solid" ? "#333" : "#fff"
        })
      }),
      loading && loadingPosition === "left" ? /* @__PURE__ */ jsx(Loading, {
        width: 16,
        stroke: variant !== "solid" ? "#333" : "#fff"
      }) : leftIcon,
      loading && loadingText ? loadingText : /* @__PURE__ */ jsx("div", {
        className: `${CLASSNAME_PREFIX}-btn-content`,
        children
      }),
      loading && loadingPosition === "right" ? /* @__PURE__ */ jsx(Loading, {
        width: 16,
        stroke: variant !== "solid" ? "#333" : "#fff"
      }) : rightIcon
    ]
  });
});
const Button$1 = Button;
export {
  Button$1 as default
};
