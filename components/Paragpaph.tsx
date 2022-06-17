import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

import { Tab } from '../constants/Tab'
import { menuLocale } from '../locales/menu'
import { View, useThemeColor } from './Themed'
import { MessageDescriptor } from '@formatjs/intl/src/types'

export interface Props {
    readonly icon: string
    readonly title: MessageDescriptor | string
}

export const Paragpaph: FC<Props> = memo(function Paragpaph({ icon, title, children }) {
    const iconColor = useThemeColor({}, 'text')
    const intl = useIntl()

    return (
        <View style={styles.base}>
            {/* @ts-ignore */}
            <MaterialCommunityIcons style={styles.icon} name={icon} size={20} color={iconColor} />
            <View style={styles.content}>
                <Title>{typeof title === 'string' ? title : intl.formatMessage(title)}</Title>
                {children}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 14,
        marginLeft: 16,
        marginRight: 8,
    },
    content: {
        width: Dimensions.get('screen').width - (64 + 16),
        marginTop: 6,
        // backgroundColor: 'red',
    },
})
