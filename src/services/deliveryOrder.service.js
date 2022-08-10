import {isEmpty, map, find, first, remove} from 'lodash';
import {DeliveryOrder} from "../models/deliveryOrder";
import axios from "axios";
import sessionService from "./session.service";
import * as _ from "lodash";

const DELIVERY_ORDERS_KEY = 'delivery_orders';
const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class DeliveryOrderService {
  #deliveryOrders;
  newDeliveryOrder(name, order) {
    const deliveryOrders = this.getDeliveryOrders();
    const deliveryOrder = new DeliveryOrder(name, order ? [order] : []);
    deliveryOrders.push(deliveryOrder);
    console.log(`Delivery order: {name: ${deliveryOrder.name}, orders: ${deliveryOrder.orders}}`);
    this.#save(deliveryOrders);
  }

  getDeliveryOrderStatus(id) {
    return axios.get(`${API_URL}/delivery/${id}/status`,
      {headers: HEADERS({Authorization: sessionService.getToken()})}
      )
      .then(response => response.data);
  }

  activateDeliveryOrder(deliveryOrder) {
    return axios.post( `${API_URL}/delivery`,
      deliveryOrder,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    )
      .then(response => response.data);
  }

  reActivateDeliveryOrder(id, minutes) {
    return axios.post( `${API_URL}/delivery/${id}/activation`,
      {expiration_minutes: minutes},
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    )
      .then(response => response.data);
  }

  addOrder(order, deliveryOrderName) {
    const deliveryOrders = this.getDeliveryOrders();
    const deliveryOrder = deliveryOrderName
      ? find(deliveryOrders, order => order.name === deliveryOrderName)
      : this.#firstDeliveryOrder();
    if (deliveryOrder) {
      deliveryOrder.orders.push(order);
      this.#save(deliveryOrders);
    }
    else {
      this.newDeliveryOrder(deliveryOrderName, order);
    }
  }

  getDeliveryOrders() {
    if (this.#deliveryOrders) return this.#deliveryOrders;

    const orders = map(JSON.parse(window.localStorage.getItem(DELIVERY_ORDERS_KEY + sessionService.getUserId())) || [], order => {
      return new DeliveryOrder(order.name, order.orders);
    });
    this.#deliveryOrders = orders;
    return orders;
  }

  hasDeliveryOrders() {
    return !isEmpty(this.getDeliveryOrders());
  }

  hasOnlyOneDeliveryOrderOpen() {
    return this.getDeliveryOrders().length === 1;
  }

  deleteDeliveryOrder(order) {
    const orders = this.getDeliveryOrders();
    _.remove(orders, (or) => or.name === order.name);
    this.#save(orders);
  }

  deliveryOrderNameByOrder(order) {
    const deliveryOrder = find(this.getDeliveryOrders(), (deliveryOrder) => deliveryOrder.hasOrder(order));
    return deliveryOrder?.name;
  }

  deleteOrderFromDeliveryList(deliveryOrderName, order) {
    const deliveryOrder = this.deliveryOrderByName(deliveryOrderName);
    remove(deliveryOrder.orders, (or) => order.id === or.id);
    this.#save(this.getDeliveryOrders());
  }

  calculateCost(deliveryOrder) {
   return axios.post( `${API_URL}/delivery/cost/calculation`,
      deliveryOrder,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    )
      .then(response => response.data.cost);
  }

  deliveryOrderByName(name) {
    return find(this.getDeliveryOrders(), order => order.name === name);
  }

  findAll() {
    return axios.get( `${API_URL}/delivery`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    )
      .then(response => response.data);
  }

  findAllSearching() {
    return axios.get( `${API_URL}/delivery?status=searching`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    )
      .then(response => response.data);
  }

  #firstDeliveryOrder() {
    return first(this.getDeliveryOrders());
  }

  #save(deliveryOrders) {
    window.localStorage.setItem(DELIVERY_ORDERS_KEY + sessionService.getUserId(), JSON.stringify(deliveryOrders));
    this.#deliveryOrders = undefined;
  }
}

const service = new DeliveryOrderService();
export default service;
