import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import SmsServer from '../smsServer'

const ServerPage = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.scene, {}]} >
            {/* <Text>Server</Text> */}
            <SmsServer />
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    scene: {
        flex: 1
    }
})


export default ServerPage