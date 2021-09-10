import React, {PureComponent} from 'react'
import { ThemeContext } from './theme-context.js'

class Display extends PureComponent {
  #attentionMessage;

  constructor (props) {
    super(props);
    this.#attentionMessage = 'Внимание, дробная часть будет отброшена, возможности движка исчерпаны!';
  }

  _attentionDisplay () {
    return (
      <p className = 'error-message'>
        {this.#attentionMessage}
      </p>
    );
  }

  render() {
    const firstOperand = this.props.firstOperand || '';
    const operator = this.props.currentOperator || '';
    const secondOperator = this.props.secondOperator || '';
    const result = this.props.result || '';
    const currentOperationState = this.props.isOperationSafe;

    return (
      <ThemeContext.Consumer>
        {({theme, changeTheme}) => {
          return (
            <React.Fragment>
              <div className = 'calculator__operand-display'>
                <p className = {`calculator__operand-text ${theme.operandText}`}>
                  {firstOperand}
                </p>
              </div>
              <div className = 'calculator__operator-display'>
                <p className = 'calculator__operator-text'>
                  {operator}
                </p>
              </div>
              <div className = 'calculator__operand-display'>
                <p className = {`calculator__operand-text ${theme.operandText}`}>
                  {secondOperator}
                </p>
              </div>
              {!currentOperationState ? this._attentionDisplay() : false}
              <div className = 'calculator__result-display'>
                <p className = 'calculator__result-text'>
                  {result}
                </p>
              </div>
           </React.Fragment>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export { Display }
