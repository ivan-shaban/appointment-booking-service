import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

export interface Props {}
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const Root: FC<NativeStackHeaderProps> = ({ options, back, navigation, route }) => {
    return (
        <Appbar.Header style={styles.base}>
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
            <Appbar.Action icon="magnify" style={styles.magnify} onPress={() => {}} />
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
    },
    magnify: {
        marginLeft: 'auto',
    },
})
