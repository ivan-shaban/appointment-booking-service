import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Caption } from 'react-native-paper'

import { LocationFeedback } from '../store/locations'
import moment from 'moment'

export interface Props {
    feedback: LocationFeedback
}

export const LocationFeedbackInline: FC<Props> = memo(function LocationFeedbackInline({
    feedback,
}) {
    return (
        <View style={styles.base}>
            <MaterialCommunityIcons
                style={styles.icon}
                size={16}
                name="comment-text-outline"
                color="white"
            />
            <Caption>{moment(feedback.date).format('YYYY.MM.DD, hh:mm')} / </Caption>
            <Caption style={{ color: 'white' }}>{feedback.message}</Caption>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flex: 1,
        // backgroundColor: 'red',
    },
    icon: {
        position: 'absolute',
        top: 6,
        left: -24,
    },
})
