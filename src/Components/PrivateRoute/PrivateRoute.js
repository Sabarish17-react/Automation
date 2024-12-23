import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

import { getDepartment } from "../../Utilities/Common";
import Electronics_Navbar from "../NavBar/Electronics_Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      {(() => {
        if (rest.level === "Electronics") {
          return <Electronics_Navbar />;
        }
      })()}
      <Route
        {...rest}
        render={(props) => {
          return getDepartment() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }}
      />
    </div>
  );
};

export default PrivateRoute;
