import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    this.getAssertionsAndScore(assertions, score);
  }

  getAssertionsAndScore(assertions, score) {
    this.setState({
      assertions,
      score,
    });
  }

  render() {
    const { assertions, score } = this.state;
    const MANDOU_BEM = 3;
    return (
      <>
        <div data-testid="feedback-text">Feedback</div>
        <Header />
        <h2 data-testid="feedback-text">
          { assertions >= MANDOU_BEM ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <h3>De 5 questões você acertou:</h3>
        <span data-testid="feedback-total-question">{assertions}</span>
        <h3>Sua pontuação foi de:</h3>
        <span data-testid="feedback-total-score">{`${score} pontos`}</span>
      </>
    );
  }
}

export default Feedback;
