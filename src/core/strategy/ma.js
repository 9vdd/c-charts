import {
  plus,
  minus,
  divide
} from '../utils/math.js';

export default function ma(data, day) {
  let total = 0;
  console.log(data);
  return data.map((item, index) => {
    const res = {
      ...item
    }
    if (index < day) {
      total = index === 0 ? item.close : plus(total, item.close)
      res['ma'] = undefined
    } else {
      total = plus(total, minus(item.close, data[index - day].close))
      res['ma'] = divide(total, day)
    }
    return res
  })
}