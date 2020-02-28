module.exports = (props) => (
  `
import React from 'react'

function ${props.name} = (props) => {
  return <${props.name} />
}

export default ${props.name};
`)