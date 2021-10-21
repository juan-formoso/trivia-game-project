import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchTokenApi from '../services/trivia_API';
import { savePlayerInfos } from '../redux/actions';

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
    const { history, dispatchPlayerInfo } = this.props;
    const { userName, userEmail } = this.state;
    dispatchPlayerInfo({ userName, userEmail });
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
        <Link to="/settings">
          <Button
            buttonText="Configurações"
            datatestid="btn-settings"
          />
        </Link>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatchPlayerInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPlayerInfo: (login) => dispatch(savePlayerInfos(login)),
});

export default connect(null, mapDispatchToProps)(Login);
