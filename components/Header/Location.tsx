import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { locations } from '../../datas/locations'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export interface Props extends NativeStackHeaderProps {}

export const Location: FC<Props> = ({ options, back, navigation, route }) => {
    // @ts-ignore
    const location = locations.find(({ id }) => id === route.params.id)!

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={location.name} subtitle={location.address} />
            <Appbar.Action icon={MORE_ICON} style={styles.menu} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {},
    menu: {
        marginLeft: 'auto',
    },
})
