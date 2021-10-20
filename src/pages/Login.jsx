import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchTokenApi from '../services/trivia_API';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  handleButton() {
    const { userName, userEmail } = this.state;
    if (userName.length === 0 || userEmail.length === 0) return true;
    return false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { history } = this.props;
    fetchTokenApi();
    history.push('/trivia');
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <>
        <Input
          label="Nome:"
          type="text"
          name="userName"
          value={ userName }
          onChange={ this.handleChange }
          placeholder="Digite seu nome"
          datatestid="input-player-name"
        />
        <Input
          label="E-mail:"
          type="email"
          name="userEmail"
          value={ userEmail }
          onChange={ this.handleChange }
          placeholder="Digite seu e-mail"
          datatestid="input-gravatar-email"
        />
        <Button
          buttonText="Jogar"
          disabled={ this.handleButton() }
          datatestid="btn-play"
          onclick={ this.handleClick }
        />
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
