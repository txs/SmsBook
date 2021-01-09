import SmsAndroid from 'react-native-get-sms-android';

const sendSMSViaDevice = (message, phone) => {
    console.log('SMS Sent!');
    return SmsAndroid.autoSend(
        phone,
        message,
        (fail) => {
            console.log('Device SMS Failed with this error: ' + fail);
        },
        (success) => {
            console.log('Device SMS sent successfully');
        },
    );
}

export default sendSMSViaDevice;