import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.renderQuestion = this.renderQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      indexQuestions: 0,
      colorBorder: false,
      disabled: false,
      timer: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => this.countDown(), ONE_SECOND);
  }

  countDown() {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({ colorBorder: true, disabled: true });
    }
    if (timer > 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
  }

  nextQuestion() {
    const FOUR = 4;
    const { indexQuestions } = this.state;
    if (indexQuestions < FOUR) {
      this.setState((prevState) => ({ indexQuestions: prevState.indexQuestions + 1 }));
    }
    this.setState({ timer: 30, colorBorder: false, disabled: false });
  }

  renderButtonNextQuestion() {
    const { colorBorder } = this.state;
    if (colorBorder) {
      return (
        <button
          type="button"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
        >
          Próxima pergunta
        </button>
      );
    }
  }

  renderQuestion() {
    const { questionsTrivia } = this.props;
    const { indexQuestions, colorBorder, disabled, timer } = this.state;

    return (
      <>
        <p data-testid="question-category">{questionsTrivia[indexQuestions].category}</p>
        <p data-testid="question-text">{questionsTrivia[indexQuestions].question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-answer"
          disabled={ disabled }
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
            disabled={ disabled }
            className="wrong-answer"
            onClick={ () => this.setState({ colorBorder: true }) }
            style={ colorBorder ? { border: '3px solid rgb(255, 0, 0)' } : null }
          >
            {incorrect}
          </button>
        ))}
        {`Tempo restante: ${timer} segundos`}
        {this.renderButtonNextQuestion()}
      </>
    );
  }

  render() {
    const { questionsTrivia } = this.props;
    return (
      <div>
        <Header />
        { questionsTrivia.length > 0 && this.renderQuestion() }
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questionsTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questionsTrivia: state.trivia.questions,
});

export default connect(mapStateToProps, null)(Trivia);
