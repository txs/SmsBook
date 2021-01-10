import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const UserPage = () => (
    <View style={[styles.scene, {}]} >
        <Text>User</Text>
    </View>
);

const styles = StyleSheet.create({
    scene: {
        flex: 1
    }
})


export default UserPage