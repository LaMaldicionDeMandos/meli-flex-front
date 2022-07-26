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
import {Col, Row} from "reactstrap";

function OrderBuyer({order}) {
  return (
    <Row>
      <Col md="6">
        <label className="title">Comprador: </label><br/>
        <label>{order.buyer.nickname}</label>
      </Col>
      <Col md="6">
        <label className="title">Recibe:</label><br/>
        <label>{order.shipping.receiver_address?.receiver_name}</label>
      </Col>
      <Col md="12">
        <label className="title">Dirección de envío:</label><br/>
        <label>{order.shipping.receiver_address?.address_line}</label><br/>
        <label>CP: {order.shipping.receiver_address?.zip_code} - {order.shipping.receiver_address?.city?.name}, {order.shipping.receiver_address?.state?.name}</label>
        <label>{order.shipping.receiver_address?.comment}</label>
      </Col>
    </Row>
  );
}

export default OrderBuyer;
