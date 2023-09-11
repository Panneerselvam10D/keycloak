// import React, { useEffect, useState } from "react";
// import { Button } from "bootstrap";
import kc from "./Keycloak";

const Navbar = () => {
  // console.log(kc);
  return (
    <nav class="navbar bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand text-white h6" href="#">
          Keycloak
        </a>
        <ul class="navbar-nav d-flex flex-row me-1">
          <li class="nav-item me-3 me-lg-0">
            {/* <Button class="nav-link text-white" onClick={() => login}>
              Login
            </Button> */} 
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                kc.login();
              }}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
