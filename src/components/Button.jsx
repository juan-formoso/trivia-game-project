import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onClick, buttonText, disabled, datatestid } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ datatestid }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: null,
  onClick: null,
};

export default Button;
