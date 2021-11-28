import fetch, { Headers } from "node-fetch";

const REQUEST_HEADERS = new Headers();
REQUEST_HEADERS.set("Content-Type", "application/json");

export default class AMClient {
  amHost: string;
  apiKey: string;
  email: string;

  // TODO: Create default URL
  constructor(amHost: string, email: string, apiKey: string) {
    this.amHost = amHost;
    this.email = email;
    this.apiKey = apiKey;
  }

  postNewAlert(alarmText: string, alarmDetails: string, sendEmail: boolean) {
    const requestBody = {
      email: this.email,
      apiKey: this.apiKey,
      alarmText,
      alarmDetails,
      sendEmail,
    };

    const requestOptions = {
      method: "POST",
      headers: REQUEST_HEADERS,
      body: JSON.stringify(requestBody),
    };

    return new Promise((resolve, reject) => {
      console.log(
        "fetching with URL",
        this.amHost + "/api/authenticated/alarm/createAlarm"
      );
      fetch(this.amHost + "/api/authenticated/alarm/addAlarm", requestOptions)
        .then((response) => {
          if (response.ok) {
            resolve({ success: true, message: "Alarm successfully added." });
          } else {
            console.error(
              "Error occurred preventing the alarm from being added:",
              response
            );
            reject("Error occurred while adding alarm");
          }
        })
        .catch((error) => {
          console.error(
            "Error caught during alarm creation: " + JSON.stringify(error)
          );
          reject(error);
        });
    });
  }

  //TODO: Implement basic retrieval logic for all ongoing alarms
  retrieveAllOpenAlerts() {
    const requestBody = {
      email: this.email,
      apiKey: this.apiKey,
    };

    const requestOptions = {
      method: "POST",
      headers: REQUEST_HEADERS,
      body: JSON.stringify(requestBody),
    };

    return new Promise((resolve, reject) => {
      fetch(
        this.amHost + "/api/authenticated/alarm/retrieveAlarms",
        requestOptions
      )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  // TODO: Implement basic retrieval logic for the most recent alarm. This service does not
  // yet exist.
}
