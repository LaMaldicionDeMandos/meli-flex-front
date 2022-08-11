import DeliveryOrderStatusIcon from "../DeliveryOrderStatusIcon/DeliveryOrderStatusIcon";
import SweetAlert from "react-bootstrap-sweetalert";
import {Button} from "reactstrap";
import React, {useState} from "react";

import moment from 'moment';
import 'moment/locale/es';
import deliveryOrderService from "../../services/deliveryOrder.service";
import paymentsService from "../../services/payments.service";

const PENDING_STATUS = 'pending';
const PAID_STATUS = 'paid';

const DEFAULT_WAITING_MINUTES = 30;
const ONE_SECOND = 1000;
const INTERVAL_KEY = 'activeDeliveryOrderInterval';

function TimeRemaining({time}) {
  const duration = moment.duration(time, 'seconds');
  return time > 0 ? 'Expira ' + duration.locale('es').humanize(true) : '';
}

function ActiveDeliveryOrderHeaderExtra({order, status, changeStatusHandler = () => {}, deleteHandler = () => {}}) {
  const [waitingPayment, setWaitingPayment] = useState(false);
  const [showReActiveDeliveryDialog, setShowReActiveDeliveryDialog] = useState(false);
  const [showRequestButton, setShowRequestButton] = useState(true);

  const reActivateDeliveryOrder = (minutes) => {
    deliveryOrderService.reActivateDeliveryOrder(order._id, minutes)
      .then(result => {
        paymentsService.chackout(result.id, `#order${order._id}`);
        setShowRequestButton(false);
      });
  }

  const getOrderStatus = () => {
    deliveryOrderService.getDeliveryOrderStatus(order._id)
      .then(result => {
        console.log(`Order status ${result.status}`);
        changeStatusHandler(result.status);
        if (result.status === PAID_STATUS) {
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

  const statusIconExtra = () => {
    if (status === PENDING_STATUS) return pendingStatusIconExtra();
    if (status === PAID_STATUS) return paidStatusIconExtra();
    else return workingStatusIconExtra();
  }

  const pendingStatusIconExtra = () => {
    return '';
  }

  const paidStatusIconExtra = () => {
    return <label className="title-row" style={{marginLeft: 6, fontWeight: 'normal'}}><TimeRemaining time={order.ttl}/></label>
  }

  const workingStatusIconExtra = () => {
    return '';
  }

  const headerExtra = () => {
    if (status === PENDING_STATUS) return pendingHeaderExtra();
    if (status === PAID_STATUS) return paidHeaderExtra();
    else return workingHeaderExtra();
  }

  const onDelete = () => {
    deleteHandler(order);
  }

  const pendingHeaderExtra = () => {
    return (<>{waitingPayment
      ? ''
      : <div id={`order${order._id}`} style={{paddingRight: 16}} onClick={onMercadopagoClick}></div>}
      {showRequestButton
        ? (
          <>
            <Button className="btn-round btn-sm btn-primary" onClick={() => setShowReActiveDeliveryDialog(true)}>Volver a publicar</Button>
            <Button className="btn-round btn-sm btn-danger" onClick={onDelete}><i className="tim-icons icon-trash-simple"></i></Button>
          </>)
        : ''
      }</>);
  }

  const paidHeaderExtra = () => {
    return '';
  }

  const workingHeaderExtra = () => {
    return '';
  }

  return (
    <>
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
      <DeliveryOrderStatusIcon status={status}>
        {statusIconExtra()}
      </DeliveryOrderStatusIcon>
      {headerExtra()}
    </>);
}
export default ActiveDeliveryOrderHeaderExtra;
