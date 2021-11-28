import AMClient from './AMClient';

const getEnvVarString = (key: string) => {
    if (process.env[key]) {
        return process.env[key] || '';
    }

    throw `Environment variable not found: ${key}`;
}

describe('Test the API client', () => {
    it('Should connect given correct connection details', () => {
        const client = new AMClient(getEnvVarString('AM_HOST'), getEnvVarString('EMAIL'), getEnvVarString('API_KEY'));
        return expect(client.postNewAlert('Automated Test', 'Jest-created alarm', true)).resolves.toContain({
            success: true
        });
    });

    it('Should throw an error if initialized with empty data', () => {
        try {
            new AMClient('', '', '');

            console.error('An AMClient initialized with empty data should throw an error.');
            return expect(true).toEqual(false);
        } catch (error) {
            // Do nothing
        }
        return expect(true).toEqual(true);
    });

    it('Should throw an error if a request fails', () => {
        const client = new AMClient('badhost', getEnvVarString('EMAIL'), getEnvVarString('API_KEY'));
        return expect(client.postNewAlert('Invalid Host', 'This alarm is expected to fail to be created', true)).rejects.toContain({
            success: false
        });
    });
})
