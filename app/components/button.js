import Component from '@glimmer/component';
import PropTypes from 'prop-types';
import checkPropTypes from '../utils/check-proptypes';
import classNames from 'classnames'

export default class ButtonComponent extends Component {
  constructor(owner, args) {
    super(owner, args);

    checkPropTypes(ButtonComponent, args)
  }

  get className() {
    return classNames({
      btn: true,
      'btn-sm': this.args.size === 'small',
      'btn-lg': this.args.size === 'large'
    })
  }
}

ButtonComponent.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  anotherThing: PropTypes.number.isRequired
}
