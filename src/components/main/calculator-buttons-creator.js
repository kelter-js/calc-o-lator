import React, { PureComponent } from 'react'
import { CalculatorButton } from './calculator-button.js'
import { ThemeContext } from '../../theme-context.js'

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
          <ThemeContext.Consumer key = { index }>
            {({theme, changeTheme}) => {
              return (
                <>
                  <CalculatorButton value = { number } clickHandler = { handler } theme = {`${currentTheme} ${this.exceptions[number]} ${theme.button}`}/>
                </>
              );
            }}
          </ThemeContext.Consumer>
        );
      }

      return (
        <ThemeContext.Consumer key = {index}>
            {({theme, changeTheme}) => {
              return (
                <>
                  <CalculatorButton clickHandler = {handler} value = {number} theme = {`${currentTheme} ${theme.button}`}/>
                </>
              );
            }}
        </ThemeContext.Consumer>
      );
    });

    return (
      currentNumbers
    );
  }

}

export { CalculatorButtonsCreator }
