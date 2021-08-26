import React, {PureComponent} from 'react'

class CalculatorButton extends PureComponent {
  render () {
    const value = this.props.value;
    const theme = this.props.theme;
    return (
      <button className = {theme} type = 'button'>
        {value}
      </button>
    );
  }
}

export { CalculatorButton }
