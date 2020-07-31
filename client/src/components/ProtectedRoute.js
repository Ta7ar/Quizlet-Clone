import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, path, accessible }) {
  if (accessible) {
    return (
      <Route path={path} exact>
        {children}
      </Route>
    );
  }
  return (
    <Route path={path} exact>
      <Redirect to="/" />
    </Route>
  );
}

export default ProtectedRoute;
