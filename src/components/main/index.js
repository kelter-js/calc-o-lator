import React, { PureComponent } from 'react'
import { Calculator } from './calculator.js'
import { Constants } from '../../constants.js'

class Main extends PureComponent {
  render () {
    return (
      <main className = 'page-main'>
        <Calculator operations = { Constants.getOperations } funcButtons = { Constants.getFunctionButtons }/>
      </main>
    );
  }
}

export { Main }
