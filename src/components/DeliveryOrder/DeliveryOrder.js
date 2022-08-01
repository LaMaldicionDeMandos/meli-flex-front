/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { map, reduce } from 'lodash';

// reactstrap components
import {
  Row,
  Col, ListGroup
} from "reactstrap";
import OrderRowMin from "../OrderRow/OrderRowMin";
import CollapsePanel from "../CollapsePanel/CollapsePanel";
import currencyFormatter from '../../utils/currency.formatter';

function DeliveryOrder({order}) {

  const orders = map(order.orders, (order) => <OrderRowMin key={order.id} order={order} />);
  const deliveryCost = reduce(order.orders, (sum, order) => sum + order.shipping.base_cost, 0);

  return (
    <Row>
      <Col md="12">
        <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>
          {order.name} Costo: {currencyFormatter.format(deliveryCost)}
        </h5>
        <Row style={{padding: 8}}>
          <Col md="12">
            {orders}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DeliveryOrder;
