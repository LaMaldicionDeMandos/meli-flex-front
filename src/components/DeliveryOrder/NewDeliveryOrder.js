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
import deliveryOrderService from '../../services/deliveryOrder.service';
import paymentsService from '../../services/payments.service';

const DEFAULT_WAITING_MINUTES = 30;

function NewDeliveryOrder({order, refreshHandler = (order) => {}}) {
  const [deliveryCost, setDeliveryCost] = useState();
  const [orders, setOrders] = useState(order.orders);
  const [showRequestButton, setShowRequestButton] = useState(true);
  const [showActiveDeliveryDialog, setShowActiveDeliveryDialog] = useState(false);

  useEffect(() => {
    deliveryOrderService.calculateCost(order).then(setDeliveryCost);
  }, [order, orders]);

  const deleteHandler = (orderChild) => {
    deliveryOrderService.deleteOrderFromDeliveryList(order.name, orderChild);
    setOrders(deliveryOrderService.deliveryOrderByName(order.name).orders);
  }

  const orderList = map(orders, (order) => <OrderRowMin key={order.id} order={order} deleteOrderHandler={deleteHandler} />);

  const activateDeliveryOrder = (minutes) => {
    deliveryOrderService.activateDeliveryOrder(assign(order, {expiration_minutes: minutes}))
      .then(result => {
        paymentsService.chackout(result.id, `#${replace(order.name, /[ /]/g, '')}`);
        setShowRequestButton(false);
        refreshHandler()
      });
  }

  const onMercadopagoClick = () => {
    deliveryOrderService.deleteNewDeliveryOrder(order);
    refreshHandler(order);
  }

  return (
    <Row>
      {showActiveDeliveryDialog ? <SweetAlert
        input
        inputType="number"
        required={true}
        showCancel
        defaultValue={DEFAULT_WAITING_MINUTES}
        title="Tiempo de espera hasta que expire la orden de reparto"
        confirmBtnText="Confirmar"
        confirmBtnBsStyle="primary"
        cancelBtnText="Ahora no"
        cancelBtnBsStyle="danger"
        onCancel={() => setShowActiveDeliveryDialog(false)}
        onConfirm={(minutes) => {
          activateDeliveryOrder(minutes);
          setShowActiveDeliveryDialog(false);
        }}
      >Si no encontramos un repartidor antes de que expire el tiempo, te reenbolsaremos el dinero.</SweetAlert> : ''}
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
              <div id={replace(order.name, /[ /]/g, '')} style={{paddingRight: 16}} onClick={onMercadopagoClick}></div>
              { !isEmpty(orderList) && showRequestButton ? <Button className="btn-round btn-sm btn-primary" onClick={() => setShowActiveDeliveryDialog(true)}>Solicitar reparto</Button> : ''}
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

export default NewDeliveryOrder;
