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
import React from "react";
import {Col, Row} from "reactstrap";

import './OrderItem.css';

function OrderItem({item}) {
  return (
    <Row className="sc-row-content__icon-container ">
      <Col md="12" className="sc-cart-product">
        <div className="sc-product-picture sc-product-picture__single-item">
          <img src={item.item.thumbnail} />
        </div>
        <div className="sc-title">
          <a href={item.item.permalink}>
            <div>{item.item.title}</div>
          </a>
        </div>
        <div className="sc-quantity"><span>{item.quantity}u.</span></div>
      </Col>
    </Row>
  );
}

export default OrderItem;
