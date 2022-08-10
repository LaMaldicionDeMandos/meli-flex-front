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
import SweetAlert from "react-bootstrap-sweetalert";

import { map, isEmpty, assign, replace } from 'lodash';

// reactstrap components
import {
  Row,
  Col, Button
} from "reactstrap";
import OrderRowMin from "../OrderRow/OrderRowMin";
import currencyFormatter from '../../utils/currency.formatter';
import DeliveryOrderStatusIcon from "../DeliveryOrderStatusIcon/DeliveryOrderStatusIcon";

function ActiveDeliveryOrder({order}) {

  const orderList = map(order.orders, (order) => <OrderRowMin key={order.id} order={order} />);

  return (
    <Row>
      <Col md="12">
        <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, fontWeight: 'bold'}}>
          <Row>
            <Col md="2">
              <DeliveryOrderStatusIcon status={order.status}/>
            </Col>
            <Col md="8" className="text-center">
              <span>{order.name}</span>
            </Col>
            <Col md="2" className="">
              <span className="right">{ order.cost ? `Costo: ${currencyFormatter.format(order.cost)}` : ''}</span>
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

export default ActiveDeliveryOrder;
