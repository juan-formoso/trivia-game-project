import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { savePlayerInfos, fetchQuestions } from '../redux/actions';
import logo from '../trivia.png';

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

  async handleClick() {
    const { history, dispatchPlayerInfo, receiveQuestions } = this.props;
    const { userName, userEmail } = this.state;
    dispatchPlayerInfo({ userName, userEmail });
    receiveQuestions();
    history.push('/trivia');
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
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
          onClick={ this.handleClick }
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
  dispatchPlayerInfo: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  receiveQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPlayerInfo: (login) => dispatch(savePlayerInfos(login)),
  receiveQuestions: () => dispatch(fetchQuestions()),
});

export default connect(null, mapDispatchToProps)(Login);
