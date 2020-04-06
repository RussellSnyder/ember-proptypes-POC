import Component from '@glimmer/component';
import PropTypes from 'prop-types';
import checkPropTypes from '../utils/check-proptypes';

export default class ButtonComponent extends Component {
  constructor(owner, args) {
    super(owner, args);

    checkPropTypes(ButtonComponent, args)
  }
}

ButtonComponent.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  anotherThing: PropTypes.number.isRequired
}
