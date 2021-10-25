import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getScore } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();

    this.renderQuestion = this.renderQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.scoreEachQuestion = this.scoreEachQuestion.bind(this);

    this.state = {
      indexQuestions: 0,
      colorBorder: false,
      disabled: false,
      timer: 30,
      score: 0,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => this.countDown(), ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  scoreEachQuestion() {
    const { timer, indexQuestions } = this.state;
    const { questionsTrivia } = this.props;
    let scorePerQuestion = 0;
    const TEN = 10;
    const scoreRules = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const { difficulty } = questionsTrivia[indexQuestions];
    if (difficulty === 'hard') {
      scorePerQuestion = TEN + (timer * scoreRules.hard);
    } else if (difficulty === 'medium') {
      scorePerQuestion = TEN + (timer * scoreRules.medium);
    } else {
      scorePerQuestion = TEN + (timer * scoreRules.easy);
    }
    return scorePerQuestion;
  }

  handleScore(className) {
    const { receiveScore } = this.props;
    const scorePerQuestion = this.scoreEachQuestion();
    if (className === 'correct-answer') {
      this.setState((prevState) => ({ score: prevState.score + scorePerQuestion }));
      receiveScore(scorePerQuestion);
      const objectState = JSON.parse(localStorage.getItem('state'));
      objectState.player.score += scorePerQuestion;
      objectState.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(objectState));
    }
  }

  handleClick({ target }) {
    const { className } = target;
    this.setState({ colorBorder: true, timer: 30 });
    this.handleScore(className);
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
    const { history } = this.props;
    if (indexQuestions < FOUR) {
      this.setState((prevState) => ({ indexQuestions: prevState.indexQuestions + 1 }));
    }
    if (indexQuestions === FOUR) history.push('/feedback');
    this.setState({ timer: 30, colorBorder: false, disabled: false });
  }

  encodeUtf8(string) {
    // função do Lucas Rodrigues Turma 08
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  renderButtonNextQuestion() {
    const { colorBorder, indexQuestions } = this.state;
    const FOUR = 4;
    if (colorBorder) {
      return (
        <button
          type="button"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
        >
          {indexQuestions === FOUR ? 'Finalizar jogo' : 'Próxima pergunta'}
        </button>
      );
    }
  }

  renderCorrectAnswer(answer) {
    const { disabled, colorBorder } = this.state;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        className="correct-answer"
        disabled={ disabled }
        onClick={ (event) => this.handleClick(event) }
        style={ colorBorder ? { border: '3px solid rgb(6, 240, 15)' } : null }
      >
        {answer}
      </button>);
  }

  renderWrongAnswers(answer, index) {
    const { disabled, colorBorder } = this.state;
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        disabled={ disabled }
        className="wrong-answer"
        onClick={ (event) => this.handleClick(event) }
        style={ colorBorder ? { border: '3px solid rgb(255, 0, 0)' } : null }
      >
        {answer}
      </button>);
  }

  renderQuestion() {
    const { questionsTrivia } = this.props;
    const { indexQuestions, colorBorder, timer } = this.state;
    const decodedQuestion = this.encodeUtf8(questionsTrivia[indexQuestions].question);
    const randomAnswers = [
      questionsTrivia[indexQuestions].correct_answer,
      ...questionsTrivia[indexQuestions].incorrect_answers,
    ];
    const sortedAnswers = randomAnswers.sort();
    const correctAnswer = questionsTrivia[indexQuestions].correct_answer;

    return (
      <>
        <p data-testid="question-category">{questionsTrivia[indexQuestions].category}</p>
        <p data-testid="question-text">
          {decodedQuestion}
        </p>
        {sortedAnswers.map((string) => this.encodeUtf8(string)).map((answer, index) => (
          answer === correctAnswer
            ? this.renderCorrectAnswer(answer) : this.renderWrongAnswers(answer, index)
        ))}
        {colorBorder ? null : `Tempo restante: ${timer} segundos`}
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
  receiveScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionsTrivia: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  receiveScore: (state) => dispatch(getScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
