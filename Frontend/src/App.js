import React, { useState } from "react";
import "./Style.css";
import PrivateRoutes from "./Component/private-routes/PrivateRoutes";
import localStorageService from "./service/localStorageService";

function App() {
  
  const [role, setRole] = useState(localStorageService.getRole());

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
