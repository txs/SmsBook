import axios from 'axios';
import qs from 'qs';
// import { API_URI, FROM, TO } from "@env"

// const DEFAULT_MESSAGE = 'Hi!'; // 要傳送的訊息
// 下面這三個變數都放在 .env 內
// const FROM // twilio trial 用來測試的免費號碼
// const TO // twilio trial 只能傳送給認證過的號碼
// const API_URI // twilio API 認證


const sendSMSViaTwilio = (message, phone) => {
    let data = {
        Body: message || DEFAULT_MESSAGE,
        From: FROM,
        To: phone
    };

    console.log('TwilioSMSSent');
    return axios.post(API_URI, qs.stringify(JSON.stringify(data)))
    // .then(function (response) {
    //     //handle success
    //     console.log(response);
    // })
    // .catch(function (response) {
    //     //handle error
    //     console.log(response);
    // });
}

export default sendSMSViaTwilio;