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
import React, {useEffect} from "react";

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
import {useHistory} from "react-router-dom";

import sessionService from '../../services/session.service';

import './Login.css';
import {useLocation} from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Login() {
  const mainPanelRef = React.useRef(null);

  const sesscionCode = useQuery().get('code');

  const history = useHistory();

  const goToMeliLogin = () => sessionService.requestAccessCode();

  useEffect(() => {
    if (sesscionCode) {
      console.log('Session code: ' + sesscionCode);
      sessionService.requestAccessToken(sesscionCode)
        .then(() => {
          history.push('/admin');
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);

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
