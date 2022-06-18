import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { $currentUser } from '../../store/user'

export interface Props extends NativeStackHeaderProps {}

export const RootHeader: FC<Props> = ({ navigation }) => {
    const user = useStore($currentUser)

    return (
        <Appbar.Header style={styles.base}>
            <Appbar.Action icon="menu" onPress={() => {}} />
            <Appbar.Action icon="magnify" style={styles.magnify} onPress={() => {}} />
            <Appbar.Action icon="bell" onPress={() => {}} />
            <TouchableOpacity onPress={() => {}}>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: user?.avatar,
                    }}
                />
            </TouchableOpacity>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
    },
    magnify: {
        marginLeft: 'auto',
        marginRight: -5,
    },
})
