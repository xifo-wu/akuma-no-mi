/**
 * 返回一个数字，其值限制在给定的范围内。
 * @param value 将被限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 返回一个在 [min, max] 区间内的值，小于 min 时返回 min，大于 max 时返回 max
 */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(Math.max(min, value), max);
}

/**
 * 将一个 number 转为 16 进制，个位数时补 0。
 * @param int 将被转换成 16 进制的数字
 * @returns 返回一个16进制的字符串
 */
export function intToHex(int: number): string {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
