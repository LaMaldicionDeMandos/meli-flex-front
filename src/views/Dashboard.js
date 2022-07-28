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
import NotificationAlert from "react-notification-alert";
import {FormControlLabel, Switch} from "@mui/material";

import * as _ from 'lodash';

import ordersService from '../services/orders.service';
import deliveryOrderService from '../services/deliveryOrder.service';

import alert from '../utils/alert';

import OrderRow from "../components/OrderRow/OrderRow";
import {Button, Spinner} from "reactstrap";

function Dashboard() {
  const notificationAlertRef = React.useRef(null);
  const [showNewDeliveryOrderDialog, setShowNewDeliveryOrderDialog] = useState(false);
  const [orders, setOrders] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState(deliveryOrderService.getDeliveryOrders());
  const [selectedOrder, setSelectedOrder] = useState();
  const [filterPacks, setFilterPacks] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    ordersService.findOrders()
      .then(orders => {
        console.log('Orders: ' + JSON.stringify(orders));
        setOrders(orders);
        setShowSpinner(false);
      })
  }, []);

  const addToDeliveryOrder = (order) => {
    if (deliveryOrderService.hasDeliveryOrders()) {
      if (deliveryOrderService.hasOnlyOneDeliveryOrderOpen()) {
        deliveryOrderService.addOrder(order);
        alert(notificationAlertRef, 'Se agregó el paquete a la lista.', 'success', 'icon-check-2');
        setDeliveryOrders(deliveryOrderService.getDeliveryOrders());
      } else {
        console.log('Hay mas de una orden de reparto');
      }
    } else {
      setShowNewDeliveryOrderDialog(true);
      setSelectedOrder(order);
    }
  }

  const createDeliveryOrder = (name) => {
    console.log('Nueva Orden de reparto ' + name);
    deliveryOrderService.newDeliveryOrder(name, selectedOrder);
    setShowNewDeliveryOrderDialog(false);
    setSelectedOrder(undefined);
    setDeliveryOrders(deliveryOrderService.getDeliveryOrders());
  }

  const fields = _.chain(orders)
    .filter((order) => !filterPacks || !deliveryOrderService.deliveryOrderNameByOrder(order))
    .map(order => {
    const buttonText = deliveryOrderService.hasDeliveryOrders() ? 'Agregar a la lista' : 'Crear lista de reparto';
    const deliveryOrderName = deliveryOrderService.deliveryOrderNameByOrder(order);
    const child = deliveryOrderName
      ? <label className="text-primary">Incluido en la orden de reparto <b>{deliveryOrderName}</b></label>
      : <Button className="btn btn-primary" onClick={() => addToDeliveryOrder(order)}>{buttonText}</Button>
    return <OrderRow key={order.id} order={order}>
      {child}
    </OrderRow>;
  }).value();

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {showNewDeliveryOrderDialog ? <SweetAlert
        input
        showCancel
        placeHolder="Nombre de la orden de reparto"
        title="Nueva orden de reparto"
        confirmBtnText="Crear Orden"
        confirmBtnBsStyle="primary"
        cancelBtnText="Ahora no"
        cancelBtnBsStyle="danger"
        onCancel={() => setShowNewDeliveryOrderDialog(false)}
        onConfirm={createDeliveryOrder}
      >Elige un nombre para la nueva orden de reparto.</SweetAlert> : ''}
      <h5 className="title">Envíos Pendientes</h5>
      { showSpinner
        ? <Spinner color="primary" style={{height: '5rem', width: '5rem'}} type="grow">Loading...</Spinner>
        : (<><FormControlLabel control={<Switch value={filterPacks} onClick={() => setFilterPacks(!filterPacks)} />} label="Mostrar solo Paquetes sin lista de reparto" />
        {fields}</>)
      }
    </div>
  );
}

export default Dashboard;
