import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Keycloak from "keycloak-js";
// import Navbar from "./Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

let initOptions = {
  // url: "https://keycloak-shift.inside10d.com/",
  // realm: "m2p",
  // clientId: "frontend",

  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,
  onLoad: "check-sso", // check-sso | login-required
  KeycloakResponseType: "code",
};

export const kc = new Keycloak(initOptions);

kc.init({
  onLoad: initOptions.onLoad,
  KeycloakResponseType: "code",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  checkLoginIframe: false,
  pkceMethod: "S256",
}).then(
  (auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
      console.log("auth", auth);
      console.log("Keycloak", kc);
      kc.onTokenExpired = () => {
        console.log("token expired");
      };
    }
  },
  () => {
    console.error("Authenticated Failed");
  }
);

function KeyCloak() {
  const [infoMessage, setInfoMessage] = useState("");

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center mt-4">keycloak integration with React</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              setInfoMessage(
                kc.authenticated
                  ? "Authenticated: TRUE"
                  : "Authenticated: FALSE"
              );
            }}
          >
            Is Authenticated
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              kc.login();
            }}
          >
            Login
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              setInfoMessage(kc.token);
            }}
          >
            Show Access Token
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              setInfoMessage(JSON.stringify(kc.tokenParsed));
            }}
          >
            Show Parsed Access token
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              setInfoMessage(kc.isTokenExpired(5).toString());
            }}
          >
            Check Token expired
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              kc.updateToken(10).then(
                (refreshed) => {
                  setInfoMessage("Token Refreshed: " + refreshed.toString());
                },
                () => {
                  setInfoMessage("Refresh Error");
                }
              );
            }}
          >
            Update Token (if about to expire)
          </Button>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => {
              kc.logout({ redirectUri: "http://localhost:4200/" });
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header style={{ textAlign: "center" }}>info</Card.Header>
            <Card.Body>
              <Card.Text style={{ textAlign: "center" }}>
                {infoMessage}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default KeyCloak;
