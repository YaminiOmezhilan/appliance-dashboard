# Appliance Dashboard

This repository contains both the client and server for the Appliance Dashboard application. The server is a mock API server implemented with Express.js, and the client is a front-end application that interacts with this API.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Server](#server)
- [Client](#client)

## Overview

The Appliance Dashboard application provides a user interface to view and manage appliances. The server provides mock API endpoints to fetch appliance data, and the client consumes these endpoints to display the data in a user-friendly manner.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```sh
git clone https://github.com/YaminiOmezhilan/appliance-dashboard.git
cd appliance-dashboard
```

## Client

## Server
### Mock Appliance API Server

This is a mock API server for managing appliances, implemented using Express.js. The API provides endpoints to retrieve brief information about all appliances and detailed information about a specific appliance.

### Table of Contents

- [Mock Appliance API Server](#mock-appliance-api-server)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
    - [Get All Appliances](#get-all-appliances)
    - [Get Appliance Info](#get-appliance-info)
    - [Error Handling](#error-handling)

### Installation

1. Install dependencies
  ```npm install```

### Usage

1. Start the server:
  ```npm start```

### Endpoints
#### Get All Appliances
- URL: /api/v1/appliances
- Method: GET
- Query Parameters:
  - deviceStatus (optional): The status of the appliance (e.g., online, offline).
  - downloadStatus (optional): The status of the most recent download (e.g., succeeded, failed).
- Success Response:
  - Code: 200
  - Content:
```json
{
  "appliances": [
    {
      "serialNo": "JTD-512312",
      "theatreName": "Kriplle Square",
      "location": {
        "city": "New Delhi",
        "state": "Delhi",
        "country": "India"
      },
      "bandwidth": "1 Gbps",
      "avgBandwidth": "812 Kbps",
      "deviceStatus": "Online",
      "downloadStatus": "Succeeded",
      "osVersion": "5.2.1.3"
    },
    ...
  ]
}
```

#### Get Appliance Info
- URL: /api/v1/appliance/:applianceId/info
- Method: GET
- URL Parameters:
  - applianceId (required): The serial number of the appliance.
- Success Response:
  - Code: 200
  - Content:
```json
{
  "serialNo": "JTD-512312",
  "theatreName": "Kriplle Square",
  "location": {
    "city": "New Delhi",
    "state": "Delhi",
    "country": "India"
  },
  "ispPaymentResponsibility": "Qube",
  "bandwidth": "1 Gbps",
  "avgBandwidth": "812 Kbps",
  "planStartDate": "2023-10-01T10:00:00Z",
  "billingCycle": "Monthly",
  "deviceStatus": "Online",
  "downloadStatus": "Succeeded",
  "osVersion": "5.2.1.3",
  "storage": "828 GB"
}
```

#### Error Handling
The server includes generic error handling for unexpected errors. If an internal server error occurs, the API will respond with a 500 status code and a structured error response.

- Error Response:
  - Code: 500
  - Content
  
```json
{
  "httpStatus": 500,
  "httpCode": "Internal Server Error",
  "requestId": "N/A",
  "errors": [
    {
      "code": "500",
      "message": "Internal Server Error"
    }
  ]
}
```


