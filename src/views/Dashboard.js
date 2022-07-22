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
import * as _ from 'lodash';

import ordersService from '../services/orders.service';

// reactstrap components
import {
  Row,
  Col, Card, CardHeader, CardBody, Table
} from "reactstrap";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    ordersService.findOrders()
      .then(orders => {
        console.log('Orders: ' + JSON.stringify(orders));
        setOrders(orders);
      })
  }, []);

  const fields = _.map(orders, order => {
    return (
      <div key={order.id}>
        <Row>
          <Col className="col-12">
            <label>#{order.id} | {order.date_created}</label>
          </Col>
        </Row>
      </div>);
  });

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Ventas</h5>
            </CardHeader>
            <CardBody className="all-icons">
              {fields}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
