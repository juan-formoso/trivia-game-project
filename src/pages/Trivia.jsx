import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.renderQuestion = this.renderQuestion.bind(this);

    this.state = {
      indexQuestions: 0,
      colorBorder: false,
    };
  }

  renderQuestion() {
    const { questionsTrivia } = this.props;
    const { indexQuestions, colorBorder } = this.state;

    return (
      <>
        <p data-testid="question-category">{questionsTrivia[indexQuestions].category}</p>
        <p data-testid="question-text">{questionsTrivia[indexQuestions].question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-answer"
          onClick={ () => this.setState({ colorBorder: true }) }
          style={ colorBorder ? { border: '3px solid rgb(6, 240, 15)' } : null }
        >
          {questionsTrivia[indexQuestions].correct_answer}
        </button>
        {questionsTrivia[indexQuestions].incorrect_answers.map((incorrect, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className="wrong-answer"
            onClick={ () => this.setState({ colorBorder: true }) }
            style={ colorBorder ? { border: '3px solid rgb(255, 0, 0)' } : null }
          >
            {incorrect}
          </button>
        ))}
      </>
    );
  }

  render() {
    const { questionsTrivia } = this.props;
    console.log(questionsTrivia);
    return (
      <div>
        <Header />
        <h4 data-testid="question-category">
          { questionsTrivia.length > 0 && this.renderQuestion() }
        </h4>
      </div>
    );
  }
}

Trivia.propTypes = {
  questionsTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questionsTrivia: state.trivia.questions,
});

export default connect(mapStateToProps, null)(Trivia);
