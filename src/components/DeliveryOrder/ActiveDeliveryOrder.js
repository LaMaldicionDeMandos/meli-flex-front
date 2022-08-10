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

import { map } from 'lodash';

// reactstrap components
import {
  Row,
  Col, Button
} from "reactstrap";
import OrderRowMin from "../OrderRow/OrderRowMin";
import currencyFormatter from '../../utils/currency.formatter';
import DeliveryOrderStatusIcon from "../DeliveryOrderStatusIcon/DeliveryOrderStatusIcon";
import deliveryOrderService from "../../services/deliveryOrder.service";
import paymentsService from "../../services/payments.service";

const PENDING_STATUS = 'pending';

const DEFAULT_WAITING_MINUTES = 30;
const ONE_SECOND = 1000;
const INTERVAL_KEY = 'activeDeliveryOrderInterval';

function ActiveDeliveryOrder({order}) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [showReActiveDeliveryDialog, setShowReActiveDeliveryDialog] = useState(false);
  const [showRequestButton, setShowRequestButton] = useState(true);
  const [waitingPayment, setWaitingPayment] = useState(false);

  const orderList = map(order.orders, (order) => <OrderRowMin key={order.id} order={order} />);

  const reActivateDeliveryOrder = (minutes) => {
    deliveryOrderService.reActivateDeliveryOrder(order._id, minutes)
      .then(result => {
          paymentsService.chackout(result.id, `#order${order._id}`);
          setShowRequestButton(false);
          //refreshHandler()
        });
  }

  const getOrderStatus = () => {
    deliveryOrderService.getDeliveryOrderStatus(order._id)
      .then(result => {
        console.log(`Order status ${result.status}`);
        setOrderStatus(result.status);
        if (result.status === 'paid') {
          clearInterval(Number.parseInt(window.sessionStorage.getItem(INTERVAL_KEY)));
        }
        setWaitingPayment(false);
      })
  }

  const onMercadopagoClick = () => {
    setWaitingPayment(true);
    const intervalId = setInterval(getOrderStatus, ONE_SECOND);
    window.sessionStorage.setItem(INTERVAL_KEY, intervalId);
  }

  return (
    <Row>
      {showReActiveDeliveryDialog ? <SweetAlert
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
        onCancel={() => setShowReActiveDeliveryDialog(false)}
        onConfirm={(minutes) => {
          reActivateDeliveryOrder(minutes);
          setShowReActiveDeliveryDialog(false);
        }}
      >Si no encontramos un repartidor antes de que expire el tiempo, te reenbolsaremos el dinero.</SweetAlert> : ''}
      <Col md="12">
        <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, fontWeight: 'bold'}}>
          <Row>
            <Col md="2">
              <DeliveryOrderStatusIcon status={orderStatus}/>
              {orderStatus === PENDING_STATUS
                ? (
                  <>{waitingPayment ? '' : <div id={`order${order._id}`} style={{paddingRight: 16}} onClick={onMercadopagoClick}></div>}
                  {showRequestButton
                    ? <Button className="btn-round btn-sm btn-primary" onClick={() => setShowReActiveDeliveryDialog(true)}>Volver a publicar</Button>
                    : ''
                  }</>
                )
                : ''}
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
