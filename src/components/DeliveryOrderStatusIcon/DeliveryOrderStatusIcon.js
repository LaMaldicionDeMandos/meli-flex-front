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
/*eslint-disable*/
import React, {useState} from "react";

import './DeliveryOrderStatusIcon.css';
import {Tooltip} from "reactstrap";

const STATE = {
  pending: {
    className: 'font-icon-red',
    icon: 'icon-alert-circle-exc',
    explanation: 'Orden expirada'
  },
  paid: {
    className: 'font-icon-primary',
    icon: 'icon-watch-time',
    explanation: 'Buscando delivery'
  },
  working: {
    className: 'font-icon-green',
    icon: 'icon-delivery-fast',
    explanation: 'En camino'
  }
}

function DeliveryOrderStatusIcon({status}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const currentState = STATE[status];

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
  <><span className={`container ${currentState.className}`} id="stateIcon">
      <i className={`tim-icons ${currentState.icon}`}></i>
      <Tooltip
      isOpen={tooltipOpen}
      target="stateIcon"
        toggle={toggle}
      >
        {currentState.explanation}
      </Tooltip>
    </span>
    <label className="title-row">{currentState.explanation}</label>
    </>

  );
}

export default DeliveryOrderStatusIcon;
