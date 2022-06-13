import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { MasterProfileTabParamList } from '../../types'

export interface Props extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Feedbacks'> {}

export const FeedbacksTab: FC<Props> = function Feedbacks({ route }) {
    const { master } = route.params
    return (
        <View style={styles.base}>
            <Text>Feedbacks</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: 'red',
    },
})
