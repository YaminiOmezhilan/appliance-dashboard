const express = require("express");
const cors = require("cors");
const appliances = require("./response");
const app = express();
const port = 5000;

app.use(cors());

app.get("/api/v1/appliances", (req, res) => {
  const { deviceStatus, downloadStatus } = req.query;
  
  let filteredAppliances = appliances;

  if (deviceStatus) {
    filteredAppliances = filteredAppliances.filter(
      (appliance) => appliance.deviceStatus.toLowerCase() === deviceStatus.toLowerCase()
    );
  }

  if (downloadStatus) {
    filteredAppliances = filteredAppliances.filter(
      (appliance) => appliance.downloadStatus.toLowerCase() === downloadStatus.toLowerCase()
    );
  }

  const briefAppliances = filteredAppliances.map((appliance) => {
    const {
      ispPaymentResponsibility,
      planStartDate,
      billingCycle,
      storage,
      ...briefAppliance
    } = appliance;
    return briefAppliance;
  });

  res.json({ appliances: briefAppliances });
});

app.get("/api/v1/appliance/:applianceId/info", (req, res) => {
  const appliance = appliances.find(
    (a) => a.serialNo === req.params.applianceId
  );
  if (appliance) {
    res.json(appliance);
  } else {
    res.status(404).json({ error: "Appliance not found" });
  }
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    httpStatus: 500,
    httpCode: "Internal Server Error",
    requestId: req.id || "N/A",
    errors: [
      {
        code: "500",
        message: "Internal Server Error"
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
