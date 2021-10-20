import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onclick, buttonText, disabled, datatestid } = this.props;
    return (
      <button
        type="button"
        onClick={ onclick }
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
  disabled: PropTypes.bool.isRequired,
  onclick: PropTypes.func.isRequired,
};

export default Button;
