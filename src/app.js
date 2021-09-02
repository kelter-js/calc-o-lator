import React, {PureComponent} from 'react'
import { Display } from './calculator-display.js'
import { generateNumbers } from './service.js'
import { CalculatorButtonsCreator } from './calculator-buttons-creator.js'
import { Constants } from './constants.js'
import { ThemeContext } from './theme-context.js'

class App extends PureComponent {
  #exceptionSign;
  #operations;

  constructor (props) {
    super(props);

    this.#exceptionSign = '.';

    this.#operations = this.props.operations;

    this.state = {
      'firstOperand': '',
      'secondOperand': '',
      'operationSign': '',
      'result': 0,
      'isCalculating': false,
    };

    this.onNumberClick = this.onNumberClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
  }

  _isValueSeparated () {
    if (this.state.isCalculating) {
      return this.state.secondOperand.includes(this.#exceptionSign);
    }
    return this.state.firstOperand.includes(this.#exceptionSign);
  }

  _renderResult () {
    const currentResult = this.state.result;
    const operation = this.state.operationSign;

    if (!operation || currentResult) {
      return currentResult;
    }

    const firstOperand = this.state.firstOperand;
    const secondOperand = this.state.secondOperand;

    return this.#operations[operation](firstOperand, secondOperand);
  }

  onNumberClick (value) {
    if (value === this.#exceptionSign && this._isValueSeparated()) {
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

  onPlusClick (operation) {
    const currentCalculation = this.state.isCalculating;

    if (!currentCalculation) {
      this.setState({
        isCalculating: !currentCalculation,
        operationSign: operation,
      });

      return;
    }

    this.setState({
      operationSign: operation,
    })
  }

  render () {
    const currentResult = this._renderResult();

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
                <Display firstOperand = {this.state.firstOperand} currentOperator = {this.state.operationSign} secondOperator = {this.state.secondOperand} result = {currentResult}/>
              </div>
              <div className = 'calculator__buttons'>
                <ul className = 'calculator__numbers-list'>
                  <CalculatorButtonsCreator numbers = {[...generateNumbers(0, 9), '.']} theme = 'calculator__number-button' handler = {this.onNumberClick} isFuncButtons = {false}/>
                </ul>
                <ul className = 'calculator__functions-list'>
                  <CalculatorButtonsCreator numbers = {Constants.getFunctionButtons} theme = 'calculator__number-button' handler = {this.onPlusClick} isFuncButtons = {false}/>
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
