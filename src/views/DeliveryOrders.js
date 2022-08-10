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

import React, {useState} from "react";
import {Nav, NavItem, NavLink, NavLinkw, TabContent, TabPane} from "reactstrap";

import './DeliveryOrders.css';

import NewDeliveryOrders from "./NewDeliveryOrders";
import ActiveDeliveryOrders from "./ActiveDeliveryOrders";

const DELIVERY_STATUS_NEW = 'new';
const DELIVERY_STATUS_ACTIVE = 'active';

function DeliveryOrders() {
  const [deliveryStatusActive, setDeliveryStatusActive] = useState(DELIVERY_STATUS_NEW);

  return (
    <div className="content">
      <Nav tabs fill>
        <NavItem>
          <NavLink active={deliveryStatusActive === DELIVERY_STATUS_NEW} onClick={() => setDeliveryStatusActive(DELIVERY_STATUS_NEW)}>Nuevas</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={deliveryStatusActive === DELIVERY_STATUS_ACTIVE} onClick={() => setDeliveryStatusActive(DELIVERY_STATUS_ACTIVE)}>Activas</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={deliveryStatusActive}>
        <TabPane tabId={DELIVERY_STATUS_NEW}>
          <NewDeliveryOrders />
        </TabPane>
        <TabPane tabId={DELIVERY_STATUS_ACTIVE}>
          <ActiveDeliveryOrders />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default DeliveryOrders;
