class Constants {
  static #functionButtons = [
    'Clear',
    '=',
    '+',
    '-',
    '/',
    '*',
    '%',
    'Sqrt',
  ];

  static #operations = {
    '/': (a, b) => (+a) / (+b),
    '*': (a, b) => (+a) * (+b),
    '+': (a, b) => (+a) + (+b),
    '-': (a, b) => (+a) - (+b),
    '%': (a, b) => (+a) % (+b),
    'Sqrt': (value) => Math.sqrt(+value),
  }

  static get getFunctionButtons () {
    return this.#functionButtons;
  };

  static get getOperations () {
    return this.#operations;
  }

}

export { Constants }

