import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviceTable from "./modules/dashboard/DeviceTable";
import DeviceDetail from "./modules/dashboard/DeviceDetail";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DeviceTable />} />
      <Route path="/device/:serialNo" element={<DeviceDetail />} />
    </Routes>
  );
};

export default App;
