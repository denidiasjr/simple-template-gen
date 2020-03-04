module.exports = (props) => (
  `
import React from 'react'

const ${props.name} = (props) => {
  return <${props.name} />
}

export default ${props.name};
`)