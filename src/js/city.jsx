import React from 'react'

export default props => (
  <div>
    <span style={{'background-color': '#127357'}}>{props.name}</span>
    <span>{props.population} - </span>
  </div>
)