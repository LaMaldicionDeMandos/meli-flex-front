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

import { map } from'lodash';
import React, {useState} from "react";
import {Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import CollapsePanel from "../components/CollapsePanel/CollapsePanel";

import deliveryOrderService from '../services/deliveryOrder.service';
import DeliveryOrder from "../components/DeliveryOrder/DeliveryOrder";

function DeliveryOrders() {
  const [deliveryOrders, setDeliveryOrders] = useState(deliveryOrderService.getDeliveryOrders());

  const deliveryOrdersList = map(deliveryOrders, (order, index) => {
    return (
      <ListGroupItem key={order.name + index}>
        <DeliveryOrder  order={order} />
      </ListGroupItem>
    )
  });

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <h5 className="title">Ordenes de reparto </h5>
          <CollapsePanel defaultState={true} header={
            (<>
                <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>Abiertas</h5>
              </>
            )
          }>
            <ListGroup>
              {deliveryOrdersList}
            </ListGroup>
          </CollapsePanel>
        </Col>
      </Row>
    </div>
  );
}

export default DeliveryOrders;
