function currency(input) {
  input = Number(input)
  input = input.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `Rp.${input}`
}

module.exports = { currency }