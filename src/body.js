import React, {PureComponent} from 'react'
import { Calculator } from './calculator.js'
import { operations } from './operations.js'
import { Constants } from './constants.js'

class Body extends PureComponent {

  render () {
    return (
      <main className = 'page-main'>
        <Calculator operations = {operations} funcButtons = {Constants.getFunctionButtons}/>
      </main>
    );
  }

}

export { Body }
