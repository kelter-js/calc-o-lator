import React, { PureComponent } from 'react'
import { generateNumbers } from '../../service.js'
import { Display } from './calculator-display.js'
import { CalculatorButtonsCreator } from './calculator-buttons-creator.js'
import { ThemeContext } from '../../theme-context.js'

class Calculator extends PureComponent {
  #exceptionSigns;
  #operations;
  #numbers;
  #exceptionKeys;
  #minFractional;
  #allowedFuncKeys;
  #averageMaxLengthOperand;

  constructor (props) {
    super(props);

    this.onNumberClick = this.onNumberClick.bind(this);
    this.onFunctionClick = this.onFunctionClick.bind(this);
    this._calculate = this._calculate.bind(this);
    this._clear = this._clear.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onBackspaceButton = this._onBackspaceButton.bind(this);

    this.#exceptionSigns = [
      '.',
      'Clear',
      '=',
    ];

    this.#operations = this.props.operations;
    this.#minFractional = 5;
    this.#averageMaxLengthOperand = 16;

    this.#numbers = [...generateNumbers(0, 9), '.'];
    this.#allowedFuncKeys = [...this.props.funcButtons, 'Enter', 'Backspace', 'Escape'];

    this.state = {
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'isCalculating': false,
      'isOperationSafe': true,
    };

    this.#exceptionKeys = {
      'Escape': this._clear,
      'Enter': this._calculate,
      'Backspace': this._onBackspaceButton,
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this._onKeyDown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  _operateKeydown (key) {
    this.#exceptionKeys[key] ? this.#exceptionKeys[key]() : (this.#numbers.includes(key) ? this.onNumberClick(key) : this.onFunctionClick(key));
  }

  _onKeyDown (e) {
    const target = e.key;

    if (!(this.#allowedFuncKeys.includes(target) || this.#numbers.includes(target))) {
      return;
    }

    if (target === this.#exceptionSigns[0]) {
      if (this.state.isCalculating && !this.state.secondOperand) {
        return;
      }

      if (!this.state.firstOperand) {
        return;
      }
    }

    this._operateKeydown(target);
  }

  _deleteLastSymbol (value) {
    const stringValue = String(value);
    return Number(stringValue.slice(0, stringValue.length - 1));
  }

  _onBackspaceButton () {
    const safeOperand = this.state.isCalculating ? this._deleteLastSymbol(this.state.secondOperand) : this._deleteLastSymbol(this.state.firstOperand);

    this.state.isCalculating ? this.setState({
      'secondOperand': safeOperand,
      'isOperationSafe': this.state.isOperationSafe ? this._isNumberSafe(safeOperand) && (safeOperand.length <= this.#averageMaxLengthOperand) : this.state.isOperationSafe,
    }) : this.setState({
      'firstOperand': safeOperand,
      'isOperationSafe': this._isNumberSafe(safeOperand) && (safeOperand.length <= this.#averageMaxLengthOperand),
    });
  }

  _isValueSeparated () {
    const secondOperand = this.state.secondOperand;
    const firstOperand = this.state.firstOperand;
    const separator = this.#exceptionSigns[0];

    return this.state.isCalculating ? String(secondOperand).includes(separator) : String(firstOperand).includes(separator);
  }

  _operate (operation, a, b) {
    const result = this.#operations[operation](a, b);

    return isFinite(result) ? result : 0;
  }

  _fixNumber (value) {
    const fractional = String(value).split(this.#exceptionSigns[0]);

    return (fractional[1] && fractional[1].length >= this.#minFractional) ? (+value).toFixed(this.#minFractional) : value;
  }

  _calculateResult () {
    const operation = this.state.operationSign;
    const firstOperand = this.state.firstOperand;

    if (!operation) {
      return firstOperand;
    }

    const secondOperand = this.state.secondOperand;

    return this._roundResult(this._operate(operation, firstOperand, secondOperand));
  }

  _checkMaxLengthSeparated () {
    const separated = this.state.isCalculating ? String(this.state.secondOperand).split(this.#exceptionSigns[0]) : String(this.state.firstOperand).split(this.#exceptionSigns[0]);

    return separated[1] ? (separated[1].length + 1) >= this.#minFractional : false;
  }

  _isNumberSafe (value) {
    return value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
  }

  _deleteLastSymbolFromNumber (value) {
    const fractional = String(value).split(this.#exceptionSigns[0]);

    return fractional[1] ? this._deleteLastSymbol(fractional[0].join('')) + `${this.#exceptionSigns[0]}` + fractional[1].join('') : this._deleteLastSymbol(value);
  }

  _roundResult (value) {
    const fixedValue = this._fixNumber(value);

    return this._isNumberSafe(fixedValue) ? fixedValue : this._deleteLastSymbol(fixedValue);
  }

  _getRoundedValue () {
    const res = this.state.isCalculating ? String(this.state.secondOperand).split('.') : String(this.state.secondOperand).split('.');

    return this.state.isCalculating ? (res[1] ? res[0].length + 1 : this.state.secondOperand.length + 1) : (res[1] ? res[0].length + 1 : this.state.firstOperand.length + 1);
  }

  onNumberClick (value) {
    if (value === this.#exceptionSigns[0] && this._isValueSeparated()) {
      return;
    }

    if (this._checkMaxLengthSeparated()) {
      return;
    }

    (this.state.isCalculating) ? this.setState({
      'secondOperand': this._roundResult(this.state.secondOperand + value),
      'isOperationSafe': this._isNumberSafe(this.state.secondOperand + value) && (this._getRoundedValue() <= this.#averageMaxLengthOperand) && this._isNumberSafe(this._calculateResult())
    }) : this.setState({
      'firstOperand': this._roundResult(this.state.firstOperand + value),
      'isOperationSafe': this._isNumberSafe(this.state.firstOperand + value) && (this._getRoundedValue() <= this.#averageMaxLengthOperand),
    });
  }

  _checkValueForException (value) {
    return this.#exceptionSigns.includes(value);
  }

  _getExceptionFunc (value) {
    return value === this.#exceptionSigns[1] ? this._clear() : this._calculate();
  }

  onFunctionClick (operation) {
    if (!this.state.firstOperand) {
      return;
    }

    const sign = this.state.operationSign;

    if (this._checkValueForException(operation)) {
      this._getExceptionFunc(operation);

      return;
    }

    if (sign) {
      this.setState({
        'firstOperand': String(this._roundResult(this._operate(sign, this.state.firstOperand, this.state.secondOperand))),
        'secondOperand': '',
        'operationSign': operation,
        'isCalculating': true,
      });

      return;
    }

    (!this.state.isCalculating) ? this.setState({
      isCalculating: true,
      operationSign: operation,
    }) : this.setState({
      operationSign: operation,
    });
  }

  _clear () {
    this.setState({
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'isCalculating': false,
      'isOperationSafe': true,
    });
  }

  _calculate () {
    const operation = this.state.operationSign;
    const firstOperand = this.state.firstOperand;
    const secondOperand = this.state.secondOperand;

    (!secondOperand) ? this.setState({
      'firstOperand': firstOperand,
      'secondOperand': '',
      'operationSign': '',
      'isCalculating': false,
    }) : this.setState({
      'firstOperand': String(this._roundResult(this._operate(operation, firstOperand, secondOperand))),
      'secondOperand': '',
      'operationSign': '',
      'isCalculating': false,
    });
  }

  render () {
    const currentResult = this._calculateResult();

    return (
      <section className = 'calculator container'>
        <h2 className = 'visually-hidden'>Интерфейс калькулятора.</h2>
        <ThemeContext.Consumer>
          {({theme}) => {
            return (
              <>
                <div className = {`calculator__pannel-wrapper ${theme.calculatorPanel}`}>
                  <div className = 'calculator__display'>
                    <Display isOperationSafe = {this.state.isOperationSafe} firstOperand = {this.state.firstOperand} currentOperator = {this.state.operationSign} secondOperator = {this.state.secondOperand} result = {`${currentResult}`}/>
                  </div>
                  <div className = 'calculator__buttons'>
                    <ul className = 'calculator__numbers-list'>
                      <CalculatorButtonsCreator numbers = {this.#numbers} theme = 'calculator__number-button' handler = {this.onNumberClick} isFuncButtons = {false}/>
                    </ul>
                    <ul className = 'calculator__functions-list'>
                      <CalculatorButtonsCreator numbers = {this.props.funcButtons} theme = 'calculator__number-button' handler = {this.onFunctionClick} isFuncButtons = {false}/>
                    </ul>
                  </div>
                </div>
              </>
            );
          }}
        </ThemeContext.Consumer>
      </section>
    );
  }

}

export { Calculator }
