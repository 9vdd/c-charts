// import math from 'mathjs';
import Decimal from 'decimal.js'

// math.config({
//   number: 'BigNumber'
// });

/**
 * 精确相乘
 */
export function multiply(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 0;
  }
  const c = new Decimal(a).mul(new Decimal(b)).toNumber();
  // const c = math.parser().eval(`${a} * ${b}`);
  return c;
}
/**
 * 精确除法
 */
export function divide(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 0;
  }
  const c = new Decimal(a).div(new Decimal(b)).toNumber();
  // const c = math.parser().eval(`${a} / ${b}`);
  return c;
}
/**
 * 加
 */
export function plus(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 0;
  }
  // if (isNaN(a) || isNaN(b)) {
  //   return '0';
  // }
  // const c = math.parser().eval(`${a} + ${b}`);
  // return c.toFixed();
  const c = new Decimal(a).add(new Decimal(b)).toNumber();
  return c;
}
/**
 * 减
 */
export function minus(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 0;
  }
  // const c = math.parser().eval(`${a} - ${b}`);
  // return c.toFixed();
  const c = new Decimal(a).sub(new Decimal(b)).toNumber();
  return c;
}
/**
 * 求余
 */
export function remainder(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return 0;
  }
  // const c = math.parser().eval(`${a} % ${b}`);
  const c = new Decimal(a).modulo(new Decimal(b)).toNumber();
  return c;
}

export function avg(a, b) {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  return divide(plus(a, b), 2);
}
