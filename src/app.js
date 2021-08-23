import React, {PureComponent} from 'react'

class App extends PureComponent {

  render () {
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

              </div>
              <div className = 'calculator__buttons'>
                <ul className = 'calculator__numbers-list'>

                </ul>
                <ul className = 'calculator__functions-list'>

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
