import { ThemeContext } from '../../theme-context.js'
import React from 'react'

class ChangeThemeButton extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {({theme, changeTheme}) => <button className = {`page-header__change-theme ${theme.changeButton}`} onClick = { changeTheme }/>}
      </ThemeContext.Consumer>
    );
  }
}

export { ChangeThemeButton }
