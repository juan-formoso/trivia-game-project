import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  handleClick() {
    const { userName, userEmail } = this.state;
    if (userName.length === 0 || userEmail.length === 0) return true;
    return false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
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
          disabled={ this.handleClick() }
          datatestid="btn-play"
          onclick={ this.onclick }
        />
      </>
    );
  }
}

export default Login;
