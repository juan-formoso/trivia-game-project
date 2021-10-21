import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getGravatar from '../services/gravatar';

class Header extends Component {
  render() {
    const { userName, userEmail } = this.props;
    const gravatarSrc = getGravatar(userEmail);
    return (
      <header>
        <img
          src={ gravatarSrc }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{`Jogador: ${userName}`}</span>
        <span data-testid="header-score">Pontuação: 0</span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.user.userName,
  userEmail: store.user.userEmail,
});

export default connect(mapStateToProps)(Header);
