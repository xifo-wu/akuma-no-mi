import { jsx, jsxs } from "react/jsx-runtime";
const SVGComponent = (props) => /* @__PURE__ */ jsx("svg", {
  viewBox: "0 0 38 38",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "#fff",
  role: "presentation",
  ...props,
  children: /* @__PURE__ */ jsx("g", {
    fill: "none",
    fillRule: "evenodd",
    children: /* @__PURE__ */ jsxs("g", {
      transform: "translate(2.5 2.5)",
      strokeWidth: 5,
      children: [
        /* @__PURE__ */ jsx("circle", {
          strokeOpacity: 0.5,
          cx: 16,
          cy: 16,
          r: 16
        }),
        /* @__PURE__ */ jsx("path", {
          d: "M32 16c0-9.94-8.06-16-16-16",
          children: /* @__PURE__ */ jsx("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            from: "0 16 16",
            to: "360 16 16",
            dur: "1s",
            repeatCount: "indefinite"
          })
        })
      ]
    })
  })
});
const Loading = SVGComponent;
export {
  Loading as default
};
