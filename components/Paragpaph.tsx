import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Avatar, Title } from 'react-native-paper'

export interface Props {
    readonly icon: string
    readonly title: string
}

export const Paragpaph: FC<Props> = memo(function Paragpaph({ icon, title, children }) {
    return (
        <View style={styles.base}>
            <Avatar.Icon style={styles.icon} icon={icon} size={32} />
            <View style={styles.content}>
                <Title>{title}</Title>
                {children}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        marginVertical: 8,
        flexDirection: 'row',
    },
    icon: {
        marginTop: 8,
        marginHorizontal: 16,
    },
    content: {
        width: Dimensions.get('screen').width - (64 + 16),
        marginTop: 6,
        // backgroundColor: 'red',
    },
})
