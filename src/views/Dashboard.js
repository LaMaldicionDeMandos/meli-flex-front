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

import OrderRow from "../components/OrderRow/OrderRow";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [pack, setPack] = useState();
  useEffect(() => {
    ordersService.findOrders()
      .then(orders => {
        console.log('Orders: ' + JSON.stringify(orders));
        setOrders(orders);
      })
  }, []);

  const fields = _.map(orders, order => {
    return <OrderRow key={order.id} order={order} pack={pack}/>;
  });

  return (
    <div className="content">
      <h5 className="title">Envíos Pendientes</h5>
      {fields}
    </div>
  );
}

export default Dashboard;
