const REQUEST_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenApi = async () => {
  const response = await fetch(REQUEST_TOKEN_URL);
  const tokenResponse = await response.json();
  const { token } = tokenResponse;
  return token;
};

export default async function fetchQuestionsAPI() {
  const token = await fetchTokenApi();
  const responseQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await responseQuestions.json();
  localStorage.setItem('token', token);
  return questions;
}
