export const encodeQuery = (key, value) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

export const sortQuery = arr => {
  return arr.sort((a, b) => a.key < b.key ? -1 : 1 )
}
