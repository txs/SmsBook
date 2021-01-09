import axios from 'axios';
import qs from 'qs';
import { API_URI, FROM, TO, ACCOUNT_SID, AUTH_TOKEN } from "@env"

const DEFAULT_MESSAGE = 'Hi'

const sendSMSViaTwilio = (message, phone) => {
    let data = {
        Body: message || DEFAULT_MESSAGE,
        From: FROM,
        To: phone
    };

    console.log('TwilioSMSSent');

    return axios.post(API_URI, qs.stringify(data), {
        auth: {
            username: ACCOUNT_SID,
            password: AUTH_TOKEN
        }
    })
}

export default sendSMSViaTwilio;