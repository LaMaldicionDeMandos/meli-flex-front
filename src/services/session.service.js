import axios from 'axios';

const MELI_APP_ID = process.env.REACT_APP_MELI_APP_ID;
const MELI_REDIRECT_URL = process.env.REACT_APP_MELI_REDIRECT_URL;
const MELI_LOGIN_URL = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${MELI_APP_ID}&redirect_uri=${MELI_REDIRECT_URL}`;
const MELI_ACCESS_TOKEN_URL = 'https://api.mercadolibre.com/oauth/token';

const GRANT_TYPE = 'authorization_code';

const MELI_SECRET = process.env.REACT_APP_MELI_SECRET;

const HEADERS = {
  accept: "application/json",
  "content-type": "application/x-www-form-urlencoded"
};

class SessionService {

  requestAccessCode() {
    window.location.replace(MELI_LOGIN_URL);
  }

  requestAccessToken(code) {
    const p = axios
      .post(
        `${MELI_ACCESS_TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${MELI_APP_ID}&client_secret=${MELI_SECRET}&code=${code}&redirect_uri=${MELI_REDIRECT_URL}`,
        {},
        { headers: HEADERS }
      )
      .then(response => response.data);
    return this.#receiveAccessToken(p).catch(e => Promise.reject(e.response.data));
  }

  getToken = () => {
    return window.localStorage.getItem("token");
  };

  #receiveAccessToken = (p) => {
    return p.then(response => {
      console.log(`Token info: ${JSON.stringify(response)}`);
      return response;
    }).then(this.#setToken)
  }

  #setToken = response => {
    window.localStorage.setItem("token", response.access_token);
    return response.access_token;
  };
}

const service = new SessionService();
export default service;
