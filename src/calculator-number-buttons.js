import React, {PureComponent} from 'react'
import { CalculatorButton } from './calculator-button.js'

class CalculatorNumberButtons extends PureComponent {

  render () {
    const currentNumbers = this.props.numbers.map((number, index) => {
      if (number === 0) return <CalculatorButton key = {index} value = {number} theme = 'calculator__number-button zero'/>
      return <CalculatorButton key = {index} value = {number} theme = 'calculator__number-button'/>;
    });

    return (
      currentNumbers
    );
  }

}

export { CalculatorNumberButtons }
