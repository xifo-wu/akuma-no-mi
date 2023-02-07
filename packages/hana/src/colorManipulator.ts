// 学习自 mui-system colorManipulator

import { clamp, intToHex } from './numberManipulator';

// hex syntax
// source: https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
// #RGB        // The three-value syntax
// #RGBA       // The four-value syntax
// #RRGGBB     // The six-value syntax
// #RRGGBBAA   // The eight-value syntax
export type HexColor = `#${string}`;
export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';
export interface ColorObject {
  type: string;
  values: number[];
  colorSpace?: string;
}

/**
 * 将十六进制颜色转换成 RGB
 * @param color 十六进制颜色，i.e. #RGB, #RGBA, #RRGGBB, #RRGGBBAA
 * @returns 返回 RGB 或 RGBA 或空字符串
 */
export function hexToRgb(color: string) {
  const nextColor = color.slice(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');

  // fff => [f, f, f]
  let colors = nextColor.match(re);

  if (!colors) {
    return '';
  }

  const rgbArr = colors.map((n, index) => {
    let hex = n;
    if (hex.length === 1) {
      hex += n;
    }

    if (index < 3) {
      return parseInt(n, 16);
    }

    return Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
  });

  return `rgb${colors.length === 4 ? 'a' : ''}(${rgbArr.join(', ')})`;
}

/**
 * 根据颜色返回一个具有类型、值、色域的对象
 * @param color CSS 颜色，i.e. #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns 返回一个对象 {type: string, values: number[], colorSpace?: string }
 */
export function decomposeColor(color: string): ColorObject {
  // HEX Color
  if (color.startsWith('#')) {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(
      `不支持 '${color}' 颜色。\n 支持以下格式: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`,
    );
  }

  let valueSubString = color.substring(marker + 1, color.length - 1);
  let values: string[];
  let colorSpace;

  if (type === 'color') {
    values = valueSubString.split(' ');
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }

    if (
      typeof colorSpace === 'undefined' ||
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1
    ) {
      throw new Error(
        `不支持 '${colorSpace}' 色域。\n 支持以下色域: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`,
      );
    }
  } else {
    values = valueSubString.split(',');
  }

  return {
    type,
    values: values.map((value: string) => parseFloat(value)),
    colorSpace,
  };
}

/**
 * 根据 ColorObject 对象返回一个 CSS 颜色
 * @param color ColorObject 对象
 * @returns CSS 颜色
 */
export function recomposeColor(color: ColorObject): string {
  const { type, values, colorSpace } = color;

  let convertValues: Array<string | number> = [];
  if (type.indexOf('rgb') !== -1) {
    convertValues = values.map((n, i) => (i < 3 ? parseInt(n.toString(), 10) : n));
  }
  if (type.indexOf('hsl') !== -1) {
    convertValues[1] = `${values[1]}%`;
    convertValues[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    return `${colorSpace} ${convertValues.join(' ')}`;
  }

  return `${type}(${convertValues.join(', ')})`;
}

/**
 * 返回一个可以给 rgba 或 hsla 使用的时间
 * @param color CSS 颜色，i.e. #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 */
export function colorChannel(color: string): string {
  const decomposedColor = decomposeColor(color);

  return decomposedColor.values
    .slice(0, 3)
    .map((v, i) => (decomposedColor.type.indexOf('hsl') !== -1 && i !== 0 ? `${v}` : v))
    .join(' ');
}

/**
 * 将 rgb 颜色转换为 hex 颜色
 * @param color css rgb 颜色
 * @returns 返回一个 hex 颜色
 */
export function rgbToHex(color: string): string {
  if (color.startsWith('#')) {
    return color;
  }

  const { values } = decomposeColor(color);

  return `${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
}

/**
 * 将一个 hsl 格式的颜色转换成 rgb 格式
 * @param color hsl 格式的颜色
 * @returns 返回 rgb 格式的颜色
 */
export function hslToRgb(color: string): string {
  const decomposedColor = decomposeColor(color);
  const { values } = decomposedColor;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (decomposedColor.type === 'hsla') {
    type += 'a';
    if (values[3]) {
      rgb.push(values[3]);
    }
  }

  return recomposeColor({ type, values: rgb });
}

/**
 * 色域中任何点的相对亮度，最暗的黑色为 0，最浅的白色为 1。
 * @param color css 颜色
 * @returns 返回 0 - 1 的颜色
 */
export function getLuminance(color: string): number {
  const decomposedColor = decomposeColor(color);

  let rgb =
    decomposedColor.type === 'hsl'
      ? decomposeColor(hslToRgb(color)).values
      : decomposedColor.values;

  const res = rgb.map((val: any) => {
    if (decomposedColor.type !== 'color') {
      val /= 255; // normalized
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  return Number((0.2126 * res[0] + 0.7152 * res[1] + 0.0722 * res[2]).toFixed(3));
}

/**
 * 计算两个颜色的对比度
 * @param foreground css 颜色，前景色
 * @param background css 颜色，背景色
 * @returns 返回 0 - 21 的对比度
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);

  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

export function alpha(color: string, value: number): string {
  const decomposedColor = decomposeColor(color);
  value = clamp(value);

  if (decomposedColor.type === 'rgb' || decomposedColor.type === 'hsl') {
    decomposedColor.type += 'a';
  }

  if (decomposedColor.type === 'color') {
    // @ts-ignore
    decomposedColor.values[3] = `/${value}`;
  } else {
    decomposedColor.values[3] = value;
  }

  return recomposeColor(decomposedColor);
}

/**
 * 加深一个颜色
 * @param color css 颜色
 * @param coefficient 加深的力度 0 - 1
 * @returns css 颜色
 */
export function darken(color: string, coefficient: number): string {
  let decomposedColor = decomposeColor(color);

  coefficient = clamp(coefficient);

  if (decomposedColor.type.indexOf('hsl') !== -1) {
    decomposedColor.values[2] *= 1 - coefficient;
  }

  if (decomposedColor.type.indexOf('rgb') !== -1 || decomposedColor.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(decomposedColor);
}

/**
 * 变亮一个颜色
 * @param color css 颜色
 * @param coefficient 变亮的力度 0 - 1
 * @returns css 颜色
 */
export function lighten(color: string, coefficient: number): string {
  let decomposedColor = decomposeColor(color);

  coefficient = clamp(coefficient);

  if (decomposedColor.type.indexOf('hsl') !== -1) {
    decomposedColor.values[2] += (100 - decomposedColor.values[2]) * coefficient;
  } else if (decomposedColor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] += (255 - decomposedColor.values[i]) * coefficient;
    }
  } else if (decomposedColor.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] += (1 - decomposedColor.values[i]) * coefficient;
    }
  }

  return recomposeColor(decomposedColor);
}

/**
 * 根据颜色的亮度，让颜色变暗或变亮
 * @param color css 颜色
 * @param coefficient 亮度系数
 * @returns css 颜色
 */
export function emphasize(color: string, coefficient = 0.15): string {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * 根据背景色展示文字颜色
 * @param color 当前文字背景色
 * @param light 亮色文字
 * @param dark 暗色文字
 * @returns
 */
export const getContrastText = (background: string, light: string, dark: string) => {
  const contrastThreshold = 3;

  return getContrastRatio(background, dark) >= contrastThreshold ? dark : light;
};
