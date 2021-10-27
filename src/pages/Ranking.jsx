import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

class Ranking extends Component {
  getRankingAtLocalStorage() {
    return JSON.parse(localStorage.getItem('ranking'));
  }

  renderRanking() {
    const arrayRanking = this.getRankingAtLocalStorage();
    return (
      <ol>
        {arrayRanking && arrayRanking.sort((a, b) => b.score - a.score)
          .map(({ name, score, picture }, index) => (
            <li key={ index }>
              <div className="gravatar">
                <img
                  src={ picture }
                  alt="imagem gravatar"
                  data-testid="header-profile-picture"
                />
              </div>
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </li>))}
      </ol>
    );
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.renderRanking()}
        <Link to="/">
          <Button
            buttonText="Tela inicial"
            datatestid="btn-go-home"
          />
        </Link>
      </>
    );
  }
}

export default Ranking;
