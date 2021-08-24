import React, {PureComponent} from 'react'

class Display extends PureComponent {
  render() {
    const firstOperand = this.props.firstOperand || '';
    const operator = this.props.currentOperator || '';
    const secondOperator = this.props.secondOperator || '';
    const result = this.props.result || '';

    return (
      <React.Fragment>
        <div className = 'calculator__first-operator'>
          {firstOperand}
        </div>
        <p className = 'calculator__operator'>
          {operator}
        </p>
        <div className = 'calculator__second-operator'>
          {secondOperator}
        </div>
        <div className = 'calculator__result'>
          {result}
        </div>
      </React.Fragment>
    );
  }
}

export { Display }
