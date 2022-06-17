import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { mastersLocale } from '../../locales/masters'
import { $masters } from '../../store/masters'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export interface Props extends NativeStackHeaderProps {}

export const ProfileHeader: FC<Props> = ({ options, back, navigation, route }) => {
    const intl = useIntl()
    const masters = useStore($masters)
    // @ts-ignore
    const master = masters.find(({ id }) => id === route!.params!.id)!

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content
                title={master.name}
                subtitle={master.type
                    .map((type) => intl.formatMessage(mastersLocale[type]))
                    .join(', ')}
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
