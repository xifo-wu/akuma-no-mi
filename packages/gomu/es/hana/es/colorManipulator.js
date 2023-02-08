import { clamp } from "./numberManipulator.js";
function hexToRgb(color) {
  const nextColor = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let colors = nextColor.match(re);
  if (!colors) {
    return "";
  }
  const rgbArr = colors.map((n, index) => {
    let hex = n;
    if (hex.length === 1) {
      hex += n;
    }
    if (index < 3) {
      return parseInt(n, 16);
    }
    return Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  });
  return `rgb${colors.length === 4 ? "a" : ""}(${rgbArr.join(", ")})`;
}
function decomposeColor(color) {
  if (color.startsWith("#")) {
    return decomposeColor(hexToRgb(color));
  }
  const marker = color.indexOf("(");
  const type = color.substring(0, marker);
  if ([
    "rgb",
    "rgba",
    "hsl",
    "hsla",
    "color"
  ].indexOf(type) === -1) {
    throw new Error(`不支持 '${color}' 颜色。
 支持以下格式: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`);
  }
  let valueSubString = color.substring(marker + 1, color.length - 1);
  let values;
  let colorSpace;
  if (type === "color") {
    values = valueSubString.split(" ");
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].slice(1);
    }
    if (typeof colorSpace === "undefined" || [
      "srgb",
      "display-p3",
      "a98-rgb",
      "prophoto-rgb",
      "rec-2020"
    ].indexOf(colorSpace) === -1) {
      throw new Error(`不支持 '${colorSpace}' 色域。
 支持以下色域: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`);
    }
  } else {
    values = valueSubString.split(",");
  }
  return {
    type,
    values: values.map((value) => parseFloat(value)),
    colorSpace
  };
}
function recomposeColor(color) {
  const { type, values, colorSpace } = color;
  let convertValues = [];
  if (type.indexOf("rgb") !== -1) {
    convertValues = values.map((n, i) => i < 3 ? parseInt(n.toString(), 10) : n);
  }
  if (type.indexOf("hsl") !== -1) {
    convertValues[1] = `${values[1]}%`;
    convertValues[2] = `${values[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    return `${colorSpace} ${convertValues.join(" ")}`;
  }
  return `${type}(${convertValues.join(", ")})`;
}
function hslToRgb(color) {
  const decomposedColor = decomposeColor(color);
  const { values } = decomposedColor;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255)
  ];
  if (decomposedColor.type === "hsla") {
    type += "a";
    if (values[3]) {
      rgb.push(values[3]);
    }
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color) {
  const decomposedColor = decomposeColor(color);
  let rgb = decomposedColor.type === "hsl" ? decomposeColor(hslToRgb(color)).values : decomposedColor.values;
  const res = rgb.map((val) => {
    if (decomposedColor.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * res[0] + 0.7152 * res[1] + 0.0722 * res[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function darken(color, coefficient) {
  let decomposedColor = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (decomposedColor.type.indexOf("hsl") !== -1) {
    decomposedColor.values[2] *= 1 - coefficient;
  }
  if (decomposedColor.type.indexOf("rgb") !== -1 || decomposedColor.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(decomposedColor);
}
function lighten(color, coefficient) {
  let decomposedColor = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (decomposedColor.type.indexOf("hsl") !== -1) {
    decomposedColor.values[2] += (100 - decomposedColor.values[2]) * coefficient;
  } else if (decomposedColor.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] += (255 - decomposedColor.values[i]) * coefficient;
    }
  } else if (decomposedColor.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] += (1 - decomposedColor.values[i]) * coefficient;
    }
  }
  return recomposeColor(decomposedColor);
}
const getContrastText = (background, light, dark) => {
  const contrastThreshold = 3;
  return getContrastRatio(background, dark) >= contrastThreshold ? dark : light;
};
export {
  darken,
  decomposeColor,
  getContrastRatio,
  getContrastText,
  getLuminance,
  hexToRgb,
  hslToRgb,
  lighten,
  recomposeColor
};
