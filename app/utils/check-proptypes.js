import PropTypes from 'prop-types';

export default function checkProptypes(Component, args) {
  if (!args) { return; }
  if (!Component.propTypes) { return; }

  const props = {};
  Object.keys(Component.propTypes).forEach(prop => {
    props[prop] = args[prop]
  })

  PropTypes.checkPropTypes(Component.propTypes, props, 'prop', Component.name) 
}
