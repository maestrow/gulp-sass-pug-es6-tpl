import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main.jsx'

let cities = [
  ['aa', 1],
  ['bb', 2],
  ['cc', 3],
]

window.onload = () => {
  ReactDOM.render(<Main name="World" cities={cities}/>, document.getElementById('app'))
}
