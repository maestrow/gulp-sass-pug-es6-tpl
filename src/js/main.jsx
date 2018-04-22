import React from 'react'
import { hot } from 'react-hot-loader'
import City from './city.jsx'

const Main = (props) => {
  let cities = props.cities.map(i => <City name={i[0]} population={i[1]} />)
  return (
    <div>
      <div>Hello, {props.name}</div>
      <div>
        {cities}
      </div>
    </div>
  )
}

export default hot(module)(Main)