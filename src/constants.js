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

  static get getFunctionButtons () {
    return this.#functionButtons;
  };
}

export { Constants }

