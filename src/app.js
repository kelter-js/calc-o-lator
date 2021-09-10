import React, {PureComponent} from 'react'
import { ThemeContext } from './theme-context.js'
import { Header } from './header.js'
import { Body } from './body.js'
import { Footer } from './footer.js'

class App extends PureComponent {
  #themes;
  #mainBody;

  constructor (props) {
    super(props);

    this.#themes = {
      'light': {
        'body': 'page-body-light',
        'changeButton': 'page-header__change-theme--light',
        'calculatorPanel': 'calculator__pannel-wrapper--light',
        'operandText': 'calculator__operand-text--light',
        'button': 'calculator__number-button--light',
        'footerText': 'page-footer__text--light',
      },

      'dark': {
        'body': 'page-body-dark',
        'changeButton': 'page-header__change-theme--dark',
        'calculatorPanel': 'calculator__pannel-wrapper--dark',
        'operandText': 'calculator__operand-text--dark',
        'button': 'calculator__number-button--dark',
        'footerText': 'page-footer__text--dark',
      },
    }

    this.#mainBody = document.body;

    this._toggleTheme = this._toggleTheme.bind(this);

    this.state = {
      'theme': this.#themes.light,
      'changeTheme': this._toggleTheme,
    }

  }

  _toggleTheme () {
    this.setState({
      'theme': (this.state.theme === this.#themes.dark) ? this.#themes.light : this.#themes.dark,
    });
  }

  _toggleBodyTheme () {
    this.#mainBody.className = '';
    this.#mainBody.classList.add(this.state.theme.body);
  }

  render () {
    this._toggleBodyTheme();

    return (
      <React.Fragment>
        <ThemeContext.Provider value = { this.state }>
          <Header/>
          <Body/>
          <Footer/>
        </ThemeContext.Provider>
      </React.Fragment>
    )
  }
}

export { App }
