import React from "react";
import ConfigRoutes from "../../Config/routes";
import { Route, Routes, Navigate } from "react-router-dom";

function PrivateRoutes(props) {
  const role = props.role || "guest";

  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  const redirecRoutes = ConfigRoutes[role].redirecRoutes;
  return (
    <div>
      <Routes>
        {allowedRoutes.map((route) => (
          <Route path={route.url} key={route.url} element={<route.component setRole={props.setRole} />} />
        ))}
        <Route path="*" element={<Navigate to={redirecRoutes} />} />
      </Routes>
    </div>
  );
}

export default PrivateRoutes;
