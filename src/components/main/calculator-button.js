import React, { PureComponent } from 'react'

class CalculatorButton extends PureComponent {
  constructor (props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler () {
    this.props.clickHandler(this.props.value);
  }

  render () {
    const value = this.props.value;
    const theme = this.props.theme;

    return (
      <button className = { theme } type = 'button' onClick = { this.onClickHandler }>
        { value === 'Sqrt' ? '' : value }
      </button>
    );
  }

}

export { CalculatorButton }
