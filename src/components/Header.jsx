import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getGravatar from '../services/gravatar';

class Header extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     score: 0,
  //   };
  // }

  // componentDidMount() {
  //   this.getScoreAtLocalStorage();
  // }

  // getScoreAtLocalStorage() {
  //   const { score } = JSON.parse(localStorage.getItem('state')).player;
  //   this.setState({ score });
  //   console.log(score);
  // }

  render() {
    const { userName, userEmail, score } = this.props;
    const gravatarSrc = getGravatar(userEmail);
    return (
      <header>
        <img
          src={ gravatarSrc }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{`Jogador: ${userName}`}</span>
        <span data-testid="header-score">
          {`Pontuação: ${score}`}
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userEmail: state.user.userEmail,
  score: state.score.score,
});

export default connect(mapStateToProps)(Header);
