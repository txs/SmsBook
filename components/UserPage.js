import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native'
import Users from '../data/Users.json'
import UserList from './UserList';
import * as fs from 'react-native-fs'

const UserPage = () => {
    const [users, setUsers] = useState([]);
    // console.log(Users.txs.id);
    // console.log(Users.txs.phone);
    useEffect(() => {
        let usersTmp = []
        Object.keys(Users).map(key => {
            usersTmp.push(Users[key])
        })
        // fs.readDir(fs.DocumentDirectoryPath).then(res => {
        //     console.log(res);
        // })
        setUsers(usersTmp)
    }, [])

    // console.log(users);
    const userDeleteAction = (id) => {
        let usersDeleteTmp = []
        // console.log(id);
        if (!!Users[id]) {
            delete Users[id]

            // const path = fs.MainBundlePath + '../data/Users.json'
            // console.log(path);
            // fs.writeFile(path, JSON.stringify(Users));
            Object.keys(Users).map(key => {
                usersDeleteTmp.push(Users[key])
            })
            setUsers(usersDeleteTmp)
            Alert.alert('Delete Success')
        } else {
            Alert.alert('Cannot find User')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={[styles.scene, {}]} >
                <Text style={styles.title}>User</Text>
                {/* <Text>{fs.DocumentDirectoryPath + '../data/Users.json'}</Text> */}
            </View>
            {/* <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}> */}
            <UserList data={users} userDeleteAction={userDeleteAction}></UserList>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    scene: {
        flex: 1
    },
    title: {
        fontSize: 60,
        marginBottom: 15,
    },
})


export default UserPage