export const getDeviceStatusColor = (status) => {
  switch (status) {
    case "Offline":
      return "#CF1322";
    default:
      return "#0D7C2D";
  }
};

export const convertToApplianceDetailsPageFormat = (object) => {
  return {
    "Device Serial": object.serialNo,
    Location: object.theatreName,
    City: `${object.location.city}, ${object.location.state}, ${object.location.country}`,
    "ISP Payment Responsibility": object.ispPaymentResponsibility,
    Bandwidth: object.bandwidth,
    "Average Bandwidth": object.avgBandwidth,
    "Plan Start Date": formatDate(object.planStartDate),
    "Billing Cycle": object.billingCycle,
    "Download Status": object.downloadStatus,
    "OS Version": object.osVersion,
    "Storage Available": object.storage,
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const abbreviatedMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = date.getUTCMonth();
  const month = abbreviatedMonthNames[monthIndex];

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}`;
};

export const getDownloadStatusFrequency = (applianceArray) => {
  const downloadStatusFrequency = new Map();
  applianceArray.forEach((appliance) => {
    downloadStatusFrequency.set(
      appliance.downloadStatus,
      (downloadStatusFrequency.get(appliance.downloadStatus) || 0) + 1
    );
  });
  return downloadStatusFrequency;
};
