import ema from './ema.js'
import {
  minus
} from 'lib/utils/math.js'

export default function getMacd (data) {
  const emaData = ema(data, [12, 26])
  let preDea = 0
  const resData = data.map((item, index) => {
    const dif = emaData[index].ma12 && emaData[index].ma26 ? +minus(+emaData[index].ma12, +emaData[index].ma26).toFixed(9) : 0
    const dea = +((preDea * 0.8) + (dif * 0.2)).toFixed(9)
    preDea = dea
    const macd = +(2 * (dif - dea)).toFixed(9)
    return {
      ...item,
      dif: +dif.toFixed(8),
      dea: +dea.toFixed(8),
      macd: +macd.toFixed(8)
    }
  })

  return resData
}
