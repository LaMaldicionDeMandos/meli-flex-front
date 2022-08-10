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

import { map, isEmpty } from'lodash';
import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, ListGroup, ListGroupItem, Row} from "reactstrap";

import deliveryOrderService from '../services/deliveryOrder.service';
import ActiveDeliveryOrder from "../components/DeliveryOrder/ActiveDeliveryOrder";

function ActiveDeliveryOrders() {
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  useEffect(() => {
    deliveryOrderService.findAllSearching()
      .then((orders) => setDeliveryOrders(orders))
      .catch((e) => console.error(JSON.stringify(e)));
  }, []);

  const deliveryOrdersList = map(deliveryOrders, (order, index) => {
    return (
      <ListGroupItem key={order.name + index}>
        <ActiveDeliveryOrder order={order} />
      </ListGroupItem>
    )
  });

  return (
    <div className="content">
      <Card>
        <CardBody>
          { !isEmpty(deliveryOrdersList)
            ? (<Row>
              <Col md="12">
                <h5 className="title">Ordenes de reparto en busqueda</h5>
                <ListGroup>
                  {deliveryOrdersList}
                </ListGroup>
              </Col>
            </Row>) : 'NO HAY ORDENES EN BUSQUEDA'}
        </CardBody>
      </Card>
    </div>
  );
}

export default ActiveDeliveryOrders;
