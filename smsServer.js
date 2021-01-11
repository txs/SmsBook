import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from 'react-native';
import Dialog from "react-native-dialog";
import SmsFetch from './components/SmsFetch'
import SmsAndroid from 'react-native-get-sms-android';
import sendSMSViaTwilio from './sendSMSViaTwilio'
import Users from './data/Users.json'
import Groups from './data/Groups.json'

const getSMS = () => {
    return new Promise((resolve, reject) => {
        let fetchedMessages = []
        var filter = {
            box: 'inbox',
            indexFrom: 0, // start from index 0
            maxCount: 100, // count of SMS to return each time
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
                arr.forEach(function (object) {
                    if (object.body.includes('ch@')) {
                        // console.log('yo');
                        // const chatMessage = object.body.split('ch@')[1]
                        // const splitMessage = chatMessage.split(':')
                        // const userid = splitMessage[0]
                        // const messages = splitMessage[1]
                        // const _id = object._id
                        // const address = object.address
                        // const date = object.date
                        // const singleMessage = {
                        //     _id: _id,
                        //     date: date,
                        //     from: address,
                        //     touserid: userid,
                        //     messages: messages
                        // }
                        // fetchedMessages.push(singleMessage)
                        let chatMessages = object.body.split('ch@')
                        chatMessages.shift()
                        chatMessages.map((item, index) => {
                            const splitMessage = item.split(':')
                            const singleMessage = {
                                _id: object._id + '-' + index,
                                date: object.date,
                                from: object.address,
                                messages: splitMessage[1]
                            }
                            let text = splitMessage[0]
                            if (text.includes('@')) {
                                if (text.includes('#')) {
                                    let hashsplit = text.split('#')
                                    text = hashsplit[0]
                                    hashsplit.shift()
                                    singleMessage.hashs = hashsplit
                                }
                                let txtSplit = text.split('@')
                                singleMessage.touserid = txtSplit[1]
                                text = txtSplit[0]
                            }
                            if (text.includes('!')) {
                                if (text.includes('#')) {
                                    let hashsplit = text.split('#')
                                    text = hashsplit[0]
                                    hashsplit.shift()
                                    singleMessage.hashs = hashsplit
                                }
                                let txtSplit = text.split('!')
                                singleMessage.groupid = txtSplit[1]
                                text = txtSplit[0]
                            }
                            if (text != "") {
                                if (text.includes('#')) {
                                    let hashsplit = text.split('#')
                                    text = hashsplit[0]
                                }
                                singleMessage.touserid = text
                            }
                            fetchedMessages.push(singleMessage)
                        })
                        // console.log(fetchedMessages);
                    }
                });
                // console.log(dot);
                // console.log(fetchedMessages);
                resolve(fetchedMessages)

            },
        );
    })
}

const ScanSMS = ({ isResend }) => {
    const [messages, setMessages] = useState([]);
    const [hasChange, setChange] = useState(false);
    async function newSMS() {
        let oldms = messages
        let ms = await getSMS()
        console.log("New SMS");
        let idList = oldms.map(item => item._id)
        console.log(idList);
        let isChange = false
        ms.map((item, index) => {
            if (!idList.includes(item._id)) {
                isChange = true
                item.state = 'new'
                messages.push(item)
                let sendTo = []
                let userList = []
                // Push in phone to send sms
                if ('groupid' in item) {
                    console.log(Groups[item.groupid]);
                }
                if ('touserid' in item) {
                    if (!userList.includes(item.touserid)) {
                        userList.push(item.touserid)
                    }
                }
                // sendTo.push(Users[item.touserid].phone)
                console.log(sendTo);
                // Reserve the codeName from item
                let codeName = ""
                let hasGroup = false
                if ('groupid' in item) {
                    codeName += "!"
                    codeName += item.groupid
                    hasGroup = true
                }
                if ('touserid' in item) {
                    if (!!hasGroup) codeName += '@'
                    codeName += item.touserid
                }
                if ('hashs' in item) {
                    item.hashs.map(hash => {
                        codeName += '#'
                        codeName += hash
                    })
                }
                console.log(codeName);
                sendTo.map(phone => {
                    // sendSMSViaTwilio('ch@' + item.touserid + ':' + item.messages, phone)
                })
            }
        })
        if (isChange) {
            setMessages(messages)
            setChange(hasChange => !hasChange)
        } else {
            setChange(hasChange => !hasChange)
        }
    }
    const runServer = () => {
        console.log('Go!');
        // console.log(messages);
        newSMS()
    }
    useEffect(() => {
        let intervalId
        async function initResend(isResend) {
            let initms = await getSMS()
            if (isResend) {
                console.log('In Scan, Resending Default Message!');
                initms.map((item, index) => {
                    //     // console.log(Users[item.touserid].phone);
                    //     // sendSMSViaTwilio('ch@'+item.touserid+':'+item.messages, Users[item.touserid].phone)
                    initms[index].state = 'resend'
                    //     // Object.keys(item).map(keys => {
                    //     //     console.log(keys + ':' + item[keys]);
                    //     // })
                })
                // console.log(messages);

            } else {
                initms.map((item, index) => {
                    initms[index].state = 'default'
                })
                console.log('In Scan, Start Anyway!');
            }
            console.log('Here we resend');
            console.log(initms);
            setMessages(initms)
            // intervalId = setInterval(runServer, 1000)
        }
        initResend(isResend)

        // return (() => {
        //     clearInterval(intervalId)
        // })
    }, [])

    useEffect(() => {
        //     console.log('Here is the message');
        //     console.log(messages);
        const timeout = setTimeout(runServer, 1000)
        return () => clearTimeout(timeout)
    }, [messages, hasChange])
    return (
        <>
            <Text>Server is running!</Text>

            {
                messages.map((item, index) => {
                    let codeName = ""
                    let hasGroup = false
                    if ('groupid' in item) {
                        codeName += "!"
                        codeName += item.groupid
                        hasGroup = true
                    }
                    if ('touserid' in item) {
                        if (!!hasGroup) codeName += '@'
                        codeName += item.touserid
                    }
                    if ('hashs' in item) {
                        item.hashs.map(hash => {
                            codeName += '#'
                            codeName += hash
                        })
                    }
                    if (item.state != 'resend' && item.state != 'default') {
                        return <Text key={index}>{item.state} message to {codeName} : {item.messages}</Text>
                    }
                }

                )}
        </>
    )
}

const smsServer = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isResend, setResend] = useState(false);
    // Server is live
    const [isLive, setLive] = useState(false);
    var smsServer





    const handleResend = async () => {
        setVisible(false);
        // let messages = await getSMS()
        // console.log('Get SMS');
        // console.log(messages);
        // messages.map(item => {
        //     // console.log(Users[item.touserid].phone);
        //     // sendSMSViaTwilio(item.messages, Users[item.touserid].phone)
        //     item.state = 'resend'
        //     // Object.keys(item).map(keys => {
        //     //     console.log(keys + ':' + item[keys]);
        //     // })
        // })
        // console.log(messages);
        console.log('Resend');
        setResend(true)
        setLive(true)
    };

    const handleStart = () => {
        setVisible(false);
        console.log('Start Anyway!');
        setResend(false)
        setLive(true)
    };

    let toggleSwitch = () => {
        //when false will become true so do true functions
        if (!isEnabled) {
            console.log(true);
            setVisible(true);
        } else {
            console.log(false);
            setVisible(false);
            setLive(false)
        }
        setIsEnabled(previousState => !previousState)
    }
    return (
        <View style={styles.container}>
            <Text> Start sms ch@t server!</Text>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {isLive == true && <ScanSMS isResend={isResend}></ScanSMS>}
            <Dialog.Container visible={visible}>
                <Dialog.Title>Sms Server Starts!</Dialog.Title>
                <Dialog.Description>
                    There are 5 messages in the SMS inbox. Do you want to resend or start anyway?
                 </Dialog.Description>
                <Dialog.Button label="Resend" onPress={handleResend} />
                <Dialog.Button label="Start Anyway" onPress={handleStart} />
            </Dialog.Container>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default smsServer