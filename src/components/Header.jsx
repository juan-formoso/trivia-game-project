import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getGravatar from '../services/gravatar';

class Header extends Component {
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
        <span>Pontuação: </span>
        <span data-testid="header-score">
          {score}
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
