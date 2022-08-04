import axios from 'axios';
import * as _ from 'lodash';

import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;
const MELI_PAY_PUBLIC_KEY = process.env.REACT_APP_MELI_PAY_PUBLIC_KEY;

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class PaymentsService {
  constructor() {
    this.mercadopago = new window.MercadoPago(MELI_PAY_PUBLIC_KEY);
  }
  chackout(paymentId, container) {
    return this.mercadopago.checkout({
      preference: {id: paymentId},
      render: {
        container: container,
        label: 'Pagar com Mercado Pago',
        type: 'wallet',
      },
      callbacks: {
        onFormMounted: error => {
          console.log("Form mounted");
        },
        onSubmit: event => {
          event.preventDefault();
          console.log("Submit");
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);
        }
      }
    });
  }
}

const service = new PaymentsService();
export default service;
