import React, {PureComponent} from 'react'
import { ThemeContext } from './theme-context.js'

class Footer extends PureComponent {
  render () {
    return (
      <ThemeContext.Consumer>
        {({theme, changeTheme}) => {
          return (
            <>
              <footer>
                <section className = 'page-footer container'>
                  <h2 className = 'visually-hidden'>
                    Сведения об авторе
                  </h2>
                  <p className = {`page-footer__text ${theme.footerText}`}>
                    Создано с использованием React.
                  </p>
                  <p className = {`page-footer__text ${theme.footerText}`}>
                    Автор - kelter.
                  </p>
                </section>
              </footer>
            </>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

}

export { Footer }
