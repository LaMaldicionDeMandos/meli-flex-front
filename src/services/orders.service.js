import axios from 'axios';
import * as _ from 'lodash';

import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class OrdersService {

  findOrders() {
    return axios
      .get( `${API_URL}/orders`,
        { headers: HEADERS({Authorization: sessionService.getToken()})}
      )
      .then(response => response.data);
  }
}

const service = new OrdersService();
export default service;
