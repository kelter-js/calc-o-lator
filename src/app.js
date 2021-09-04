import React, {PureComponent} from 'react'
import { Display } from './calculator-display.js'
import { generateNumbers } from './service.js'
import { CalculatorButtonsCreator } from './calculator-buttons-creator.js'
import { Constants } from './constants.js'
import { ThemeContext } from './theme-context.js'
import { operations } from './operations.js'

class App extends PureComponent {
  #exceptionSigns;
  #operations;

  constructor (props) {
    super(props);

    this.#exceptionSigns = [
      '.',
      'Clear',
      '=',
    ];

    this.#operations = this.props.operations;

    this.state = {
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'result': 0,
      'isCalculating': false,
    };

    this.onNumberClick = this.onNumberClick.bind(this);
    this.onFunctionClick = this.onFunctionClick.bind(this);
    this._calculate = this._calculate.bind(this);
    this._clear = this._clear.bind(this);
  }

  _checkValueForSign (sign, value) {
    return value.includes(sign);
  }

  _isValueSeparated () {
    const secondOperand = this.state.secondOperand;
    const firstOperand = this.state.firstOperand;
    const separator = this.#exceptionSigns[0];

    return this._isCalculating() ? this._checkValueForSign(separator, secondOperand) : this._checkValueForSign(separator, firstOperand);
  }

  _operate (operation, a, b) {
    const result = this.#operations[operation](a, b);

    return isFinite(result) ? result : 0;
  }

  _calculateResult () {
    const currentResult = this.state.result;
    const operation = this.state.operationSign;

    if (!operation || currentResult) {
      return currentResult;
    }

    const firstOperand = this.state.firstOperand;
    const secondOperand = this.state.secondOperand;

    return this._operate(operation, firstOperand, secondOperand);
  }

  onNumberClick (value) {
    if (value === this.#exceptionSigns[0] && this._isValueSeparated()) {
      return;
    }

    if (this.state.isCalculating) {
      this.setState({
        'secondOperand': this.state.secondOperand + value,
      });
      return;
    }

    this.setState({
      'firstOperand': this.state.firstOperand + value,
    });
  }

  _haveNoFirstValue () {
    const firstOperand = this.state.firstOperand;

    return !firstOperand;
  }

  _isCalculating () {
    const currentCalculation = this.state.isCalculating;

    return currentCalculation;
  }

  _checkValueForException (value) {
    return this.#exceptionSigns.includes(value);
  }

  _getExceptionFunc (value) {

    return value === this.#exceptionSigns[1] ? this._clear() : this._calculate();
  }

  onFunctionClick (operation) {
    if (this._checkValueForException(operation)) {
      this._getExceptionFunc(operation);

      return;
    }

    if (this._haveNoFirstValue()) {
      return;
    }

    if (!this._isCalculating()) {
      this.setState({
        isCalculating: true,
        operationSign: operation,
      });

      return;
    }

    this.setState({
      operationSign: operation,
    })
  }

  _clear () {
    this.setState({
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'result': 0,
      'isCalculating': false,
    });
  }

  _calculate () {
    const operation = this.state.operationSign;
    const firstOperand = this.state.firstOperand;
    const secondOperand = this.state.secondOperand;

    if (!secondOperand) {
      this.setState({
        'firstOperand': '',
        'secondOperand': '',
        'operationSign': '',
        'result': firstOperand,
        'isCalculating': false,
      });
      return;
    }

    this.setState({
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'result': this._operate(operation, firstOperand, secondOperand),
      'isCalculating': false,
    });
  }

  render () {
    const currentResult = this._calculateResult();

    return (
      <React.Fragment>
        <header className = 'page-header'>
          <h1 className = 'visually-hidden'>
            Калькулятор для удобного вычисления.
          </h1>
        </header>
        <main className = 'page-main'>
          <section className = 'calculator container'>
            <h2 className = 'visually-hidden'>
              Интерфейс калькулятора.
            </h2>
            <div className = 'calculator__pannel-wrapper'>
              <div className = 'calculator__display'>
                <Display firstOperand = {this.state.firstOperand} currentOperator = {this.state.operationSign} secondOperator = {this.state.secondOperand} result = {`${currentResult}`}/>
              </div>
              <div className = 'calculator__buttons'>
                <ul className = 'calculator__numbers-list'>
                  <CalculatorButtonsCreator numbers = {[...generateNumbers(0, 9), '.']} theme = 'calculator__number-button' handler = {this.onNumberClick} isFuncButtons = {false}/>
                </ul>
                <ul className = 'calculator__functions-list'>
                  <CalculatorButtonsCreator numbers = {Constants.getFunctionButtons} theme = 'calculator__number-button' handler = {this.onFunctionClick} isFuncButtons = {false}/>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <section className = 'page-footer container'>
            <h2 className = 'visually-hidden'>
              Сведения об авторе
            </h2>
            <p className = 'page-footer__text'>
              Создано с использованием React.
            </p>
            <p className = 'page-footer__text'>
              Автор - kelter.
            </p>
          </section>
        </footer>
      </React.Fragment>
    )
  }
}

export { App }
