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

import './OrderItemMin.css';

function OrderItemMin({item}) {
  return (
    <Row className="sc-row-content__icon-container_min ">
      <Col md="12" className="sc-cart-product_min">
        <div className="sc-product-picture_min sc-product-picture__single-item_min">
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

export default OrderItemMin;
