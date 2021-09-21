import React, { PureComponent } from 'react'
import { ChangeThemeButton } from './change-theme-button.js'

class Header extends PureComponent {
  render () {
    return (
      <header className = 'page-header'>
        <div className = 'container'>
          <h1 className = 'visually-hidden'>
            Калькулятор для удобного вычисления.
          </h1>
          <ChangeThemeButton />
        </div>
      </header>
    );
  }
}

export { Header }
