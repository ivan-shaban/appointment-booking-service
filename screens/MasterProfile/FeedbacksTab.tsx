import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { FeedbackEntry } from '../../components/FeedbackEntry'
import { ScrollView } from '../../components/Themed'
import { MasterProfileTabParamList } from '../../types'

export interface Props extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Feedbacks'> {}

export const FeedbacksTab: FC<Props> = function Feedbacks({ route }) {
    const { master } = route.params

    return (
        <ScrollView style={styles.base}>
            {master.feedbacks.map((feedback) => (
                <FeedbackEntry key={feedback.id} feedback={feedback} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        // backgroundColor: 'red',
    },
})
