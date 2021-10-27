import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    const {
      type, value, onChange, name, placeholder, label, datatestid, className,
    } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          id={ name }
          type={ type }
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
          name={ name }
          data-testid={ datatestid }
          className={ className }
        />
      </label>
    );
  }
}

Input.propTypes = {
  datatestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Input;
