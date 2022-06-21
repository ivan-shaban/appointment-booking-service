import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { $headerColor } from '../../store/header'
import { $currentUser } from '../../store/user'

export interface Props extends NativeStackHeaderProps {}

export const RootHeader: FC<Props> = ({ navigation }) => {
    const user = useStore($currentUser)
    const headerColor = useStore($headerColor)

    return (
        <Appbar.Header style={[styles.base, { backgroundColor: headerColor }]}>
            <Appbar.Action icon="menu" color="white" onPress={() => {}} />
            <Appbar.Action icon="magnify" color="white" style={styles.magnify} onPress={() => {}} />
            <Appbar.Action icon="bell" color="white" onPress={() => {}} />
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
