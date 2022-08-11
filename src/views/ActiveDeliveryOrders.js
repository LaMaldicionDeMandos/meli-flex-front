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
import NotificationAlert from "react-notification-alert";
import SweetAlert from "react-bootstrap-sweetalert";
import alert from './../utils/alert';

import deliveryOrderService from '../services/deliveryOrder.service';
import ActiveDeliveryOrder from "../components/DeliveryOrder/ActiveDeliveryOrder";

import { filter } from 'lodash';

function ActiveDeliveryOrders() {
  const notificationAlertRef = React.useRef(null);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState();

  const showErrorAlert = (message, place = 'tc') => {
    alert(notificationAlertRef, message, 'danger', 'icon-alert-circle-exc');
  }

  const findAllSearching = () => {
    deliveryOrderService.findAllSearching()
      .then((orders) => setDeliveryOrders(orders))
      .catch((e) => console.error(JSON.stringify(e)));
  };

  const deleteOrder = (order) => {
    deliveryOrderService.deleteDeliveryOrder(order)
      .then(result => {
        if (result.ok === 'ok') {
          setDeliveryOrders(filter(deliveryOrders, (or) => or._id !== order._id));
        } else {
          onDeleteError('La orden ya fue aceptada, no puede borrarse.');
        }
      })
      .catch(e => {
        onDeleteError('Hubo un problema y no pudimos borrar la orden, intenta nuevamente más tarde.');
      }) ;
  }

  const onDeleteOrder = (order) => {
    setOrderToDelete(order);
  }

  const onDeleteError = (message) => {
    showErrorAlert(message);
    findAllSearching();
  }

  useEffect(findAllSearching, []);

  const deliveryOrdersList = map(deliveryOrders, (order, index) => {
    return (
      <ListGroupItem key={order.name + index}>
        <ActiveDeliveryOrder order={order} deleteHandler={onDeleteOrder}/>
      </ListGroupItem>
    )
  });

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {orderToDelete ? <SweetAlert
        showCancel
        title={`¿Borrar la orden ${orderToDelete.name}?`}
        confirmBtnText="Confirmar"
        confirmBtnBsStyle="primary"
        cancelBtnText="Ahora no"
        cancelBtnBsStyle="danger"
        onCancel={() => setOrderToDelete(undefined)}
        onConfirm={() => {
          deleteOrder(orderToDelete);
          setOrderToDelete(undefined);
        }}
      /> : ''}
      <Card>
        <CardBody>
          { !isEmpty(deliveryOrdersList)
            ? (<Row>
              <Col md="12">
                <h5 className="title">Ordenes de reparto activas</h5>
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
