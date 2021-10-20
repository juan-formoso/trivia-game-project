const REQUEST_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenApi = async () => {
  const response = await fetch(REQUEST_TOKEN_URL);
  const tokenResponse = await response.json();
  const { token } = tokenResponse;
  localStorage.setItem('token', token);
};

export default fetchTokenApi;
