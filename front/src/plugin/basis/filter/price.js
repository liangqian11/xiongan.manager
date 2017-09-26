//---------------------------------------------------------------------------- Exports
export default function (value, format) {
  if (!format) {
    format = 2
  }
  return parseFloat(value).toFixed(format)
}