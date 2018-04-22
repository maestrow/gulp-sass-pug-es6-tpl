import React from 'react'

export default props => (
  <div>
    <span style={{'background-color': '#324114'}}>{props.name}</span>
    <span>{props.population}</span>
  </div>
)