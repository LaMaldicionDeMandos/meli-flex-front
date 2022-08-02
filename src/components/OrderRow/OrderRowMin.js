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
  Col, Card, CardHeader, CardBody
} from "reactstrap";

import './OrderRowMin.css';
import OrderBuyerMin from "./OrderBuyerMin";
import OrderItemMin from "./OrderItemMin";

const SHIPPING_DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  month: 'long',
  day: 'numeric'})

function OrderRow({order, deleteOrderHandler = (order) => {}}) {
  const itemList = _.map(order.order_items, (item) => {
    return (<OrderItemMin key={item.item.id} item={item} />);
  });

  return (
    <Row>
      <Col md="12">
        <Card style={{marginBottom: 4}}>
          <CardHeader>
            <Row>
              <Col md="6">
                <label className="title_row">
                  #{order.id} | Entregar antes del {SHIPPING_DATE_FORMATTER.format(Date.parse(order.shipping.shipping_option.estimated_handling_limit.date))}
                </label>
              </Col>
              <Col md="6" className="text-right">
                <button className="btn-sm btn-link btn-danger align-self-center" onClick={() => deleteOrderHandler(order)}><i className="zmdi zmdi-delete"></i></button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="all-icons">
            <Row>
              <Col md="6">
                <Col md="12">
                  {itemList}
                </Col>
              </Col>
              <Col md="6">
                <OrderBuyerMin order={order} />
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
