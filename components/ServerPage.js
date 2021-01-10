import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import SmsServer from '../smsServer'

const ServerPage = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <View style={[styles.scene, {}]} >

                <Text style={styles.title}>Server</Text>
                <SmsServer />
            </View>
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    scene: {
        flex: 1
    },
    title: {
        fontSize: 60,
        marginBottom: 15,
    },
})


export default ServerPage