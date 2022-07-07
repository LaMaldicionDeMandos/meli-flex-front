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
import React  from "react";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";

import './Login.css';
const MELI_APP_ID = process.env.REACT_APP_MELI_APP_ID;
const MELI_REDIRECT_URL = process.env.REACT_APP_MELI_REDIRECT_URL;
const MELI_LOGIN_URL = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${MELI_APP_ID}&redirect_uri=${MELI_REDIRECT_URL}`;


function Login() {
  const mainPanelRef = React.useRef(null);

  const goToMeliLogin = () => window.location.replace(MELI_LOGIN_URL);

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">

            <div className="main-panel" ref={mainPanelRef} data={color}>
              <Row className="login-panel">
                <Col className="ml-auto mr-auto" md="3">
                  <Card className="card-white">
                    <CardHeader className="login-card-header">
                      <img className="login-img"
                          alt="..."
                          src={require("assets/img/card-primary.17212428.png").default}
                      />
                      <h1 className="login-card-title">Log in</h1>
                    </CardHeader>
                    <CardBody>
                      <h1>Ingresa usando tu cuenta de Mercadolibre</h1>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-block" color="primary" onClick={goToMeliLogin}>
                        Log in
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Login;
