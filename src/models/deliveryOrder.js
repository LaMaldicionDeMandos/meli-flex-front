import { find } from 'lodash';
export class DeliveryOrder {
  constructor(name, orders = []) {
    this.name = name;
    this.orders = orders;
  }

  hasOrder(order) {
    return find(this.orders, (or) => order.id === or.id);
  }
}
