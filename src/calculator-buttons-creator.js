import React, {PureComponent} from 'react'
import { CalculatorButton } from './calculator-button.js'

class CalculatorButtonsCreator extends PureComponent {

  constructor (props) {
    super(props);

    this.exceptions = {
      '0': 'calculator__buttons-zero',
      'Sqrt': 'calculator__sqrt-func',
    };
  }

  render () {
    const currentTheme = this.props.theme;

    const handler = this.props.handler;
    const currentNumbers = this.props.numbers.map((number, index) => {
      if (this.exceptions[`${number}`]) {
        return (
          <CalculatorButton key = {index} value = {number} clickHandler = {handler} theme = {`${currentTheme} ${this.exceptions[number]}`}/>
        );
      }

      return (
        <CalculatorButton key = {index} clickHandler = {handler} value = {number} theme = {currentTheme}/>
      );
    });

    return (
      currentNumbers
    );
  }

}

export { CalculatorButtonsCreator }
