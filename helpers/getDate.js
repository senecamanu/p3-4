function getDate(input) {
  return `${input.getDate()}/ ${input.getMonth()}/ ${input.getFullYear()}`
}

module.exports = { getDate }