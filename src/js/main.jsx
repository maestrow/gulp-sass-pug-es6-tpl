import React from 'react'
import City from './city.jsx'

export default ((props) => {
  let cities = props.cities.map(i => <City name={i[0]} population={i[1]} />)
  return (
    <div>
      <div>Hello, {props.name}</div>
      <div>
        {cities}
      </div>
    </div>
  )
})