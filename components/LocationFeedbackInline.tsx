import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

import { LocationFeedback } from '../store/locations'

export interface Props {
    feedback: LocationFeedback
}

export const LocationFeedbackInline: FC<Props> = memo(function LocationFeedbackInline({
    feedback,
}) {
    return (
        <View style={styles.base}>
            {/*<MaterialCommunityIcons*/}
            {/*    style={styles.icon}*/}
            {/*    size={16}*/}
            {/*    name={isPositive ? 'thumb-up-outline' : 'thumb-down-outline'}*/}
            {/*    color={isPositive ? 'green' : 'red'}*/}
            {/*/>*/}
            <Subheading>{feedback.message}</Subheading>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {},
    icon: {
        position: 'absolute',
        top: 10,
        left: -30,
    },
})
