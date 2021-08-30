import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { ErrorCatcher } from './error.js'
import './sass/style.sass'

render (
  <ErrorCatcher>
    <App />
  </ErrorCatcher>,
  document.querySelector('.root')
);
