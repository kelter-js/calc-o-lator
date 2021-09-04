const operations = {
  '/': (a, b) => (+a) / (+b),
  '*': (a, b) => (+a) * (+b),
  '+': (a, b) => (+a) + (+b),
  '-': (a, b) => (+a) - (+b),
  '%': (a, b) => (+a) % (+b),
  'Sqrt': (value) => Math.sqrt(+value),
}

export { operations }
