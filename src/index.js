import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { ErrorCatcher } from './error.js'
import { operations } from './operations.js'
import { Constants } from './constants.js'
import './sass/style.sass'

render (
  <ErrorCatcher>
    <App operations = {operations} funcButtons = {Constants.getFunctionButtons}/>
  </ErrorCatcher>,
  document.querySelector('.root')
);
