const operations = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '%': (a, b) => a % b,
  'sqrt': (value) => Math.sqrt(value),
}

export { operations }
