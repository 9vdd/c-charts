export default function getMa (data, dayArr) {
  const aArr = dayArr.map(day => (day - 1) / (day + 1))
  const bArr = dayArr.map(day => 2 / (day + 1))
  return data.map((d, i) => {
    const res = d
    if (i === 0) {
      for (let j = 0; j < dayArr.length; j += 1) {
        res[`ma${dayArr[j]}`] = res.close
      }
    } else {
      for (let j = 0; j < dayArr.length; j += 1) {
        const preItem = data[i - 1];
        res[`ma${dayArr[j]}`] = (aArr[j] * preItem[`ma${dayArr[j]}`] + bArr[j] * d.close).toFixed(9);
      }
    }

    return res
  })
}
