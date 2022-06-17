import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

export interface Props extends NativeStackHeaderProps {}

export const RootHeader: FC<Props> = ({ navigation }) => {
    return (
        <Appbar.Header style={styles.base}>
            <Appbar.Action icon="menu" onPress={() => {}} />
            <Appbar.Action icon="magnify" style={styles.magnify} onPress={() => {}} />
            <Appbar.Action icon="bell" onPress={() => {}} />
            <TouchableOpacity
                onPress={() => {
                    // navigation.openDrawer()
                }}
            >
                <Avatar.Image
                    size={40}
                    source={{
                        uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
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