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
import Dashboard from "views/Dashboard.js";
import DeliveryOrders from "./views/DeliveryOrders";

const routes = [
  {
    path: "/dashboard",
    name: "Envíos pendientes",
    icon: "tim-icons icon-cart",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Ordenes de reparto",
    icon: "tim-icons icon-delivery-fast",
    component: DeliveryOrders,
    layout: "/admin",
  }
];
export default routes;
