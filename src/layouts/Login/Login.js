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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import sessionService from "../../services/session.service";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  InputGroup,
  InputGroupText,
  Row
} from "reactstrap";

import './Login.css';

function Login() {
  const mainPanelRef = React.useRef(null);

  const [isError, setIsError] = useState(false);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const [focusUsername, setFocusUsername] = React.useState(false);
  const [focusPassword, setFocusPassword] = React.useState(false);

  const onSubmit = form => {
    console.log(`Login: ${form.username} - ${form.password}`)
    sessionService
        .login(form.username, form.password)
        .then(token => sessionService.getUser())
        .then(user => {
          history.push("/admin");
          console.log("Login Success " + JSON.stringify(user));
        })
        .catch(e => {
          console.log(`Error => ${JSON.stringify(e)}`);
          setIsError(true);
        });
  };

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
                      <InputGroup className={focusUsername ? "input-group-focus" : ""}>
                        <InputGroupText id="username">
                          <i className="tim-icons icon-single-02"></i>
                        </InputGroupText>
                        <input onFocus={() => setFocusUsername(true)}
                               onBlur={() => setFocusUsername(false)}
                               placeholder="User name" className="form-control" aria-describedby="username"
                               {...register("username", {
                                 required: true,
                                 onChange: e => {
                                   setIsError(false);
                                 }
                               })}/>
                      </InputGroup>
                      <InputGroup className={focusPassword ? "input-group-focus" : ""}>
                        <InputGroupText id="password">
                          <i className="tim-icons icon-lock-circle"></i>
                        </InputGroupText>
                        <input onFocus={() => setFocusPassword(true)}
                               onBlur={() => setFocusPassword(false)}
                               placeholder="Password" className="form-control" aria-describedby="password" type="password"
                               {...register("password", {
                                 required: true,
                                 onChange: e => {
                                   setIsError(false);
                                 }
                               })}/>
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-block" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
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
