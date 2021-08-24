import React, {PureComponent} from 'react'

class Display extends PureComponent {
  render() {
    const firstOperand = this.props.firstOperand || '';
    const operator = this.props.currentOperator || '';
    const secondOperator = this.props.secondOperator || '';
    const result = this.props.result || '';

    return (
      <React.Fragment>
        <div className = 'calculator__operand-display'>
          <p className = 'calculator__operand-text'>
            {firstOperand}
          </p>
        </div>
        <div className = 'calculator__operator-display'>
          <p className = 'calculator__operator-text'>
            {operator}
          </p>
        </div>
        <div className = 'calculator__operand-display'>
          <p className = 'calculator__operand-text'>
            {secondOperator}
          </p>
        </div>
        <div className = 'calculator__result-display'>
          <p className = 'calculator__result-text'>
            {result}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export { Display }
