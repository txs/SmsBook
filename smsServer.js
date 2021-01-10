import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from 'react-native';

const ScanSMS = () => {
    const runServer = () => {
        console.log('Go!');
    }
    useEffect(() => {
        let intervalId = setInterval(runServer, 1000)
        return (() => {
            clearInterval(intervalId)
        })
    }, [])
    return (
        <Text>Server is running!</Text>
    )
}

const smsServer = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    var smsServer

    let toggleSwitch = () => {
        //when false will become true so do true functions
        // if (!isEnabled) {
        //     console.log('true');
        //     smsServer = setInterval(runServer, 1000)
        // } else {
        //     console.log(false);
        //     clearInterval(smsServer)
        // }
        setIsEnabled(previousState => !previousState)
    }
    return (
        <View style={styles.container}>
            <Text> Start sms ch@t server!</Text>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {isEnabled == true && <ScanSMS></ScanSMS>}
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