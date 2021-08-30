import React from 'react'

const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

export { ThemeContext }
