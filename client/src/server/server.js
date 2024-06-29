const express = require("express");
const cors = require("cors");
const appliances = require("./response");
const app = express();
const port = 5000;

app.use(cors());
app.get("/api/v1/appliances", (req, res) => {
  const briefAppliances = appliances.map((appliance) => {
    const {
      ispPaymentResponsibility,
      planStartDate,
      billingCycle,
      storage,
      ...briefAppliance
    } = appliance;
    return briefAppliance;
  });
  res.json(briefAppliances);
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

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
