import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Caption } from 'react-native-paper'

import faker from '@faker-js/faker'
import moment from 'moment'

export interface Props {
    readonly feedback: Feedback
}

export const FeedbackEntry: FC<Props> = memo(function LocationFeedbackInline({ feedback }) {
    const roundedRating = Math.round(feedback.rating)

    return (
        <View style={styles.base}>
            <MaterialCommunityIcons
                style={styles.icon}
                size={16}
                name="comment-text-outline"
                color="white"
            />
            <View style={styles.content}>
                <Caption style={styles.title}>{feedback.title}</Caption>
                <Caption>
                    {moment(feedback.date).format('YYYY.MM.DD, hh:mm')} /{' '}
                    {faker.datatype.array(5).map((_m, index) => (
                        <MaterialCommunityIcons
                            style={styles.icon}
                            size={12}
                            name="star"
                            color={index + 1 <= roundedRating ? 'gold' : 'white'}
                            key={index}
                        />
                    ))}{' '}
                    ({feedback.rating})
                </Caption>
                <Caption style={styles.message}>{feedback.message}</Caption>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        // backgroundColor: 'green',
    },
    content: { flex: 1 },
    title: { fontWeight: 'bold', color: 'white', fontSize: 12 },
    icon: {
        marginLeft: 16,
        marginRight: 8,
        marginTop: 6,
    },
    message: { color: 'white' },
})
