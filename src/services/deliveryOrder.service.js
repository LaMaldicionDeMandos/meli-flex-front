import {isEmpty, map, find, first} from 'lodash';
import {DeliveryOrder} from "../models/deliveryOrder";

const DELIVERY_ORDERS_KEY = 'delivery_orders';

class DeliveryOrderService {
  #deliveryOrders;
  newDeliveryOrder(name, order) {
    const deliveryOrders = this.getDeliveryOrders();
    const deliveryOrder = new DeliveryOrder(name, [order]);
    deliveryOrders.push(deliveryOrder);
    console.log(`Delivery order: {name: ${deliveryOrder.name}, orders: ${deliveryOrder.orders}}`);
    this.#save(deliveryOrders);
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
    const orders = map(JSON.parse(window.localStorage.getItem(DELIVERY_ORDERS_KEY)) || [], order => {
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

  deliveryOrderNameByOrder(order) {
    const deliveryOrder = find(this.getDeliveryOrders(), (deliveryOrder) => deliveryOrder.hasOrder(order));
    return deliveryOrder?.name;
  }

  #firstDeliveryOrder() {
    return first(this.getDeliveryOrders());
  }

  #save(deliveryOrders) {
    window.localStorage.setItem(DELIVERY_ORDERS_KEY, JSON.stringify(deliveryOrders));
    this.#deliveryOrders = undefined;
  }
}

const service = new DeliveryOrderService();
export default service;
