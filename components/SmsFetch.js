import SmsAndroid from 'react-native-get-sms-android';

const SmsFetch = () => {
    var filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

        /**
         *  the next 3 filters can work together, they are AND-ed
         *  
         *  minDate, maxDate filters work like this:
         *    - If and only if you set a maxDate, it's like executing this SQL query:
         *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
         *    - Same for minDate but with "date >= minDate"
         */
        // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
        // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
        // bodyRegex: '(.*)How are you(.*)', // content regex to match

        /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
        read: 0, // 0 for unread SMS, 1 for SMS already read
        // _id: 1234, // specify the msg id
        // thread_id: 12, // specify the conversation thread_id
        // address: '+1888------', // sender's phone number
        // body: '蝦皮', // content to match
        /** the next 2 filters can be used for pagination **/
        indexFrom: 0, // start from index 0
        maxCount: 10, // count of SMS to return each time
    };

    SmsAndroid.list(
        JSON.stringify(filter),
        (fail) => {
            console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
            // console.log('Count: ', count);
            // console.log('List: ', smsList);
            var arr = JSON.parse(smsList);
            let fetchedMessages = []

            arr.forEach(function (object) {
                // if (object.date == "1582529567735") {
                // console.log('Object: ' + object);
                // console.log('-->' + object.date);
                // console.log('-->' + object.body);
                if (object.body.includes('ch@')) {
                    // console.log('yo!');
                    const chatMessage = object.body.split('ch@')[1]
                    const splitMessage = chatMessage.split(':')
                    const userid = splitMessage[0]
                    const messages = splitMessage[1]
                    const _id = object._id
                    const address = object.address
                    const date = object.date
                    // console.log('_id:' + _id)
                    // console.log('Date:' + date);
                    // console.log('Address:' + address)
                    // console.log('UserId:' + userid)
                    // console.log('Messages:' + messages)
                    const singleMessage = {
                        userid: userid,
                        date: date,
                        address: address,
                        userid: userid,
                        messages: messages
                    }
                    fetchedMessages.push(singleMessage)
                }

                // console.log('-->keys:' + Object.keys(object));
                // console.log('--------------------------');

                // const dateTime = moment(object.date).format('MMMM Do YYYY, h:mm:ss a')
                // console.log(dateTime);
                // log out what's inside the message
                // Object.keys(object).map(function (key) {
                //   console.log('--> ' + key + ' : ' + object[key]);
                // });
                // }
            });
            return fetchedMessages
        },
    );
}

export default SmsFetch