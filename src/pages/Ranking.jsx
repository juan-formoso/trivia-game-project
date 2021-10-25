import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

class Ranking extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
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
