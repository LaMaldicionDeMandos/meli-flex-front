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
import * as _ from "lodash";

// reactstrap components
import {
  Row,
  Col, Card, CardHeader, CardBody, Button
} from "reactstrap";

import './OrderRow.css';
import OrderBuyer from "./OrderBuyer";
import OrderItem from "./OrderItem";
import currencyFormatter from '../../utils/currency.formatter';

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'})

const SHIPPING_DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  month: 'long',
  day: 'numeric'})

function OrderRow({order, children}) {
  const itemList = _.map(order.order_items, (item) => {
    return (<OrderItem key={item.item.id} item={item} />);
  });



  return (
    <Row>
      <Col md="12">
        <Card style={{marginBottom: 12}}>
          <CardHeader>
            <label className="title_row">#{order.id} | {DATE_FORMATTER.format(Date.parse(order.date_created)) + 'hs.'}</label>
          </CardHeader>
          <CardBody className="all-icons">
            <Row>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <label className="title_row">Entregar antes del {SHIPPING_DATE_FORMATTER.format(Date.parse(order.shipping.shipping_option.estimated_handling_limit.date))}</label>
                  </Col>
                  <Col md="6">
                    <div className="text-right">
                      <span className="sc-quantity">Costo base de envío: {currencyFormatter.format(order.shipping.base_cost)}</span>
                    </div>
                  </Col>
                </Row>
                <Col md="12" style={{marginTop: 16}}>
                  {itemList}
                </Col>
              </Col>
              <Col md="2">
                {children}
              </Col>
              <Col md="4">
                <OrderBuyer order={order} />
              </Col>
            </Row>
            <Row>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderRow;
