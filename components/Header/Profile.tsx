import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { locales } from '../../locales/masters'
import { $masters } from '../../store/masters'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export interface Props extends NativeStackHeaderProps {}

export const Profile: FC<Props> = ({ options, back, navigation, route }) => {
    const masters = useStore($masters)
    // @ts-ignore
    const master = masters.find(({ id }) => id === route!.params!.id)!

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content
                title={master.name}
                subtitle={master.type.map((type) => locales[type]).join(', ')}
            />
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
