import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviceTable from "./modules/Dashboard/DeviceTable";
import DeviceDetail from "./modules/Dashboard/DeviceDetail";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DeviceTable />} />
      <Route path="/device/:serialNo" element={<DeviceDetail />} />
    </Routes>
  );
};

export default App;
