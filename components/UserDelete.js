import React, { useState } from 'react'
import {
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native'
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/FontAwesome'

const UserDelete = ({ id, userDeleteAction }) => {
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        userDeleteAction(id)
        setVisible(false);
    };
    return (
        <>
            <TouchableOpacity
                style={styles.delete}
                onPress={() => showDialog()}>
                <Icon name="times" size={18} color={'black'} />
            </TouchableOpacity>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Account delete</Dialog.Title>
                <Dialog.Description>
                    Do you want to delete this account? You cannot undo this action.
                 </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Delete" onPress={handleDelete} />
            </Dialog.Container>
        </>
    )
}

const styles = StyleSheet.create({
    delete: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
})

export default UserDelete