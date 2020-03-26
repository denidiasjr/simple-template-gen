module.exports = (variables) => (
  `
import React from 'react';
import content from '${variables.package}';

const ${variables.name} = (props) => {
  return <${variables.name} />
}

export default ${variables.name};
`)