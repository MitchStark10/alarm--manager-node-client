const REQUEST_HEADERS = new Headers();
REQUEST_HEADERS.set('Content-Type', 'application/json');

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

    //TODO: Implement the post logic for a new alert
    postNewAlert(alarmText: string) {
        const requestBody = {
            email: this.email,
            apiKey: this.apiKey,
            alarmText,
        };

        return new Promise((resolve, reject) => {
            fetch({
                url: this.amHost + '/api/authenticated/alarm/addAlarm',
                method: 'POST',
                headers: REQUEST_HEADERS,
                body: JSON.stringify(requestBody),
            })
                .then((response) => {
                    if (response.ok) {
                        resolve('Alarm successfully added.');
                    } else {
                        //TODO: Test this path
                        console.error(
                            'Error occurred preventing the alarm from being added:',
                            response,
                        );
                        reject('Error occurred while adding alarm');
                    }
                })
                .catch((error) => reject(error));
        });
    }

    //TODO: Implement basic retrieval logic for all ongoing alarms
    retrieveAllOpenAlerts() {
        const requestBody = {
            email: this.email,
            apiKey: this.apiKey,
        };

        return new Promise((resolve, reject) => {
            fetch({
                url: this.amHost + '/api/authenticated/alarm/retrieveAlarms',
                method: 'POST',
                headers: REQUEST_HEADERS,
                body: JSON.stringify(requestBody),
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }

    // TODO: Implement basic retrieval logic for the most recent alarm. This service does not
    // yet exist.
}
