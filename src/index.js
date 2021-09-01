import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { ErrorCatcher } from './error.js'
import { operations } from './operations.js'
import './sass/style.sass'

render (
  <ErrorCatcher>
    <App operations = {operations}/>
  </ErrorCatcher>,
  document.querySelector('.root')
);
