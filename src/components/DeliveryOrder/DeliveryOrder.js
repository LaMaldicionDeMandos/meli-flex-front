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
import React, {useEffect, useState} from "react";

import { map, reduce, isEmpty } from 'lodash';

// reactstrap components
import {
  Row,
  Col, Button
} from "reactstrap";
import OrderRowMin from "../OrderRow/OrderRowMin";
import currencyFormatter from '../../utils/currency.formatter';
import deliveryOrderService from '../../services/deliveryOrder.service';
import paymentsService from '../../services/payments.service';

function DeliveryOrder({order, refreshHandler = (order) => {}}) {
  const [deliveryCost, setDeliveryCost] = useState();
  const [orders, setOrders] = useState(order.orders);
  const [showRequestButton, setShowRequestButton] = useState(true);

  useEffect(() => {
    deliveryOrderService.calculateCost(order).then(setDeliveryCost);
  }, [order, orders]);

  const deleteHandler = (orderChild) => {
    deliveryOrderService.deleteOrderFromDeliveryList(order.name, orderChild);
    setOrders(deliveryOrderService.deliveryOrderByName(order.name).orders);
  }

  const orderList = map(orders, (order) => <OrderRowMin key={order.id} order={order} deleteOrderHandler={deleteHandler} />);

  const activateDeliveryOrder = () => {
    deliveryOrderService.activateDeliveryOrder(order)
      .then(result => {
        paymentsService.chackout(result.id, `#${order.name}`);
        setShowRequestButton(false);
        refreshHandler()
      });
  }

  const onMercadopagoClick = () => {
    deliveryOrderService.deleteDeliveryOrder(order);
    refreshHandler(order);
  }

  return (
    <Row>
      <Col md="12">
        <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, fontWeight: 'bold'}}>
          <Row>
            <Col md="8">
              <span>{order.name}</span>
            </Col>
            <Col md="2" className="">
              <span className="right">{ deliveryCost ? `Costo: ${currencyFormatter.format(deliveryCost)}` : ''}</span>
            </Col>
            <Col md="2">
              <div id={order.name} style={{paddingRight: 16}} onClick={onMercadopagoClick}></div>
              { !isEmpty(orderList) && showRequestButton ? <Button className="btn-round btn-sm btn-primary" onClick={activateDeliveryOrder}>Solicitar reparto</Button> : ''}
            </Col>
          </Row>
        </h5>
        <Row style={{padding: 8}}>
          <Col md="12">
            {orderList}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DeliveryOrder;
