import axios from 'axios';
import * as _ from 'lodash';

const API_URL = process.env.REACT_APP_API_URL;
const MELI_APP_ID = process.env.REACT_APP_MELI_APP_ID;
const MELI_REDIRECT_URL = process.env.REACT_APP_MELI_REDIRECT_URL;
const MELI_LOGIN_URL = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${MELI_APP_ID}&redirect_uri=${MELI_REDIRECT_URL}`;

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class SessionService {

  requestAccessCode() {
    window.location.replace(MELI_LOGIN_URL);
  }

  requestAccessToken(code) {
    const p = axios
      .post( `${API_URL}/session/accessToken`,
        {code: code},
        { headers: HEADERS() }
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
